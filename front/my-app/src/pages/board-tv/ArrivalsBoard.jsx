import { Box, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import TableArrivals from "../../components/table/TableArrivals";

// inicio

import "./ArrivalsBoard.styles.css";
import TicketCardArrivals from "../../components/ticketCards/TicketCardArrivals";
import logo from "../../assets/img/logoTerminalMdzSinFondo.png"
import TableArrivalsHead from "../../components/table/TableArrivalsHead";




// import { useSelector } from 'react-redux';

const ArrivalsBoard = () => {
  const [arribos, setArribos] = React.useState([]);

  const getArrivals = () => {
    axios
      .get("http://localhost:8080/plataforma/arribos")
      .then((data) => {
        setArribos(data.data);
        // console.log('data data:', data.data)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getArrivals();

    setInterval(() => {
      getArrivals();
    }, 10000);
  }, []);

  return (
    <>
      <div className="containerBoard">
        <div>
          {arribos.length === undefined && (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={"40vh"}
            >
              <CircularProgress />
            </Stack>
          )}
          {arribos.length === 0 && (
            <>
              <TableArrivalsHead height="80px" sx={{display: {xs: 'none', sm: 'block'}}}/>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                height={"60vh"}
              >
                <Typography variant="subtitle1" textTransform=" uppercase">
                  No hay arribos en Plataforma
                </Typography>
                <Box
                  component="img"
                  src={logo}
                  sx={{ width: "auto", height: "40vh" }}
                />
              </Stack>
            </>
          )}
          {arribos.length > 0 && (
            <Box display={{ xs: "none", sm: "block" }}>
              <TableArrivals props={arribos} />
            </Box>
          )}
          {arribos.length > 0 && (
            <Box display={{ xs: "block", sm: "none" }}>
              <TicketCardArrivals props={arribos} />
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default ArrivalsBoard;
