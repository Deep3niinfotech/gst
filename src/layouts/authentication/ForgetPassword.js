import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import Notification, { notify } from '../../components/Notification';

import Card from '@mui/material/Card';
import ArgonBox from '../../components/ArgonBox';
import ArgonTypography from '../../components/ArgonTypography';
import ArgonInput from '../../components/ArgonInput';
import ArgonButton from '../../components/ArgonButton';

// Authentication layout components
import CoverLayout from './components/CoverLayout';

const ForgetPassword = () => {
  const { resetPassword } = useUserAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      notify('Password reset email sent!', 'success');

      setTimeout(() => {
        navigate('/authentication/sign-in');
      }, 5000);
    } catch (error) {
      notify(error.message, 'error');
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
        <Card className='forget_password_con_box'>
          <ArgonBox p={3} mb={1} textAlign="center">
            <ArgonTypography variant="h5" fontWeight="medium" mb={2}>
              Reset Password
            </ArgonTypography>
            <ArgonTypography variant="h6" color="text" fontWeight="regular">
              Enter Your Registered Email
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox pb={3} px={3}>
            <ArgonBox component="form" role="form" onSubmit={handleFormSubmit}>
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
              <ArgonBox mt={4} mb={1}>
                <ArgonButton
                  color={error ? 'error' : 'info'}
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Send
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
          </ArgonBox>
        </Card>
      </CoverLayout>
    </>
  );
};

export default ForgetPassword;
