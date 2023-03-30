import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import GenericTable from "../../components/table/TableDepartures";
import Typography from "@mui/material/Typography";
import Greating from "../../components/clock2/Greating";
import "./ArrivalsBoard.styles.css";
import logo from "../../assets/img/logoTerminalMdzSinFondo.png";
import TableDeparturesHead from "../../components/table/TableDeparturesHead";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import GenericTableInterurbanos from "../../components/table/TableInterurbanos";

// ─── Tabla Vertical Publica Interurbanos - TV ───────────────────────────────



const InterurbanosBoard = ( {vertical = true} ) => {
  const [time, changeTime] = useState(new Date().toLocaleTimeString());
  /*const ap = ( time < 12) ? "<span>AM</span>":"<span>PM</span>";*/
  // const vertical = vertical;

  const handle = useFullScreenHandle();

  useEffect(function () {
    setInterval(() => {
      changeTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);


  const token = sessionStorage.getItem("jwt");
  const [data, setData] = React.useState([]);
  const url = "http://localhost:8080/interurbanos";
  const config = { headers: { authorization: `Bearer ${token}` } };

  const getInterurbano = () => {
    axios
      .get(url, config)
      .then((data) => setData(data.data.interurbanos))
      .catch((error) => console.log("Error Interurbanos Table:", error));
  };
  React.useEffect(() => {
    getInterurbano();
  }, []);


  return (
    <Box
      className="containerBoard"
      sx={{ textOrientation: "sideways-right", writingMode: "tb-rl" }}
    >
      {/* ACA VA lo que entra en full screen */}
      <FullScreen handle={handle}>
        <Stack
          direction="row"
          p={2}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={4}
          sx={{ height: vertical ? "95vh" : null }}
        >
          {/* ACA VA ARRIBOS O PARTIDAS EN ESPANOL O INGLES, SOLO PARA LOS TELEVISORES ME PIDIO MI VIEJO */}
          <Typography
            textAlign="left"
            fontSize={{ xs: "15px", sm: "20px", md: "30px" }}
            sx={{ fontFamily: "Roboto" }}
            textTransform=" uppercase"
          >
            Interurbanos - Intercity
          </Typography>
          {/* RELOJ */}
          <Greating text={time} />
        </Stack>
        <div>
          {data.length === 0 && (
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
                    transform:
                      vertical === false ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
                <Typography variant="subtitle1" mr={4}>
                  No hay partidas en Plataforma
                </Typography>
              </Stack>
            </>
          )}
          {data.length === undefined && (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={"40vh"}
            >
              <CircularProgress />
            </Stack>
          )}
          {data.length > 0 && <GenericTableInterurbanos props={data} />}
        </div>
      </FullScreen>
      {/* BOTON FULL SCREEN */}
      <button className="fullscreen-button" onClick={handle.enter}>
        <FullscreenIcon />
      </button>
    </Box>
  );
};

export default InterurbanosBoard;
