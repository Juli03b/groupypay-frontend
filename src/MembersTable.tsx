import { Link, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { MemberPaymentProps, MemberProps } from "./interfaces";
import { Link as rrdLink, Navigate } from "react-router-dom";

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

const MembersTable: FC<{members: MemberProps, onClick: any}> = ({members, onClick}) => {

    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const rows = []
        for (let [memberId, member] of Object.entries(members)) {
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
              { rows ? rows.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link component={rrdLink} to={`#`} onClick={() => (onClick(members[row.id]))}>
                        <Typography variant="body1">{row.name}</Typography>
                    </Link>
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