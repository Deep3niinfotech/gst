import React, { useState, useEffect } from 'react';
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
import {
  getDocs,
  collection,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../Firebase';
import Notification, { notify } from '../../components/Notification';
const bgImage = '';

function Overview() {
  const [newModal, setNewModal] = useState(false);
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gstIn, setGstIn] = useState('');
  const [panNo, setPanNo] = useState('');
  const [bankHolder, setBankHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');

  const profileCollectionRef = collection(db, 'Profile');

  const getProfileData = async () => {
    const data = await getDocs(profileCollectionRef);
    if (data.docs.length > 0) {
      const profileData = data.docs[0].data();
      setProfile({ ...profileData, id: data.docs[0].id });
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  

  const toggleAddModal = () => {
    if (profile) {
      setName(profile.name || '');
      setAddress(profile.address || '');
      setMobile(profile.mobile || '');
      setEmail(profile.email || '');
      setGstIn(profile.gstIn || '');
      setPanNo(profile.panNo || '');
      setBankHolder(profile.bankHolder || '');
      setBankName(profile.bankName || '');
      setAccountNo(profile.accountNo || '');
      setIfsc(profile.ifsc || '');
    } else {
      setName('');
      setAddress('');
      setMobile('');
      setEmail('');
      setGstIn('');
      setPanNo('');
      setBankHolder('');
      setBankName('');
      setAccountNo('');
      setIfsc('');
    }
    setNewModal(!newModal);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
  
    try {
      if (profile) {
        await updateDoc(doc(db, 'Profile', profile.id), {
          name,
          address,
          mobile,
          email,
          gstIn,
          panNo,
          bankHolder,
          bankName,
          accountNo,
          ifsc,
        });
        notify('Profile Updated successfully!', 'success');
      } else {
        const docRef = await addDoc(collection(db, 'Profile'), {
          name,
          address,
          mobile,
          email,
          gstIn,
          panNo,
          bankHolder,
          bankName,
          accountNo,
          ifsc,
        });
        notify('Profile Added successfully!', 'success');
        setProfile({ ...profile, id: docRef.id });
      }
  
      setName('');
      setAddress('');
      setMobile('');
      setEmail('');
      setGstIn('');
      setPanNo('');
      setBankHolder('');
      setBankName('');
      setAccountNo('');
      setIfsc('');
    } catch (error) {
      notify('Error saving data!', 'error');
      console.error('Error adding/updating document:', error);
    }
  
    setNewModal(false);
    getProfileData();
  }; 

  const handleEditProfile = () => {
    toggleAddModal();
  };

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
            className='profile_card'
          >
            <ArgonBox className="profile_head">
              <ArgonBox className="profile_image_con">
                <ArgonAvatar
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
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
          <Card
            sx={{
              mt: 2,
              py: 2,
              px: 2,
              boxShadow: ({ boxShadows: { md } }) => md,
            }}
            className='profile_card'
          >
            <ArgonBox className="info_con_upper">
              <div className="info_con">
                Address: <span>{profile.address}</span>
              </div>
              <div className="info_con">
                Mobile: <span>{profile.mobile}</span>
              </div>
              <div className="info_con">
                Email: <span>{profile.email}</span>
              </div>
              <div className="info_con">
                GSTIn: <span>{profile.gstIn}</span>
              </div>
              <div className="info_con">
                PAN No: <span>{profile.panNo}</span>
              </div>
              <div className="info_con">
                Bank Name: <span>{profile.bankName}</span>
              </div>
              <div className="info_con">
                Bank Holder Name: <span>{profile.bankHolder}</span>
              </div>
              <div className="info_con">
                Bank A/C No: <span>{profile.accountNo}</span>
              </div>
              <div className="info_con">
                IFSC Code: <span>{profile.ifsc}</span>
              </div>
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

        <form
          className="needs-validation new_form"
          id="form_details"
          onSubmit={handleSubmitProfile}
        >
          <ModalBody>
            <div className="form-row modal_con">
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
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_name"
                      placeholder="Name"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_address"
                      placeholder="Address"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="profile_mobile">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        Mobile No.
                      </ArgonTypography>
                    </label>
                    <ArgonInput
                      size="small"
                      id="profile_mobile"
                      placeholder="Mobile No."
                      type="number"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="paty_email"
                      placeholder="Email"
                      type="email"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </ArgonBox>
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
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_gst"
                      placeholder="GSTIN"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={gstIn}
                      onChange={(e) => setGstIn(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_pan"
                      placeholder="PAN No."
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value)}
                    />
                  </ArgonBox>
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
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_bankName"
                      placeholder="Bank Name"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_bankHolder"
                      placeholder="A/c Holder Name"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={bankHolder}
                      onChange={(e) => setBankHolder(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="profile_accountNo">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        Account No.
                      </ArgonTypography>
                    </label>
                    <ArgonInput
                      size="small"
                      id="profile_accountNo"
                      placeholder="Account No."
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
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
                      size="small"
                      id="profile_ifsc"
                      placeholder="IFSC Code"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                    />
                  </ArgonBox>
                </div>
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <ArgonButton
              color="success"
              size="medium"
              type="submit"
              className=""
            >
              Submit
            </ArgonButton>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default Overview;
