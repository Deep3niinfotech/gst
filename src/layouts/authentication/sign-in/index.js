import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../../context/UserAuthContext';
import Notification, { notify } from '../../../components/Notification';

import google from '../../../assets/images/logos/google.svg';

// Argon Dashboard 2 MUI components
import ArgonBox from '../../../components/ArgonBox';
import ArgonTypography from '../../../components/ArgonTypography';
import ArgonInput from '../../../components/ArgonInput';
import ArgonButton from '../../../components/ArgonButton';

// Authentication layout components
import IllustrationLayout from '../components/IllustrationLayout';

function Illustration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleSignIn } = useUserAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  useEffect(() => {
    const isAuthenticated1 = localStorage.getItem('isAuthenticated1');
    if (!isAuthenticated1) {
      navigate('/authentication/sign-in');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      localStorage.setItem('isAuthenticated1', true);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
      notify(err, 'error');
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      localStorage.setItem('isAuthenticated1', true);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
      notify(err, 'error');
    }
  };

  return (
    <>
      <Notification />
      <IllustrationLayout
        title="Sign In"
        illustration={{
          title: '"Welcome to GST Dashboard"',
        }}
      >
        <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
          <ArgonBox mb={2}>
            <ArgonInput
              type="email"
              placeholder="Email"
              size="large"
              id="login_email"
              onChange={handleEmailChange}
              error={!!error ? true : undefined}
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonInput
              type="password"
              placeholder="Password"
              size="large"
              id="login_password"
              onChange={handlePasswordChange}
              error={!!error ? true : undefined}
            />
          </ArgonBox>
          <ArgonBox mt={4} mb={1}>
            <ArgonButton
              color={error ? 'error' : 'info'}
              size="large"
              type="submit"
              fullWidth
            >
              Sign In
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={1} textAlign="center">
            <ArgonTypography
              component={Link}
              to="/authentication/reset-password"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Forget Password?
            </ArgonTypography>
          </ArgonBox>

          <ArgonBox mt={2} mb={1} textAlign="center">
            <ArgonTypography variant="button" color="text" fontWeight="regular">
              or
            </ArgonTypography>
          </ArgonBox>

          <ArgonBox mt={2} mb={1}>
            <ArgonButton
              color="white"
              className="signin_google_btn"
              size="large"
              onClick={handleGoogleSignIn}
              fullWidth
            >
              <img src={google} alt="google" />
              Google
            </ArgonButton>
          </ArgonBox>

          <ArgonBox mt={3} textAlign="center">
            <ArgonTypography
              variant="button"
              color="text"
              fontWeight="regular"
              className="signin_alter_link"
            >
              Don&apos;t have an account?{' '}
              <ArgonTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      </IllustrationLayout>
    </>
  );
}

export default Illustration;
