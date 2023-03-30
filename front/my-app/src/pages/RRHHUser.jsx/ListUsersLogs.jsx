import React, { useEffect, useState } from 'react'
import TableUsersLogs from '../../components/table/TableUsersLogs';

import axios from 'axios'
import { Box, Typography } from '@mui/material';

const ListUsers = () => {
    const token = sessionStorage.getItem('jwt')
    const [ users, setUsers ] = useState([])
    
    const config = { headers: {"authorization": `Bearer ${token}` }}
    
    useEffect(() => {
        axios
          .get("http://localhost:8080/logs/usuarios", config)
          .then((data) => {
            // console.log(data.data.usuarios);
            setUsers(data.data.usuarios);
          })
          .catch((error) => console.log("error users", error));
    }, [token])
    
    const style ={
        background: '#0b2748',
        color: 'white',
        minWidth: '100%',
        paddingBlock: '2vh',
        textAlign: 'center'
    }
    

    return (
      <Box px={3} pb={4} sx={{ background: "#0b2748" }}>
        <Typography
          variant="h4"
          style={style}
          sx={{
            fontSize: { xs: "25px", md: "45px" },
          }}
        >
         Registro de ingresos y egresos de usuarios
        </Typography>
        <TableUsersLogs data={users} />
      </Box>
    );
}

export default ListUsers