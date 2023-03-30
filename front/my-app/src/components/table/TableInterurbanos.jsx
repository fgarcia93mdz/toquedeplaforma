import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
// import { useSelector } from 'react-redux';

// ====== DESHUSO ====== !!!!!!!!!

export default function GenericTableInterurbanos({ props }) {

  const { width, height, vertical = false } = props
  console.log("🚀 ~ file: TableInterurbanos.jsx:20 ~ GenericTableInterurbanos ~ props", props)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0E315A",
      height: height
    },
    [`&.${tableCellClasses.body}`]: {},
    [`&.${tableCellClasses.root}`]: {
      borderBottom: "none",
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
      padding: "0px",
      // maxWidth: "100px",
      // marginLeft: "2rem",
      
    }
  }));
  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0E315A",
      height: height,
    },
    [`&.${tableCellClasses.body}`]: {},
    [`&.${tableCellClasses.root}`]: {
      borderBottom: "none",
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      padding: "0px",
      // marginLeft: "2rem",
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
    height: "77px",
    paddingLeft: "2rem",
  }));
  
  const styles = {
    cajaFoto: {
      width: "152px",
      height: "56px",
      border: "1px solid white",
      color: "black",
      margin: "auto",
      overflow: "hidden",
    },
  };

  const stylesImagen = {
    width: '110px',
    height: '99px',
    transform: vertical ? 'rotate(90deg)' : 'rotate(0deg)',
    padding: 0,
    margin: 0,
    objectFit: 'contain'
  }
  // const HOUR_ESTIMATED
  // const HOUR_ARRIVAL
  // const HOUR_DEPARTURE
  // const COMPANY
  // const IMG
  // const STATE

  // const colectivosRedux  = useSelector(state => state.estado);

  // console.log('data:', colectivosRedux)
  // if(props){
  //   // console.log('PROPSS table:', props)
  // }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ fontSize: "20px", height: "100%" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "22px" }}>
                EMPRESA
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "22px" }}>
                DESDE<br></br>PLATAFORMA
              </Typography>
            </StyledTableCell2>
            <StyledTableCell2 align="center">
              <Typography fontSize={{ xs: "10px", sm: "15px", md: "22px" }}>
                HASTA<br></br>PLATAFORMA
              </Typography>
            </StyledTableCell2>
          </TableRow>
        </TableHead>
        <TableBody>
          {props &&
            props.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center" style={{ maxWidth: "5vw" }}>
                  <Typography
                    fontSize={{ xs: "10px", sm: "15px", md: "18px" }}
                    textTransform="uppercase"
                    style={{
                      paddingTop: vertical ? "5vh" : "auto",
                      marginLeft: vertical ? "auto" : "0vw",
                    }}
                  >
                    {row.empresa.empresa}
                  </Typography>
                </StyledTableCell>
                {/*<StyledTableCell align="center">
                  {row.empresa.img != null && (
                      <img
                        style={stylesImagen}
                        src={row.empresa.img}
                        alt="Error en imagen"
                      />
                  )} 
                </StyledTableCell> */}
                <StyledTableCell align="center" fontSize={{ xs: 10 }}>
                  <Typography fontSize={{ xs: "10px", sm: "15px", md: "18px" }}>
                    {row.plataforma_desde.plataforma}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography fontSize={{ xs: "10px", sm: "15px", md: "18px" }}>
                    {row.plataforma_hasta.plataforma}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
