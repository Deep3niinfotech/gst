import React, { useState, useEffect } from 'react';
import Notification, { notify } from '../../components/Notification';
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import ArgonBox from '../../components/ArgonBox';
import ArgonTypography from '../../components/ArgonTypography';
import ArgonButton from 'components/ArgonButton';
import SalesInvoiceTable from './SalesInvoiceTable';
import SalesInvoiceHeader from './SalesInvoiceHeader';
import { PDFDocument, StandardFonts } from 'pdf-lib';

import { db, auth } from '../Firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';

import { Card, CardFooter, Table } from 'reactstrap';

const SalesInvoice = () => {
  const [company, setCompany] = useState([]);
  const [party, setParty] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [challan, setChallan] = useState('');
  const [pon, setPon] = useState('');
  const [invoice, setInvoice] = useState('');
  const [date, setDate] = useState('');
  const [rows, setRows] = useState([
    { id: 1, description: '', hsnCode: '', qty: '', rate: '', amount: '' },
  ]);

  useEffect(() => {
    getCompanyData();
    getParty();
  }, []);

  if (auth.currentUser) {
    const { uid } = auth.currentUser;
    console.log(uid);
  }

  // Get Company Data
  const companyCollectionRef = collection(db, 'Company');
  const getCompanyData = async () => {
    const data = await getDocs(companyCollectionRef);
    setCompany(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // Get Party data
  const partyCollectionRef = collection(db, 'Party');
  const getParty = async () => {
    const data = await getDocs(partyCollectionRef);
    setParty(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Table
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      description: '',
      hsnCode: '',
      qty: '',
      rate: '',
      amount: '',
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        let amount = row.amount;
        if (field === 'qty' || field === 'rate') {
          amount = row.qty * row.rate;
        }
        return { ...row, [field]: value, amount };
      }
      return row;
    });
    setRows(updatedRows);
  };
  console.log(rows);

  const handleSubmit = async () => {
    if (
      !selectedCompany ||
      !selectedParty ||
      !challan ||
      !pon ||
      !invoice ||
      !date
    ) {
      console.log('Please fill in all required fields.');
      notify('Please fill in all required fields.', 'error');
      return;
    }

    const salesInvoiceData = {
      userId: auth.currentUser.uid,
      selectedCompany,
      selectedParty,
      challan,
      pon,
      invoice,
      date,
      rows,
    };

    try {
      const docRef = await addDoc(
        collection(db, 'Sale-invoice'),
        salesInvoiceData
      );
      console.log('Document written with ID: ', docRef.id);
      notify('Data has been saved', 'success');
      setTimeout(async () => {
        // await generatePDF();
        setSelectedCompany('');
        setSelectedParty('');
        setChallan('');
        setPon('');
        setInvoice('');
        setDate('');
        setRows([
          {
            id: 1,
            description: '',
            hsnCode: '',
            qty: '',
            rate: '',
            amount: '',
          },
        ]);
      }, 2000);
    } catch (error) {
      console.error('Error adding document: ', error);
      notify('There was an error saving Data', 'error');
    }
  };

  return (
    <>
      <Notification />
      <DashboardLayout>
        <DashboardNavbar />
        <Card className="shadow con">
          <ArgonBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={3}
          >
            <ArgonTypography variant="button" color="secondary">
              Sales Invoice
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox>
            <div className="receipt-main">
              <div
                className="receipt_header_top"
                style={{ marginBottom: '50px' }}
              >
                <div>
                  <ArgonBox className="receipt_header_top_left">
                    <label htmlFor="sales_select_company">
                      <ArgonTypography variant="h6" color="secondary">
                        Bill From:
                      </ArgonTypography>
                    </label>
                    <select
                      value={selectedCompany}
                      id="sales_select_company"
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="input_select"
                    >
                      <option value="">Select Company</option>
                      {company.map((companyList) => (
                        <option key={companyList.id} value={companyList.name}>
                          {companyList.name}
                        </option>
                      ))}
                    </select>
                  </ArgonBox>
                  <ArgonBox className="receipt_header_top_left" mt={2}>
                    <label htmlFor="sales_select_party">
                      <ArgonTypography variant="h6" color="secondary">
                        Bill To:
                      </ArgonTypography>
                    </label>
                    <select
                      value={selectedParty}
                      id="sales_select_party"
                      onChange={(e) => setSelectedParty(e.target.value)}
                      className="input_select"
                    >
                      <option value="">Select Party</option>
                      {party.map((partyList) => (
                        <option key={partyList.id} value={partyList.name}>
                          {partyList.name}
                        </option>
                      ))}
                    </select>
                  </ArgonBox>
                </div>
                <SalesInvoiceHeader
                  challan={challan}
                  setChallan={setChallan}
                  pon={pon}
                  setPon={setPon}
                  invoice={invoice}
                  setInvoice={setInvoice}
                  date={date}
                  setDate={setDate}
                />
              </div>

              <div>
                <Table
                  className="align-items-center table-flush new_table"
                  hover
                  responsive
                >
                  <SalesInvoiceTable
                    handleInputChange={handleInputChange}
                    rows={rows}
                    addRow={addRow}
                  />
                </Table>
              </div>
              <ArgonBox
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '20px',
                }}
              >
                <ArgonButton
                  onClick={handleSubmit}
                  type="button"
                  color="success"
                >
                  Save
                </ArgonButton>
              </ArgonBox>
            </div>
          </ArgonBox>
        </Card>
      </DashboardLayout>
    </>
  );
};

export default SalesInvoice;
