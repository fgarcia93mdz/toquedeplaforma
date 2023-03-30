import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Modal, Typography } from '@mui/material';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import FormMarquesineEdit from '../forms/FormMarquesineEdit';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';

// const day = `Informe de ingresos_${new Date().toJSON().slice(0, 10)}`;

export default function TableMarquesine() {
    const [data, setData] = React.useState([]);
    const token = window.sessionStorage.getItem('jwt')
    const [open, setOpen] = React.useState(false);
    const [ dataModal, setDataModal ] = React.useState({})
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const url = 'http://localhost:8080/marquesinas'
    const config =  { headers: { 'authorization': `Bearer ${token}` } }

    const style = {
        width: "100%",
        paddingBlock: "2vh",
        textAlign: "center",
        align: "center",
        
    };

    const getMarquesinas = () => {
      axios.get(url, config)
      .then( data => setData(data.data.marquesinas))
      .catch( error => console.log('Error Marquesine Table:', error))
    }
    
    const editThis = (data) => {
      handleOpen();
      setDataModal(data)
    }

    React.useEffect(() => { 
        getMarquesinas();
    }, [])


      // getMarquesinas();
    // eslint-disable-next-line react-hooks/exhaustive-deps


    const stylesModal = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80vw',
      height: 'auto',
      bgcolor: 'background.paper',
      // border: '2px solid #b4b4b4',
      boxShadow: 24,
      // pt: 2
      // p: 4,
    };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "10px" }}
        style={style}
      >
        <Box pr={4} pl={10}>
          <Table
            sx={{ minWidth: 150}}
            aria-label="simple table"
            id="rrhh"
          >
            <TableHead >
              <TableRow>
                <TableCell align="left">Texto</TableCell>
                <TableCell align="right">
                  <WifiProtectedSetupIcon
                    sx={{ color: "#0b2748", cursor: "pointer" }}
                    onClick={getMarquesinas}
                  />
                </TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.reverse().map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.texto}</TableCell>
                  <TableCell align="left"></TableCell>
                  {row.estado != null ? (
                    <TableCell align="center">
                      {row.estado === 0 ? "Inactiva" : "Activa"}
                    </TableCell>
                  ) : (
                    <TableCell align="center">-</TableCell>
                  )}

                  <TableCell align="center">
                    <SettingsIcon
                      onClick={() => editThis(row)}
                      sx={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          pt={4}
        >
          <Box sx={stylesModal}>
            <Typography
              onClick={handleClose}
              sx={{
                color: "white",
                background: "#0b2748",
                fontWeight: "bold",
                fontSize: "1.7rem",
                position: "absolute",
                top: "15px",
                right: "30px",
                cursor: "pointer",
              }}
            >
              X
            </Typography>
            <FormMarquesineEdit
              texto={dataModal?.texto}
              estado={dataModal?.estado}
              id={dataModal?.id}
            />
          </Box>
        </Modal>
      </TableContainer>
    </>
  );
}
