import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';
import ArgonInput from 'components/ArgonInput';
import ArgonButton from 'components/ArgonButton';

import { Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PartyModal = ({
  newModal,
  toggleAddModal,
  handleSubmitParty,
  name,
  setName,
  address,
  setAddress,
  mobile,
  setMobile,
  email,
  setEmail,
  gstIn,
  setGstIn,
  panNo,
  setPanNo,
  contactPerson,
  setContactPerson,
  state,
  setState,
  type,
  setType,
  selectedUser,
}) => {
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setAddress(selectedUser.address);
      setMobile(selectedUser.mobile);
      setEmail(selectedUser.email);
      setGstIn(selectedUser.gstIn);
      setPanNo(selectedUser.panNo);
      setContactPerson(selectedUser.contactPerson);
    }
  }, [selectedUser]);

  const stateData = () => [
    {
      id: 1,
      state: 'Andaman and Nicobar Islands',
    },
    {
      id: 2,
      state: 'Arunachal Pradesh',
    },
    {
      id: 3,
      state: 'Arunachal Pradesh',
    },
    {
      id: 4,
      state: 'Assam',
    },
    {
      id: 5,
      state: 'Bihar',
    },
    {
      id: 6,
      state: 'Chandigarh',
    },
    {
      id: 7,
      state: 'Chattisgarh',
    },
    {
      id: 8,
      state: 'Dadra and Nagar Haveli',
    },
    {
      id: 9,
      state: 'Daman and Diu',
    },
    {
      id: 10,
      state: 'Delhi',
    },
    {
      id: 11,
      state: 'Goa',
    },
    {
      id: 12,
      state: 'Gujarat',
    },
    {
      id: 13,
      state: 'Haryana',
    },
    {
      id: 14,
      state: 'Himachal Pradesh',
    },
    {
      id: 15,
      state: 'Jammu and Kashmir',
    },
    {
      id: 16,
      state: 'Jharkhand',
    },
    {
      id: 17,
      state: 'Karnataka',
    },
    {
      id: 18,
      state: 'Kerala',
    },
    {
      id: 19,
      state: 'Lakshadweep Islands',
    },
    {
      id: 20,
      state: 'Madhya Pradesh',
    },
    {
      id: 21,
      state: 'Maharashtra',
    },
    {
      id: 22,
      state: 'Manipur',
    },
    {
      id: 23,
      state: 'Meghalaya',
    },
    {
      id: 24,
      state: 'Mizoram',
    },
    {
      id: 25,
      state: 'Nagaland',
    },
    {
      id: 26,
      state: 'Odisha',
    },
    {
      id: 27,
      state: 'Pondicherry',
    },
    {
      id: 28,
      state: 'Punjab',
    },
    {
      id: 29,
      state: 'Rajasthan',
    },
    {
      id: 30,
      state: 'Sikkim',
    },
    {
      id: 31,
      state: 'Tamil Nadu',
    },
    {
      id: 32,
      state: 'Telangana',
    },
    {
      id: 33,
      state: 'Tripura',
    },
    {
      id: 34,
      state: 'Uttar Pradesh',
    },
    {
      id: 35,
      state: 'Uttarakhand',
    },
    {
      id: 36,
      state: 'West Bengal',
    },
  ];

  return (
    <>
      <Modal
        isOpen={newModal}
        toggle={toggleAddModal}
        className="modal-lg"
        centered
      >
        <ModalHeader toggle={toggleAddModal} className="userTable_header">
          <ArgonTypography color="text" fontWeight="medium" variant="caption">
            Add / Edit Party
          </ArgonTypography>
        </ModalHeader>

        <form
          className="needs-validation new_form"
          id="form_details"
          onSubmit={handleSubmitParty}
        >
          <ModalBody>
            <div className="form-row modal_con">
              <Row>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="party_name">
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
                      id="party_name"
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
                    <label htmlFor="party_address">
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
                      id="party_address"
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
                    <label htmlFor="party_mobile">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        Mobile
                      </ArgonTypography>
                    </label>
                    <ArgonInput
                      size="small"
                      id="party_mobile"
                      placeholder="Mobile"
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
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="party_gst">
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
                      id="party_gst"
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
                    <label htmlFor="party_pan">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        PAN
                      </ArgonTypography>
                    </label>
                    <ArgonInput
                      size="small"
                      id="party_pan"
                      placeholder="PAN"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value)}
                    />
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="party_state">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        State
                      </ArgonTypography>
                    </label>
                    <select
                      value={state}
                      id="party_state"
                      onChange={(e) => setState(e.target.value)}
                      className="input_select"
                    >
                      <option value="">Select State</option>
                      {stateData().map((state) => (
                        <option key={state.id} value={state.state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="party_type">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        Type
                      </ArgonTypography>
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      id="party_type"
                      className="input_select"
                    >
                      <option value="">Select Type</option>
                      <option value="Sale">Sale</option>
                      <option value="Purchase">Purchase</option>
                    </select>
                  </ArgonBox>
                </div>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="party_contact">
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="caption"
                      >
                        Contact Person
                      </ArgonTypography>
                    </label>
                    <ArgonInput
                      size="small"
                      id="party_contact"
                      placeholder="Contact Person"
                      type="text"
                      className="form-control form-control-alternative"
                      aria-invalid="false"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
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
};

PartyModal.propTypes = {
  newModal: PropTypes.bool,
  toggleAddModal: PropTypes.func,
  handleSubmitParty: PropTypes.func,
  name: PropTypes.string,
  setName: PropTypes.func,
  address: PropTypes.string,
  setAddress: PropTypes.func,
  mobile: PropTypes.string,
  setMobile: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  gstIn: PropTypes.string,
  setGstIn: PropTypes.func,
  panNo: PropTypes.string,
  setPanNo: PropTypes.func,
  contactPerson: PropTypes.string,
  setContactPerson: PropTypes.func,
  state: PropTypes.string,
  setState: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
  selectedUser: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
    gstIn: PropTypes.string,
    panNo: PropTypes.string,
    contactPerson: PropTypes.string,
  }),
};

export default PartyModal;
