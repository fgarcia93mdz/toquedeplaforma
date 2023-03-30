import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFoundPage = () => {

    const style = {
        margin:'auto',
        background:'#0e315a',
        color:'white',
        width:'100%',
        textAlign: 'center',
        paddingBlock: '30vh'
    }

    return (
      <Box style={style}>
        <Typography variant="h2">¡Error 404 - No encontrado!</Typography>
        <br></br>
        <Typography variant="h2">
        </Typography>
        <br></br>
        <Typography variant="h4">
          No encontramos la página que estabas buscando
        </Typography>
      </Box>
    );
}

export default NotFoundPage