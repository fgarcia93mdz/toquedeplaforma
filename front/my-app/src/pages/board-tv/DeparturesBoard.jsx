import { CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import TableDepartures from "../../components/table/TableDepartures";
// import Typography from "@mui/material/Typography";
import logo from "../../assets/img/logoTerminalMdzSinFondo.png"


import TicketCardDepartures from "../../components/ticketCards/TicketCardDepartures";
import "./ArrivalsBoard.styles.css";
import Box from "@mui/material/Box";
import TableDeparturesHead from "../../components/table/TableDeparturesHead";

const DeparturesBoard = () => {
  const [partidas, setPArtidas] = React.useState([]);

  const getPartidas = () => {
    axios
      .get("http://localhost:8080/plataforma/partidas")
      .then((data) => {
        return setPArtidas(data.data);
      })
      .catch((err) => console.log("Error GET departures:", err));
  };

  useEffect(() => {
    getPartidas();
    setInterval(() => {
      getPartidas();
    }, 10000);
  }, []);

  return (
    <>
      <div className="containerBoard">
        <div>
          {partidas.length === 0 && (
            <>
              <TableDeparturesHead width='80px' />
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                height={"60vh"}
              >
                <Typography variant='subtitle1' textTransform=" uppercase">No hay partidas en Plataforma</Typography>
                <Box
                  component="img"
                  src={logo}
                  sx={{ width: "auto", height: "40vh" }}
                />
                
              </Stack>
            </>
          )}
          {partidas.length === undefined && (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={"40vh"}
            >
              <CircularProgress />
            </Stack>
          )}
          {partidas.length > 0 && 
            <Box display={{xs:'none', sm:'block'}}>
              <TableDepartures props={partidas} />
            </Box>
          }
          {partidas.length > 0 && 
            <Box display={{xs:'block', sm:'none'}}>
            <TicketCardDepartures props={partidas}/>
            </Box>
          }
        </div>
      </div>
    </>
  );
};

export default DeparturesBoard;
