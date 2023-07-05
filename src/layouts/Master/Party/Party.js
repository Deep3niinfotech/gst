import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar';
import Form_Modal from '../../../components/Modal/Form_Modal';
import PartyModal from './PartyModal';
import PartyTableHead from './PartyTableHead';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@mui/material';
import { green, lightBlue, red } from '@mui/material/colors';
import Notification, { notify } from 'components/Notification';

import ArgonBox from '../../../components/ArgonBox';
import ArgonTypography from '../../../components/ArgonTypography';
import ArgonInput from '../../../components/ArgonInput';
import ArgonButton from '../../../components/ArgonButton';

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

const Party = () => {
  const [newModal, setNewModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gstIn, setGstIn] = useState('');
  const [panNo, setPanNo] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const usersCollectionRef = collection(db, 'Party');

  const getParty = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getParty();
  }, []);

  const toggleAddModal = () => {
    setName('');
    setAddress('');
    setMobile('');
    setEmail('');
    setGstIn('');
    setPanNo('');
    setState('');
    setType('');
    setContactPerson('');
    setNewModal(!newModal);
  };

  // create new Party
  const handleSubmitParty = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        const docRef = await updateDoc(doc(db, 'Party', selectedUser.id), {
          name,
          address,
          mobile,
          email,
          gstIn,
          panNo,
          contactPerson,
          state,
          type,
        });
        notify('Party updated successfully!', 'success');
      } else {
        const docRef = await addDoc(collection(db, 'Party'), {
          name,
          address,
          mobile,
          email,
          gstIn,
          panNo,
          contactPerson,
          state,
          type,
        });
        notify('Party added successfully!', 'success');
      }

      setName('');
      setAddress('');
      setMobile('');
      setEmail('');
      setGstIn('');
      setPanNo('');
      setContactPerson('');
      setState('');
      setType('');
    } catch (error) {
      notify('Error saving data!', 'error');
      console.error('Error adding/updating document:', error);
    }

    setNewModal(false);
    setSelectedUser(null);
    getParty();
  };

  // edit party
  const handleEditParty = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setAddress(user.address);
    setMobile(user.mobile);
    setEmail(user.email);
    setGstIn(user.gstIn);
    setPanNo(user.panNo);
    setState(user.state);
    setType(user.type);
    setContactPerson(user.contactPerson);
    toggleAddModal(true);
  };

  // delete Party
  const handleDeleteParty = async (partyId) => {
    try {
      await deleteDoc(doc(db, 'Party', partyId));
      notify('Party deleted successfully!', 'success');
      getParty();
    } catch (error) {
      notify('Error deleting party!', 'error');
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
              Party
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
            <PartyTableHead />
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
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
                        {user.name}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.address}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.mobile}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.email}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.gstIn}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.panNo}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.contactPerson}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.state}
                      </ArgonTypography>
                    </ArgonBox>
                  </td>
                  <td>
                    <ArgonBox>
                      <ArgonTypography variant="caption" color="secondary">
                        {user.type}
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
                            onClick={() => handleEditParty(user)}
                          />
                        </button>
                        <button className="btn delete_btn">
                          <DeleteIcon
                            fontSize="small"
                            sx={{ color: red[600] }}
                            onClick={() => handleDeleteParty(user.id)}
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
      <PartyModal
        newModal={newModal}
        toggleAddModal={toggleAddModal}
        handleSubmitParty={handleSubmitParty}
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
        contactPerson={contactPerson}
        setContactPerson={setContactPerson}
        selectedUser={selectedUser}
        state={state}
        setState={setState}
        type={type}
        setType={setType}
      />
    </>
  );
};

export default Party;
