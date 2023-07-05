import React from 'react';
import ArgonTypography from '../../components/ArgonTypography';
import ArgonInput from '../../components/ArgonInput';
import ArgonBox from '../../components/ArgonBox';
import PropTypes from 'prop-types';

const SalesInvoiceHeader = ({
  challan,
  setChallan,
  pon,
  setPon,
  invoice,
  setInvoice,
  date,
  setDate,
}) => {
  return (
    <>
      <div>
        <ArgonBox mb={2}>
          <label htmlFor="sales_challan">
            <ArgonTypography color="text" fontWeight="medium" variant="caption">
              Challan No.
            </ArgonTypography>
          </label>
          <ArgonInput
            size="small"
            id="sales_challan"
            placeholder="Challan No."
            type="text"
            className="form-control form-control-alternative"
            aria-invalid="false"
            value={challan}
            onChange={(e) => setChallan(e.target.value)}
          />
        </ArgonBox>
        <ArgonBox mb={2}>
          <label htmlFor="sales_PON">
            <ArgonTypography color="text" fontWeight="medium" variant="caption">
              PON
            </ArgonTypography>
          </label>
          <ArgonInput
            size="small"
            id="sales_PON"
            placeholder="PON"
            type="text"
            className="form-control form-control-alternative"
            aria-invalid="false"
            value={pon}
            onChange={(e) => setPon(e.target.value)}
          />
        </ArgonBox>
      </div>
      <div>
        <ArgonBox mb={2}>
          <label htmlFor="sales_invoice">
            <ArgonTypography color="text" fontWeight="medium" variant="caption">
              Invoice No.
            </ArgonTypography>
          </label>
          <ArgonInput
            size="small"
            id="sales_invoice"
            placeholder="Invoice No."
            type="text"
            className="form-control form-control-alternative"
            aria-invalid="false"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />
        </ArgonBox>
        <ArgonBox mb={2}>
          <label htmlFor="sales_date">
            <ArgonTypography color="text" fontWeight="medium" variant="caption">
              Date
            </ArgonTypography>
          </label>
          <ArgonInput
            size="small"
            id="sales_date"
            type="date"
            className="form-control form-control-alternative"
            aria-invalid="false"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </ArgonBox>
      </div>
    </>
  );
};

SalesInvoiceHeader.propTypes = {
  challan: PropTypes.string.isRequired,
  setChallan: PropTypes.func.isRequired,
  pon: PropTypes.string.isRequired,
  setPon: PropTypes.func.isRequired,
  invoice: PropTypes.string.isRequired,
  setInvoice: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
};

export default SalesInvoiceHeader;