import React from 'react'
import { Grid, Typography } from '@mui/material'
import Box from "@mui/material/Box";


export default function TicketCard ({ props }) {

    const cardStyle = {
        background: '#1C68C0',
        borderRadius: '25px',
        padding: '20px',
        width:'90%',
        margin: 'auto',
        color: 'white',
        marginBlock: '10px',
        boxShadow: "rgb(0 0 0 / 35%) 1px 2px 6px 2px"

    }

  return (
    <Box sx={{ width: "100%" }}>
        <Typography
          fontWeight="bold"
          textAlign="center"
            fontSize={{ xs: "30px", sm: "50px"}}
            margin={{ xs: "0", sm: "5%",}}
          fontFamily="Roboto"
          backgroundColor="rgb(28, 104, 192)"
          borderRadius="0"
          color="white"
          textTransform=" uppercase"
          position='sticky'
          top='0'
        >
          
            PARTIDAS
        </Typography>
      {props &&
        props.map((row) => (
          <Grid
            container
            style={cardStyle}
            display={{ sm: "none" }}
            key={row.id}
          >
            <Grid item xs={8}>
              <Typography variant="caption">Destino:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.destino}
              </Typography>
              <Typography variant="caption">Estado:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.registro_estado.tipo}
              </Typography>
              <Typography variant="caption">Empresa:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.registro_empresa.empresa}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption">Interno:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.interno}
              </Typography>
              <Typography variant="caption">Plataforma:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.plataformas_id}
              </Typography>
              <Typography variant="caption">Hora de salida:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.hora_salida}
              </Typography>
            </Grid>
          </Grid>
        ))}
    </Box>
  );
}
