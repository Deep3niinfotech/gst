import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';
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

const CompanyModal = ({
  newModal,
  toggleAddModal,
  handleSubmitCompany,
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
  bankHolder,
  setBankHolder,
  bankName,
  setBankName,
  accountNo,
  setAccountNo,
  ifsc,
  setIfsc,
  selectedCompany,
}) => {
  useEffect(() => {
    if (selectedCompany) {
      setName(selectedCompany.name);
      setAddress(selectedCompany.address);
      setMobile(selectedCompany.mobile);
      setEmail(selectedCompany.email);
      setGstIn(selectedCompany.gstIn);
      setPanNo(selectedCompany.panNo);
      setBankHolder(selectedCompany.bankHolder);
      setBankName(selectedCompany.bankName);
      setAccountNo(selectedCompany.accountNo);
      setIfsc(selectedCompany.ifsc);
    }
  }, [selectedCompany]);
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
            Add / Edit Company
          </ArgonTypography>
        </ModalHeader>

        <form
          className="needs-validation new_form"
          id="form_details"
          onSubmit={handleSubmitCompany}
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
                    Company Detail
                  </ArgonTypography>
                </Col>
                <div className="col-md-6">
                  <ArgonBox mb={2}>
                    <label htmlFor="company_name">
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
                      id="company_name"
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
                    <label htmlFor="company_address">
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
                      id="company_address"
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
                    <label htmlFor="company_mobile">
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
                      id="company_mobile"
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
                    <label htmlFor="company_gst">
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
                      id="company_gst"
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
                    <label htmlFor="company_pan">
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
                      id="company_pan"
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
                    <label htmlFor="company_bankName">
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
                      id="company_bankName"
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
                    <label htmlFor="company_bankHolder">
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
                      id="company_bankHolder"
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
                    <label htmlFor="company_accountNo">
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
                      id="company_accountNo"
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
                    <label htmlFor="company_ifsc">
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
                      id="company_ifsc"
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
};

CompanyModal.propTypes = {
  newModal: PropTypes.bool,
  toggleAddModal: PropTypes.func,
  handleSubmitCompany: PropTypes.func,
  handleLogoChange: PropTypes.func,
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
  bankHolder: PropTypes.string,
  setBankHolder: PropTypes.func,
  bankName: PropTypes.string,
  setBankName: PropTypes.func,
  accountNo: PropTypes.string,
  setAccountNo: PropTypes.func,
  ifsc: PropTypes.string,
  setIfsc: PropTypes.func,
  selectedCompany: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
    gstIn: PropTypes.string,
    panNo: PropTypes.string,
    bankHolder: PropTypes.string,
    bankName: PropTypes.string,
    accountNo: PropTypes.string,
    ifsc: PropTypes.string,
  }),
};
export default CompanyModal;