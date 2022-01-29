import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MemberProps } from "./interfaces";

function createData(
    id: string,
    name: string,
    email: string,
    phone_number: string
) {
  return { id, name, email, phone_number }
}

const PaymentSplit = ({members, formValues, disabled, onChange}:{members: MemberProps, formValues: any, disabled: boolean, onChange: Function}) => {
    const [rows, setRows] = useState<any[]>([]);

    
    useEffect(() => {
        const rows = []
        for (let [memberId, member] of Object.entries(members)) {
          rows.push(createData(memberId, member.name, member.email, member.phone_number))
        }

        setRows(rows);

    }, [members]);

    return (
        <TableContainer component={Paper} sx={disabled ? {pointerEvents: "none", opacity: 0.7} : {}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                  <TextField
                    id="outlined-number"
                    label=""
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                      inputProps:{
                      min: 0,
                      step: "any"
                    }}}
                    value={formValues[row.id]}
                    onChange={(values) => onChange(values, row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default PaymentSplit;