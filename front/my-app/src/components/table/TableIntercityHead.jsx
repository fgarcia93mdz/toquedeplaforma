import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from "@mui/material/Typography";
// import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0E315A",
    height: "80px",
  },
  [`&.${tableCellClasses.body}`]: {},
  [`&.${tableCellClasses.root}`]: {
    borderBottom: "none",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    marginLeft: '2rem'
  },
}));
const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0E315A",
    height: "80px",
  },
  [`&.${tableCellClasses.body}`]: {},
  [`&.${tableCellClasses.root}`]: {
    borderBottom: "none",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    marginLeft: '2rem'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#1C68C0",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#124178",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  height: '77px',
  paddingLeft: '2rem'
}));



export default function TableIntercityHead(  ) {
   

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "0px" }}>
      <Table
        sx={{ fontSize: "20px", height: "100%" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                EMPRESA
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                DESDE<br></br>PLATAFORMA
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                HASTA<br></br>PLATAFORMA
              </Typography>
            </StyledTableCell2>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
