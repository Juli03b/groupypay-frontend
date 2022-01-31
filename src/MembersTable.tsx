import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { MemberPaymentProps, MemberProps } from "./interfaces";

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
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  payments: number
) {
  return { id, name, email, phoneNumber, payments };
}

const MembersTable: FC<{members: MemberProps}> = ({members}) => {

    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const rows = []
        for (let [memberId, member] of Object.entries(members)) {
          console.log("member:", member);
          rows.push(createData(memberId, member.name, member.email, member.phone_number, member.payments.length));
        }

        setRows(rows)

    }, [members])

    return (
        <TableContainer component={Paper}>
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
                    Email
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="caption">
                    Phone number
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="caption">
                    Payments
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows ? rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                      <Typography variant="body1">{row.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">{row.email}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">{row.phoneNumber || "Not provided"}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">{row.payments}</Typography>
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

export default MembersTable;