import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isAuthenticated1");
    Navigate("/authentication/sign-in");
  }, [Navigate]);

  return null; 
};

export default Logout;