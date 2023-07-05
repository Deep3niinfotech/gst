import React from 'react';
import ArgonBox from '../../../components/ArgonBox';
import ArgonTypography from '../../../components/ArgonTypography';

const CompanyTableHead = () => {
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
                Name
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
                Address
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
                Mobile
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
                Email
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
                GSTIN
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
                PAN No.
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th></th>
        </tr>
      </thead>
    </>
  );
};

export default CompanyTableHead;
