import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import GenericTable from "../../components/table/TableDepartures";
import Typography from "@mui/material/Typography";
import Greating from "../../components/clock2/Greating";
import "./ArrivalsBoard.styles.css";
import logo from "../../assets/img/logoTerminalMdzSinFondo.png";
import TableIntercityHead from "../../components/table/TableIntercityHead";

import GenericTableInterurbanos from "../../components/table/TableInterurbanos";
import TicketCardIntercity from "../../components/ticketCards/TicketCardIntercity";
// ─── Tabla Horizontal ADMIN Interurbanos - TV ───────────────────────────────

const InterurbanosBoard = () => {
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
      // sx={{ textOrientation: "sideways-right", writingMode: "tb-rl" }}
    >
      <div>
        {data.length === 0 && (
          <>
            <TableIntercityHead />
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={"95vh"}
            >
              <Typography variant="subtitle1" textTransform=" uppercase">
                No hay interurbanos en Plataforma
              </Typography>
              <Box
                component="img"
                src={logo}
                sx={{
                  width: "auto",
                  height: "40vh",
                }}
              />
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
        {data.length > 0 && (
          <Box display={{ xs: "none", sm: "block" }}>
            <GenericTableInterurbanos props={data} />
          </Box>
        )}
        {data.length > 0 && (
          <Box display={{ xs: "block", sm: "none" }}>
            <TicketCardIntercity props={data} />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default InterurbanosBoard;
