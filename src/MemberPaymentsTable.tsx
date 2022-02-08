import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    total_amount: number
) {
  return { id, name, total_amount };
}
const MemberPaymentsTable = ({payments}: {payments: any}) => {

    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
      const rows = [];

      for (let payment of payments) {
        rows.push(createData(payment.id ,payment.name, payment.total_amount))
      }

      setRows(rows);

    }, [payments]);

    return (
        <TableContainer component={Paper}>
          {console.log(payments)}
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography variant="caption">
                    Name
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="caption">
                    Amount
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows ? rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                      <Typography variant="body1">
                        {row.name}
                      </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">
                      $ {row.total_amount}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ))
                :
                <h1>NONE</h1>}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default MemberPaymentsTable