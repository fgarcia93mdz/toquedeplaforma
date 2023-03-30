// import FormTicket from '../../components/ticket/FormTicket';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormEditTicketOnPlatform from '../../components/forms/FormEditTicketOnPlatform';
import { Box, CircularProgress, Typography } from '@mui/material';

const InformsEditTicketOnPlatform = () => {
  const [ticket, setTicket] = useState("");
  const token = sessionStorage.getItem("jwt");
  const params = useParams();
  const id = params.id;

  // console.log("params:", params);

  useEffect(() => {
    const url = `http://localhost:8080/informes/${id}`;
    const config = { headers: { authorization: `Bearer ${token}` } };

    axios
      .get(url, config)
      .then((data) => {
        setTicket(data.data.ingresos);
      })
      .catch((error) => console.log("error get edit ticket:", error));
  }, [id, token]);

  return (
    <>
      {ticket === "" ? (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', width:'100vw'}}>
          <CircularProgress  />
          <Typography mt={4}>Cargado información...</Typography>
        </Box>
      ) : (
        <FormEditTicketOnPlatform ticket={ticket} /> 
      )}
    </>
  );
};

export default InformsEditTicketOnPlatform;