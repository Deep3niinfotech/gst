import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar';
import { Icon } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

import ArgonBox from '../../../components/ArgonBox';
import ArgonTypography from '../../../components/ArgonTypography';
import ArgonInput from '../../../components/ArgonInput';

import { db, auth, storage } from '../../Firebase';
import { collection, doc, getDocs } from 'firebase/firestore';

import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import SalesDataTableHead from './SalesDataTableHead';

const SalesData = () => {
  const [sales, setSales] = useState([]);

  const salesCollectionRef = collection(db, 'Sale-invoice');
  const getSales = async () => {
    const querySnapshot = await getDocs(salesCollectionRef);
    const filteredSales = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((sale) => sale.userId === auth.currentUser.uid);
    setSales(filteredSales);
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Card className="shadow zone_con con">
          <CardHeader>
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
              </ArgonBox>
            </ArgonBox>
          </CardHeader>
          <CardBody>
            <Table
              className="align-items-center table-flush new_table"
              hover
              responsive
            >
              <SalesDataTableHead />
              <tbody>
                {sales.map((sales, index) => {
                  return (
                    <tr key={sales.id}>
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
                            {sales.selectedCompany}
                          </ArgonTypography>
                        </ArgonBox>
                      </td>
                      <td>
                        <ArgonBox>
                          <ArgonTypography variant="caption" color="secondary">
                            {sales.selectedParty}
                          </ArgonTypography>
                        </ArgonBox>
                      </td>
                      <td>
                        <ArgonBox>
                          <ArgonTypography variant="caption" color="secondary">
                            {sales.challan}
                          </ArgonTypography>
                        </ArgonBox>
                      </td>
                      <td>
                        <ArgonBox>
                          <ArgonTypography variant="caption" color="secondary">
                            {sales.invoice}
                          </ArgonTypography>
                        </ArgonBox>
                      </td>
                      <td>
                        <ArgonBox>
                          <ArgonTypography variant="caption" color="secondary">
                            {sales.date}
                          </ArgonTypography>
                        </ArgonBox>
                      </td>
                      <td>
                        <ArgonBox>
                          <ArgonTypography variant="caption" color="secondary">
                            {''}
                          </ArgonTypography>
                        </ArgonBox>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </DashboardLayout>
    </>
  );
};

export default SalesData;
