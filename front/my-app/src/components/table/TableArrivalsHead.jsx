import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

export default function TableArrivalsHead( {width, height} ) {

  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0E315A",
      height: height,
      width: width
    },
    [`&.${tableCellClasses.body}`]: {},
    [`&.${tableCellClasses.root}`]: {
      borderBottom: "none",
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      padding: "10px",
      marginLeft: "2rem",
    },
  }));

  return (
    <TableContainer component={Paper} >
      <Table sx={{ fontSize: "20px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell2 align="center">
              {" "}
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                ORIGEN
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                EMPRESA
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                PLAT
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "20px" }}>
                INTERNO
              </Typography>
            </StyledTableCell2>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
