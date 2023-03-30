import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import TableDepartures from "../../components/table/TableDepartures";
import Typography from "@mui/material/Typography";
import Greating from "../../components/clock2/Greating";
import "./ArrivalsBoard.styles.css";
import logo from "../../assets/img/logoTerminalMdzSinFondo.png";
import TableDeparturesHead from "../../components/table/TableDeparturesHead";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Marquee from "react-fast-marquee";


const DeparturesBoard = () => {
  const [time, changeTime] = useState(new Date().toLocaleTimeString());
  /*const ap = ( time < 12) ? "<span>AM</span>":"<span>PM</span>";*/
  const [data, setData] = React.useState([]);

  const url = "http://localhost:8080/marquesinas/marquesina";

  React.useEffect(() => {
    axios
      .get(url)
      .then((data) => {
        return setData(data.data.marquesina);
      })
      .catch((error) => console.log("Error Marquesine Table:", error));
  }, []);

  const handle = useFullScreenHandle();

  useEffect(function () {
    setInterval(() => {
      changeTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

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
  
  const styleMarquee = {
    padding: "0px",
    maxHeight: "100px",
    color: "#0E315A",
    margin: "0",
    background: "white",
    transform: 'rotate(90deg)',
    textTransform: 'uppercase',
    position: 'absolute',
    left: '49.3%',
    bottom: '96.6vh'
  }

  return (
    <>
      <Marquee
        gradient={false}
        speed={0.051}
        style={styleMarquee}
      >
        <span className="texto" style={{paddingTop: '3px'}}>
          {data?.texto && data.texto}
        </span>

      </Marquee> 
      <Box
        className="containerBoard"
        sx={{ textOrientation: "sideways-right", writingMode: "tb-rl" }}
      >
        {/* ACA VA lo que entra en full screen */}
        <FullScreen handle={handle}>
          <Stack
            direction="row"
            pr={3}
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={4}
            sx={{ height: "100vh", background: '#0e315a' }}
          >
            <Typography
              pr={1.4}
              pt={2}
              textAlign="left"
              fontSize={{ xs: "15px", sm: "20px", md: "35px" }}
              sx={{ fontFamily: "Roboto", color: 'white' }}
              textTransform=" uppercase"
            >
              Partidas - Departures
            </Typography>
            {/* RELOJ */}
            <Greating text={time} style={{color: 'white', fontSize: '60px', fontWeight: '400', marginLeft: '0', paddingBottom: '2px' }} />
          </Stack>
          <div>
            {partidas.length === 0 && (
              <>
                <TableDeparturesHead />
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"95vh"}
                  mr={4}
                >
                  <Box
                    component="img"
                    src={logo}
                    sx={{
                      width: "auto",
                      height: "40vh",
                      transform: "rotate(90deg)",
                    }}
                  />
                  <Typography variant="subtitle1" mr={4}>
                    No hay partidas en Plataforma
                  </Typography>
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
            {partidas.length > 0 && (
              <TableDepartures props={partidas} height="100%" width="60px" />
            )}
          </div>
        </FullScreen>
        {/* BOTON FULL SCREEN */}
        <button className='fullscreen-button' onClick={handle.enter}>
          <FullscreenIcon />
        </button>
      </Box>
    </>
  );
};

export default DeparturesBoard;
