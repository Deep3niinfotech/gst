import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../context/UserAuthContext';
import Notification, { notify } from '../../../components/Notification';

import Card from '@mui/material/Card';
import ArgonBox from '../../../components/ArgonBox';
import ArgonTypography from '../../../components/ArgonTypography';
import ArgonInput from '../../../components/ArgonInput';
import ArgonButton from '../../../components/ArgonButton';

// Authentication layout components
import CoverLayout from '../components/CoverLayout';

function Cover() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      notify('Account Created Successfully', 'success');
      setTimeout(() => {
        navigate('/authentication/sign-in');
      }, 3000);
    } catch (err) {
      setError(err);
      notify(err, 'error');
    }
  };

  return (
    <>
      <Notification />
      <CoverLayout
        title=' "Welcome to GST Dashboard" '
        imgPosition="top"
        button={{ color: 'dark', variant: 'gradient' }}
      >
        <Card className="siup_con_box">
          <ArgonBox p={3} mb={1} textAlign="center">
            <ArgonTypography variant="h4" fontWeight="bold">
              Sign Up
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox pt={2} pb={3} px={3}>
            <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
              <ArgonBox mb={2}>
                <ArgonInput
                  type="email"
                  placeholder="Email"
                  id="register_email"
                  size="large"
                  onChange={handleEmailChange}
                  error={!!error ? true : undefined}
                />
              </ArgonBox>
              <ArgonBox mb={2}>
                <ArgonInput
                  type="password"
                  placeholder="Password"
                  id="register_password"
                  onChange={handlePasswordChange}
                  error={!!error ? true : undefined}
                  size="large"
                />
              </ArgonBox>
              <ArgonBox mt={4} mb={1}>
                <ArgonButton
                  color={error ? 'error' : 'info'}
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </ArgonButton>
              </ArgonBox>
              <ArgonBox mt={2} textAlign="center">
                <ArgonTypography
                  variant="button"
                  color="text"
                  fontWeight="regular"
                  className="signin_alter_link"
                >
                  Already have an account?
                  <ArgonTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </ArgonTypography>
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          </ArgonBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Cover;
