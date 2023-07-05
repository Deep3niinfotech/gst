import React, { useState, useEffect } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Form_Modal from 'components/Modal/Form_Modal';
import CompanyTableHead from './CompanyTableHead';
import CompanyModal from './CompanyModal';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@mui/material';
import { green, lightBlue, red } from '@mui/material/colors';
import Notification, { notify } from 'components/Notification';

import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';
import ArgonInput from 'components/ArgonInput';
import ArgonButton from 'components/ArgonButton';

import { Card, CardFooter, Table } from 'reactstrap';
import { db } from '../../Firebase';
import {
  getDocs,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const company = () => {
  const [newModal, setNewModal] = useState(false);
  const [company, setCompany] = useState([]);
  const [selectedCompany, setselectedCompany] = useState(null);
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

  const usersCollectionRef = collection(db, 'Company');

  const getCompanyData = async () => {
    const data = await getDocs(usersCollectionRef);
    setCompany(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const handleLogoChange = () => {
    console.log('logo');
  };

  const toggleAddModal = () => {
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
    setNewModal(!newModal);
  };

  // create new Company
  const handleSubmitCompany = async (e) => {
    e.preventDefault();

    try {
      if (selectedCompany) {
        const docRef = await updateDoc(doc(db, 'Company', selectedCompany.id), {
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
        notify('Company updated successfully!', 'success');
      } else {
        const docRef = await addDoc(collection(db, 'Company'), {
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
        notify('Company added successfully!', 'success');
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
    setselectedCompany(null);
    getCompanyData();
  };

  // edit Company
  const handleEditCompany = (editCompany) => {
    setselectedCompany(editCompany);
    setName(editCompany.name);
    setAddress(editCompany.address);
    setMobile(editCompany.mobile);
    setEmail(editCompany.email);
    setGstIn(editCompany.gstIn);
    setPanNo(editCompany.panNo);
    setBankHolder(editCompany.bankHolder);
    setBankName(editCompany.bankName);
    setAccountNo(editCompany.accountNo);
    setIfsc(editCompany.ifsc);
    toggleAddModal(true);
  };

  // delete company
  const handleDeleteCompany = async (companyId) => {
    try {
      await deleteDoc(doc(db, 'Company', companyId));
      notify('Company deleted successfully!', 'success');
      getCompanyData();
    } catch (error) {
      notify('Error deleting Company!', 'error');
      console.error('Error deleting document:', error);
    }
  };

  return (
    <>
      <Notification />
      <DashboardLayout>
        <DashboardNavbar />
        <Card className="shadow zone_con con">
          <ArgonBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <ArgonTypography variant="button" color="secondary">
              Company
            </ArgonTypography>
            <ArgonBox className="heading_input_con">
              <ArgonInput
                size="small"
                id="searchbar_party"
                placeholder="Search"
                type="search"
                name="Search"
                className="heading_searchbar"
                aria-invalid="false"
                startAdornment={
                  <Icon
                    fontSize="small"
                    style={{ marginRight: '6px' }}
                    sx={{ color: lightBlue[400] }}
                  >
                    search
                  </Icon>
                }
              />
              <ArgonButton
                color="info"
                size="medium"
                type="button"
                onClick={toggleAddModal}
                className="heading_add_button"
              >
                Add New +
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
          <Table
            className="align-items-center table-flush new_table"
            hover
            responsive
          >
            <CompanyTableHead />
            <tbody>
              {company.map((companyTable, index) => (
                <tr key={companyTable.id}>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {index + 1}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {companyTable.name}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {companyTable.address}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {companyTable.mobile}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {companyTable.email}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {companyTable.gstIn}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {companyTable.panNo}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td className="usertable_buttons">
                    <ArgonBox>
                      <ArgonTypography
                        color="text"
                        fontWeight="medium"
                        variant="button"
                      >
                        <button className="btn edit_btn">
                          <CreateIcon
                            fontSize="small"
                            sx={{ color: green[500] }}
                            onClick={() => handleEditCompany(companyTable)}
                          />
                        </button>
                        <button className="btn delete_btn">
                          <DeleteIcon
                            fontSize="small"
                            sx={{ color: red[600] }}
                            onClick={() => handleDeleteCompany(companyTable.id)}
                          />
                        </button>
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CardFooter></CardFooter>
        </Card>
      </DashboardLayout>
      <CompanyModal
        newModal={newModal}
        toggleAddModal={toggleAddModal}
        handleSubmitCompany={handleSubmitCompany}
        handleLogoChange={handleLogoChange}
        name={name}
        setName={setName}
        address={address}
        setAddress={setAddress}
        mobile={mobile}
        setMobile={setMobile}
        email={email}
        setEmail={setEmail}
        gstIn={gstIn}
        setGstIn={setGstIn}
        panNo={panNo}
        setPanNo={setPanNo}
        bankHolder={bankHolder}
        setBankHolder={setBankHolder}
        bankName={bankName}
        setBankName={setBankName}
        accountNo={accountNo}
        setAccountNo={setAccountNo}
        ifsc={ifsc}
        setIfsc={setIfsc}
        selectedCompany={selectedCompany}
      />
    </>
  );
};

export default company;
