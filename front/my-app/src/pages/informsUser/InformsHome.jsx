import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";

import TableAdmin from "../../components/table/TableAdmin";
import TableAdmin2 from "../../components/table/TableAdmin2";
import { Navigate, useNavigate } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const InformsHome = () => {
  const [ingresando, setIngresando] = useState([]);
  const [enPlataforma, setEnPlataforma] = useState([]);
  const [fueraDePlataforma, setFueraDePlataforma] = useState([]);
  const navigate = useNavigate();

  const token = window.sessionStorage.getItem("jwt");

  if (token.estado_password === "0") {
    // console.log('token.estado_password',token.estado_password)
    navigate("/perfil/password");
  }

  useEffect(() => {
    // FETCH INGRESANTES
    const url = "http://localhost:8080/informes/listadoSeparado";
    const config = { headers: { authorization: `Bearer ${token}` } };

    // FETCH ARRIBOS
    axios
      .get(url, config)
      .then((data) => {
        setIngresando(data.data.respuesta.ingresando);
        setEnPlataforma(data.data.respuesta.enPlataforma);
        setFueraDePlataforma(data.data.respuesta.fueraDePlataforma);
      })
      .catch((error) => {
        throw new Error("Error fetch arribos", error);
      });
  }, [token]);

  const style = {
    background: "#0b2748",
    color: "white",
    ".MuiAccordionSummary-root .MuiSvgIcon-root": {
      color: "white",
      fontSize: { xs: "2.5rem", md: "3rem" }
    },
    "Mui-expanded": {
      margin: "0px",
    },
    "&:focus": {
      background: "#0b2748",
    },
    
  };

  const styleTitle = { margin: "auto", fontSize: { xs: "21px", md: "41px" } };

  const typographyStyles = {
    paddingBlock: "2vh",
  };
  const styles = {
    margin: "auto",
    width: "100%",
    background: "#0e315a",
    color: "white",
    paddingBottom: "32px",
  };

  return (
    <>
      <Box style={styles}>
        <Typography
          align="center"
          variant="h4"
          style={typographyStyles}
          sx={{
            fontSize: { xs: "25px", md: "45px" },
          }}>
          REGISTRO DE INFORMES
        </Typography>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={style}>
            <Typography sx={styleTitle}>Ingresantes</Typography>
          </AccordionSummary>
          <AccordionDetails sx={style}>
            <TableAdmin edit={true} data={ingresando} />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={style}>
            <Typography sx={styleTitle}>En plataforma</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableAdmin2 edit={true} data={enPlataforma} />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={style}>
            <Typography sx={styleTitle}>Fuera de plataforma</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableAdmin edit={true} data={fueraDePlataforma} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default InformsHome;
