import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ArgonButton from 'components/ArgonButton';
import ArgonTypography from 'components/ArgonTypography';
import { useUserAuth } from 'context/UserAuthContext';

const Logout_modal = ({ toggleModal1, modalOpen1 }) => {
  const { logout } = useUserAuth();
  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('isAuthenticated1');
      Navigate('/authentication/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalOpen1}
        toggle={toggleModal1}
        className="logout_modal"
        centered
      >
        <ModalHeader toggle={toggleModal1}>
          <ArgonTypography color="text" fontWeight="medium" variant="button">
            Confirmation
          </ArgonTypography>
        </ModalHeader>
        <ModalBody>
          <ArgonTypography color="text" fontWeight="medium" variant="button">
            Are you sure you want to logout?
          </ArgonTypography>
        </ModalBody>
        <ModalFooter>
          <ArgonButton
            color="info"
            size="medium"
            type="button"
            onClick={toggleModal1}
          >
            Cancel
          </ArgonButton>
          <ArgonButton
            color="error"
            size="medium"
            type="button"
            onClick={handleLogout}
            className="logout_btn"
          >
            Logout
          </ArgonButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

Logout_modal.propTypes = {
  toggleModal1: PropTypes.func.isRequired,
  modalOpen1: PropTypes.bool.isRequired,
};

export default Logout_modal;
