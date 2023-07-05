// // reactstrap components
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// import ArgonButton from "../ArgonButton";
// import ArgonTypography from "../ArgonTypography";

// const Form_Modal = ({ toggleDeleteModal, deleteModalOpen, handleDelete, index }) => {
//   return (
//     <>
//       <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal} className="delete_modal" centered>
//         <ModalHeader toggle={toggleDeleteModal}>
//           <ArgonTypography color="text" fontWeight="medium">
//             Confirmation
//           </ArgonTypography>
//         </ModalHeader>
//         <ModalBody>
//           <ArgonTypography color="text" fontWeight="medium">
//             Are you sure you want to Delete?
//           </ArgonTypography>
//         </ModalBody>
//         <ModalFooter>
//           <ArgonButton color="info" size="medium" type="button" onClick={toggleDeleteModal}>
//             Cancel
//           </ArgonButton>
//           <ArgonButton
//             color="error"
//             size="medium"
//             type="button"
//             onClick={() => handleDelete(index)}
//             className="logout_btn"
//           >
//             Delete
//           </ArgonButton>
//         </ModalFooter>
//       </Modal>
//     </>
//   );
// };

// export default Form_Modal;