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
        fontSize={{ xs: "30px", sm: "50px" }}
        margin={{ xs: "0", sm: "5%" }}
        fontFamily="Roboto"
        backgroundColor="rgb(28, 104, 192)"
        borderRadius="0"
        color="white"
        textTransform=" uppercase"
        position="sticky"
        top="0"
      >
        INTERURBANOS
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
              <Typography variant="caption">Empresa:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.empresa.empresa}
              </Typography>
              <Typography variant="caption">Desde plataforma:</Typography>
              <Typography variant="h5" fontWeight="bold" marginLeft="15%">
                {row.desde}
              </Typography>
              {/*<Typography variant="caption">Hasta plataforma:</Typography>
              <Typography variant="h5" fontWeight="bold">
                {row.hasta}
              </Typography>*/}
            </Grid>
            <Grid item xs={4} margintTop="2%">
              <br></br>
              <br></br>
              <Typography variant="caption">Hasta plataforma:</Typography>
              <Typography variant="h5" fontWeight="bold" marginLeft="30%">
                {row.hasta}
              </Typography>
            </Grid>
          </Grid>
        ))}
    </Box>
  );
}
