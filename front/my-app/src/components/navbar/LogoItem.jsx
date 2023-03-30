import { Box } from '@mui/material'
import React from 'react'

const LogoItem = ({width}) => {

    return (
        <Box
            component="img"
            className=""
            src={require("../../assets/img/icono-colectivo.png")}
            alt="icono colectivo"
            sx={{
            paddingInline: '12px',
            maxWidth: "40px", minWidth: "32px",
            paddingBottom: '7px', paddingTop: '12px'
        
        }}
        />
    )
}

export default LogoItem