
/* TABLERO DE SEGURIDAD */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios'

import TableAdmin3 from '../../components/table/TableAdmin3';


const SecurityHome = () => {
    
    const [ arrivals, setArrivals ] = useState([])

    const token = window.sessionStorage.getItem('jwt')

    // FETCH DATA
    useEffect(()=> {
        
        axios.get('http://localhost:8080/informes/listadoSeparado', { headers: {authorization: `Bearer ${token}` }} )
        .then(data => {
                // console.log('listado:',data.data.respuesta )
                setArrivals(data.data.respuesta.ingresandoSeguridad)
            })
        .catch(error => console.log('error security home', error))
    

    }, [])

    const styles = {
        margin:'auto', 
        width: '100%',
        background: '#0e315a',
        color: 'white',
        paddingBottom: '32px'
    }

    const typographyStyles = {
        paddingBlock: '2vh'
    }
    

    return (
      <Stack>
        <Box style={styles}>
          <Typography
            align="center"
            variant="h4"
            style={typographyStyles}
            sx={{
              fontSize: { xs: "25px", md: "45px" },
            }}
          >
            REGISTRO DE TORRE
          </Typography>
          <TableAdmin3 data={arrivals} />
        </Box>
      </Stack>
    );
}

export default SecurityHome