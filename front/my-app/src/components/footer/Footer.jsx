import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import { ThemeProvider } from '@mui/material/styles';
import colors from '../../colors'

import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

const style = {
    color: '#0b2748', 
    backgroundColor: 'white', 
    position:'relative', 
    bottom: '0', 
    right: '0', 
    left: '0',
}




const Footer = () => {
    const [ yearState, setYearState ] = React.useState('')
    
    React.useEffect(() => {
        const date = new Date();
       let year = date.getYear() + 1900;
       setYearState(year);
        console.log('year', year);
    }, [])

    return (

        <Stack role='footer' px={6} py={2} pb={{xs:8 ,sm:0}} direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} alignItems={{ xs: 'center' }} style={style} >
            <ThemeProvider theme={colors}>
                <Box
                    component='img'
                    className=""
                    src={require("../../assets/img/logoTerminalMdz.png")}
                    alt="icono colectivo"

                    sx={{ maxWidth: '90px' }}
                />
                <Box textAlign={{ xs: 'center', sm: 'center', fontSize: 15, }}>

                    {/* <a href="https://www.google.com.ar/maps/place/Terminal+De+%C3%93mnibus+de+Mendoza/@-32.8956179,-68.8314464,17z/data=!4m12!1m6!3m5!1s0x967e093c495d1ce3:0x7798543506fb42c6!2sTerminal+De+%C3%93mnibus+de+Mendoza!8m2!3d-32.8955869!4d-68.8302405!3m4!1s0x967e093c495d1ce3:0x7798543506fb42c6!8m2!3d-32.8955869!4d-68.8302405" ><Typography>¿Cómo llegar?</Typography></a>
                    <a href="https://www.terminalmendoza.com.ar/institucional.html"><Typography textAlign="center">Institutcional</Typography></a>
                    <a href="https://www.terminalmendoza.com.ar/contacto.html"><Typography textAlign="center">Contacto</Typography></a> */}

                </Box>
                <Box textAlign={{ xs: 'center', sm: 'center', fontSize: 15 }}>

                    {/* <a href="https://www.terminalmendoza.com.ar/agencias.html" ><Typography>Agencias</Typography></a>
                    <a href="https://www.terminalmendoza.com.ar/locales.html"><Typography textAlign="center">Locales comerciales</Typography></a>
                    <a href="https://www.terminalmendoza.com.ar/#servicios"><Typography textAlign="center">Servicios</Typography></a> */}
                    {/* <a href="https://shop.terminalmendoza.com.ar/search"><Typography textAlign="center">Venta de pasajes online</Typography></a> */}

                </Box>
                <Box textAlign={{ xs: 'center', sm: 'center' }} py={4}>
                    {/* <a href="https://www.facebook.com/terminalmendoza"><FacebookIcon color='facebook' sx={{ fontSize: 40, marginLeft: 2, }} /> </a>
                    <a href="https://www.instagram.com/terminalmendoza/"><InstagramIcon color='instagram' sx={{ fontSize: 40, marginLeft: 2, }} /></a>
                    <a href="https://twitter.com/terminaltm"><TwitterIcon color='twitter' sx={{ fontSize: 40, marginLeft: 2, }} /></a> */}

                </Box>
                <Box py={{xs:0, sm:4}}>
                    <Box
                        component='img'
                        className=""
                        src={require("../../assets/img/ic-data-fiscal.png")}
                        alt="icono colectivo"

                        sx={{ maxWidth: '40px', marginLeft: "17px" }}

                    />
                    <Box
                        component='img'
                        className=""
                        src={require("../../assets/img/ic-sitio-seguro.png")}
                        alt="icono colectivo"

                        sx={{ maxWidth: '40px', marginLeft: "20px" }}

                    />
                    <Box textAlign={{ xs: 'center', sm: 'rigth' }} py={{xs:4, sm:2}}>
                        <Typography variant='body2'>Terminal de Mendoza</Typography>
                        <Typography variant='body2'>Copyrights { yearState }</Typography>
                    </Box>
                </Box>

            </ThemeProvider>

        </Stack>
    );
}

export default Footer;
