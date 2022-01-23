import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import GroupypayApi from './GroupypayApi';
import { GroupProps } from './interfaces';

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
  name: string,
  members: number,
  description: string,
  id: number
) {
  return { name, members, description, id };
}


const GroupsTable = ({groups, email}: {groups: GroupProps[], email: string}) => {
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const rows = []
        for (let group of groups) {
            rows.push(createData(group.name, group.members || 0, group.description, group.id))
        }
        setRows(rows)
    }, [groups])

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Members</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows ? rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                      <Link to={`/users/${email}/groups/${row.id}`}>
                          {row.name}
                      </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.members}</StyledTableCell>
                  <StyledTableCell align="right">{row.description}</StyledTableCell>
                  </StyledTableRow>
            ))
              :
              <h1>NONE</h1>}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default GroupsTable;