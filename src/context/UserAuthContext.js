import { createContext, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../layouts/Firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('');

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid, email } = currentUser;

        // Fetch additional user data from Firestore
        const userRef = doc(collection(db, 'users'), uid);

        getDoc(userRef)
          .then((doc) => {
            if (doc.exists()) {
              setUser({ uid, email });
            } else {
              setUser({ uid, email });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setUser('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, signUp, login, logout, googleSignIn, resetPassword }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

UserAuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUserAuth() {
  return useContext(userAuthContext);
}