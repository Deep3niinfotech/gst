import { useEffect, useState } from 'react';
import { auth, db, storage } from '../Firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Notification, { notify } from '../../components/Notification';
import Card from '@mui/material/Card';
import ArgonBox from '../../components/ArgonBox';
import ArgonTypography from '../../components/ArgonTypography';
import ArgonAvatar from '../../components/ArgonAvatar';
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import ArgonInput from 'components/ArgonInput';
import ArgonButton from 'components/ArgonButton';
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
} from 'reactstrap';

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const toggleAddModal = () => {
    setNewModal(!newModal);
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const metadata = {
    contentType: file.type,
  };

  // save profile
  function handleSave() {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const userRef = doc(collection(db, 'users'), uid);
      const storageRef = ref(storage, `/images/Profile_${uid}`);

      Promise.all([
        uploadBytes(storageRef, file, metadata),
        setDoc(userRef, profile, { merge: true }),
      ])
        .then(() => {
          setIsEditing(false);
          notify('Profile Saved successfully!', 'success');
        })
        .catch((error) => {
          console.error(error);
          notify('Error saving data!', 'error');
        })
        .finally(() => {
          setNewModal(false);
          fetchUserProfile();
        });
    }
  }

  // fetch data
  const fetchUserProfile = async () => {
    if (auth.currentUser) {
      const { uid } = auth.currentUser;

      const userRef = doc(collection(db, 'users'), uid);
      const storageRef = ref(storage, `/images/Profile_${uid}`);

      try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setProfile(userData);

          // Retrieve the profile picture URL if available
          const imageUrl = await getDownloadURL(storageRef);
          if (imageUrl) {
            setImageUrl(imageUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserProfile();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // edit profile data
  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  const bgImage = '';

  return (
    <>
      <Notification />
      <DashboardLayout
        sx={{
          backgroundImage: ({
            functions: { rgba, linearGradient },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${bgImage})`,
          backgroundPositionY: '50%',
        }}
      >
        <ArgonBox position="relative">
          <DashboardNavbar absolute light />
          <ArgonBox height="150px" />
          <Card
            sx={{
              py: 2,
              px: 2,
              boxShadow: ({ boxShadows: { md } }) => md,
            }}
            className="profile_card"
          >
            <ArgonBox className="profile_head">
              <ArgonBox className="profile_image_con">
                <ArgonAvatar
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                  src={imageUrl}
                  className="profile_image"
                />
                <ArgonBox>
                  <ArgonTypography
                    color="text"
                    fontWeight="medium"
                    variant="h5"
                  >
                    {profile.name}
                  </ArgonTypography>
                </ArgonBox>
              </ArgonBox>
              <ArgonBox>
                <ArgonButton
                  color="info"
                  size="medium"
                  type="button"
                  onClick={toggleAddModal}
                  className="heading_add_button"
                >
                  Add / Edit Profile
                </ArgonButton>
              </ArgonBox>
            </ArgonBox>
          </Card>
        </ArgonBox>
        <ArgonBox position="relative">
          <Card
            sx={{
              mt: 2,
              py: 2,
              px: 2,
              boxShadow: ({ boxShadows: { md } }) => md,
            }}
            className="profile_card"
          >
            <ArgonBox className="profile_card_box">
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                Address: <span>{profile.address}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                Mobile: <span>{profile.mobile}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                Email: <span>{profile.email}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                GSTIn: <span>{profile.gstIn}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                PAN No: <span>{profile.panNo}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                Bank Name: <span>{profile.bankName}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                Bank Holder Name: <span>{profile.bankHolder}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                Bank A/C No: <span>{profile.accountNo}</span>
              </ArgonTypography>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
                className="info_card_con"
              >
                IFSC Code: <span>{profile.ifsc}</span>
              </ArgonTypography>
            </ArgonBox>
          </Card>
        </ArgonBox>
      </DashboardLayout>

      <Modal
        isOpen={newModal}
        toggle={toggleAddModal}
        className="modal-xl"
        centered
      >
        <ModalHeader toggle={toggleAddModal} className="userTable_header">
          <ArgonTypography color="text" fontWeight="medium" variant="caption">
            Add / Edit Profile
          </ArgonTypography>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={12}>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
              >
                Personal / Company Detail
              </ArgonTypography>
            </Col>
            <div className="info_con col-md-6">
              <label htmlFor="profile_name">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Name
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_name"
                placeholder="Name"
                type="text"
                className="form-control form-control-alternative"
                value={profile.name || ''}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_address">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Address
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_address"
                placeholder="Address"
                type="text"
                className="form-control form-control-alternative"
                value={profile.address || ''}
                onChange={handleChange}
                name="address"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_mobile">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Mobile
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_Mobile"
                placeholder="Mobile"
                type="number"
                className="form-control form-control-alternative"
                value={profile.mobile || ''}
                onChange={handleChange}
                name="mobile"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="paty_email">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Email
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="paty_email"
                placeholder="Email"
                type="email"
                className="form-control form-control-alternative"
                value={profile.email || ''}
                onChange={handleChange}
                name="email"
              />
            </div>
            <Col xs={12}>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
              >
                Bill Detail
              </ArgonTypography>
            </Col>
            <div className="info_con col-md-6">
              <label htmlFor="profile_gst">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  GSTIN
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_gst"
                placeholder="GSTIN"
                type="text"
                className="form-control form-control-alternative"
                value={profile.gstIn || ''}
                onChange={handleChange}
                name="gstIn"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_pan">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  PAN No.
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_pan"
                placeholder="PAN No."
                type="text"
                className="form-control form-control-alternative"
                value={profile.panNo || ''}
                onChange={handleChange}
                name="panNo"
              />
            </div>
            <Col xs={12}>
              <ArgonTypography
                color="text"
                fontWeight="medium"
                variant="button"
              >
                Bank Detail
              </ArgonTypography>
            </Col>
            <div className="info_con col-md-6">
              <label htmlFor="profile_bankName">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Bank Name
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_bankName"
                placeholder="Bank Name"
                type="text"
                className="form-control form-control-alternative"
                value={profile.bankName || ''}
                onChange={handleChange}
                name="bankName"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_bankHolder">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  A/c Holder Name
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_bankHolder"
                placeholder="A/c Holder Name"
                type="text"
                className="form-control form-control-alternative"
                value={profile.bankHolder || ''}
                onChange={handleChange}
                name="bankHolder"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_accountNo">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Bank Account No.
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_accountNo"
                placeholder="Account No."
                type="text"
                className="form-control form-control-alternative"
                value={profile.accountNo || ''}
                onChange={handleChange}
                name="accountNo"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_ifsc">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  IFSC Code
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_ifsc"
                placeholder="IFSC Code"
                type="text"
                className="form-control form-control-alternative"
                value={profile.ifsc || ''}
                onChange={handleChange}
                name="ifsc"
              />
            </div>
            <div className="info_con col-md-6">
              <label htmlFor="profile_image">
                <ArgonTypography
                  color="text"
                  fontWeight="medium"
                  variant="caption"
                >
                  Profile Image
                </ArgonTypography>
              </label>
              <ArgonInput
                size="medium"
                id="profile_image"
                type="file"
                className="form-control form-control-alternative"
                onChange={handleImageChange}
                accept="image/*"
                name="imageUrl"
              />
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <ArgonButton
            color="success"
            size="medium"
            className=""
            onClick={handleSave}
          >
            Submit
          </ArgonButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProfilePage;
