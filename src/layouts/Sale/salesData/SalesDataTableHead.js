import React from 'react';
import ArgonBox from '../../../components/ArgonBox';
import ArgonTypography from '../../../components/ArgonTypography';

const SalesDataTableHead = () => {
  return (
    <>
      <thead className="thead-light">
        <tr>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                No.
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                From
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                To
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                Challan
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                Invoice
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >0
                Date
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                Amount
              </ArgonTypography>
            </ArgonBox>
          </th>
        </tr>
      </thead>
    </>
  );
};

export default SalesDataTableHead;
