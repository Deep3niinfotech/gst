import React from 'react';
import ArgonBox from '../../components/ArgonBox';
import ArgonTypography from '../../components/ArgonTypography';
import ArgonInput from '../../components/ArgonInput';
import ArgonButton from '../../components/ArgonButton';
import PropTypes from 'prop-types';

const tableHeaderData = [
  {
    id: '1',
    header: 'No.',
  },
  {
    id: '2',
    header: 'Description',
  },
  {
    id: '3',
    header: 'HSN Code',
  },
  {
    id: '4',
    header: 'QTY',
  },
  {
    id: '5',
    header: 'Rate',
  },
  {
    id: '6',
    header: 'Amount',
  },
];

const SalesInvoiceTable = ({ handleInputChange, rows, addRow }) => {
  const totalQty = rows.reduce(
    (total, row) => total + parseFloat(row.qty || 0),
    0
  );

  const totalAmount = parseFloat(
    rows
      .reduce((total, row) => {
        const rowAmount = parseFloat(row.amount || 0);
        return total + rowAmount;
      }, 0)
      .toFixed(2)
  );

  return (
    <>
      <thead className="thead-light">
        <tr className="invoice_table_tr">
          {tableHeaderData.map((header) => {
            return (
              <th key={header.id}>
                <ArgonBox>
                  <ArgonTypography
                    color="secondary"
                    variant="caption"
                    fontWeight="medium"
                  >
                    {header.header}
                  </ArgonTypography>
                </ArgonBox>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const amount = row.qty * row.rate;
          return (
            <tr key={row.id} className="invoice_table_tr">
              <td>
                <ArgonBox>
                  <ArgonTypography variant="caption" color="secondary">
                    {row.id}
                  </ArgonTypography>
                </ArgonBox>
              </td>
              <td className="sales_table_td">
                <ArgonInput
                  size="small"
                  id={`sales_table_description_${row.id}`}
                  type="text"
                  className="form-control form-control-alternative"
                  aria-invalid="false"
                  value={row.description}
                  onChange={(e) =>
                    handleInputChange(row.id, 'description', e.target.value)
                  }
                />
              </td>
              <td className="sales_table_td">
                <ArgonInput
                  size="small"
                  id={`sales_table_HSN_code${row.id}`}
                  type="number"
                  className="form-control form-control-alternative"
                  aria-invalid="false"
                  value={row.hsnCode}
                  onChange={(e) =>
                    handleInputChange(row.id, 'hsnCode', e.target.value)
                  }
                />
              </td>
              <td className="sales_table_td">
                <ArgonInput
                  size="small"
                  id={`sales_table_Qty${row.id}`}
                  type="number"
                  className="form-control form-control-alternative"
                  aria-invalid="false"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(row.id, 'qty', e.target.value)
                  }
                />
              </td>
              <td className="sales_table_td">
                <ArgonInput
                  size="small"
                  id={`sales_table_Rate${row.id}`}
                  type="number"
                  className="form-control form-control-alternative"
                  aria-invalid="false"
                  value={row.rate}
                  onChange={(e) =>
                    handleInputChange(row.id, 'rate', e.target.value)
                  }
                />
              </td>
              <td className="sales_table_td">
                <ArgonInput
                  size="small"
                  id={`sales_table_Amount${row.id}`}
                  type="number"
                  className="form-control form-control-alternative"
                  aria-invalid="false"
                  value={amount.toFixed(2)}
                  onChange={(e) =>
                    handleInputChange(row.id, 'amount', e.target.value)
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="7">
            <ArgonButton
              color="white"
              size="medium"
              type="button"
              onClick={addRow}
            >
              Add Row +
            </ArgonButton>
          </td>
        </tr>
        <tr className="invoice_table_tr">
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                Total
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th></th>
          <th></th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                {totalQty}
              </ArgonTypography>
            </ArgonBox>
          </th>
          <th></th>
          <th>
            <ArgonBox>
              <ArgonTypography
                color="secondary"
                variant="caption"
                fontWeight="medium"
              >
                {totalAmount}
              </ArgonTypography>
            </ArgonBox>
          </th>
        </tr>
      </tfoot>
    </>
  );
};

SalesInvoiceTable.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  addRow: PropTypes.func.isRequired,
};

export default SalesInvoiceTable;
