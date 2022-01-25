import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { MemberProps } from "./interfaces";

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
  email: string,
  phoneNumber: string
) {
  return { id, name, email, phoneNumber };
}

const MembersTable: FC<{members: MemberProps[]}> = ({members}) => {
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const rows = []
        for (let member of members) {
          rows.push(createData(member.id, member.name, member.email, member.phone_number))
        }

        setRows(rows)

    }, [members])

    return (
        <TableContainer component={Paper}>
          {console.log(members)}
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows ? rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                      {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
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