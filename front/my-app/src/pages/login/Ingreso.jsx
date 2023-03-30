import * as React from 'react';
import './login.css';
import Box from '@mui/material/Box';

const style = {
    // padding: '5%',
    maxWidth:'100%',
    height: 'auto'
}


const Ingreso = () => {
    
    return (

<Box>
    {/* <img className="" style={style} src={require("../../assets/img/terminal-front.jpg")} alt="icono colectivo" /> */}
    <Box
        component="img"
        // sx={{
        //   height: 233,
        //   width: 350,
        //   maxHeight: { xs: 233, md: 167 },
        //   maxWidth: { xs: 350, md: 250 },
        // }}
        style={style}
        alt="Terminal de Mendoza"
        src={require("../../assets/img/terminal-front.jpg")}
      />  
</Box>
        
          
            

    );
}

export default Ingreso;
