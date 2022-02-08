import { Link, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link as rrdLink, Navigate } from "react-router-dom";
import { GroupPaymentProps } from "./interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
    id: number,
    name: string,
    total_amount: string
) {
  return { id, name, total_amount };
}

const PaymentsTable = ({payments, onClick}: {payments: GroupPaymentProps[], onClick: any}) => {
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const rows = []

        for (let payment of payments) {
          rows.push(createData(payment.id, payment.name, payment.total_amount))
        }

        setRows(rows);

    }, [payments])

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="payments-table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography variant="caption">Name</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="caption">Amount</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { 
                rows && rows.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <Link component={rrdLink} to={`#`} onClick={() => onClick(payments[index])}>
                        <Typography variant="body1">{row.name}</Typography>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body1">
                        $ {row.total_amount}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default PaymentsTable;