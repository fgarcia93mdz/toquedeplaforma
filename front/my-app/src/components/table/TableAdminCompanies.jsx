import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import ReactHTMLTableToExcel from "@goodev/react-html-table-to-excel";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import axios from 'axios';




export default function TableAdminCompanies({ data }) {   
  const [open, setOpen] = React.useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSuccess = () => setOpenSuccessModal(true);
  const handleCloseSuccess = () => setOpenSuccessModal(false);
  const [ dataModal, setDataModal ] = React.useState({})
  // edit. if edit is true so the table will have a column with edit button

  const day = `Registro de Listado de Empresas ${new Date().toJSON().slice(0, 10)}`;

  // console.log('data table admin:', data)

  const styleModal = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    height: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
  };

  const editThis = (data) => {
    handleOpen();
    setDataModal(data)
  }

  const closeEverything = () => {
    handleClose();
    handleCloseSuccess()
  }

  const deleteCompany = (id) => {
    // console.log('delete company:', id);
    const url = `http://localhost:8080/empresas/${id}`;
    const config = { headers: {"authorization": `Bearer ${sessionStorage.getItem('jwt')}` }};



      axios.delete(url, config)
      .then( res => 
        handleOpenSuccess()
      )
      .catch( err => console.log('Error delete:', err))

    


  }

  

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "98%", margin: "auto", borderRadius: "30px" }}
      >
        <Box px={2}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" id="informes">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Siglas</TableCell>
                <TableCell align="center">Imagen</TableCell>
                <TableCell align="center">CUIT</TableCell>
                <TableCell align="center">Eliminar</TableCell>
                <TableCell align="center">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="center">{row.empresa}</TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.siglas}
                      </TableCell>
                      <TableCell align="center">
                        {/* {row.img !== undefined && <Box 
                            component="img" 
                            src={require(`../../assets/img/empresas/${row.img}`)}
                            sx={{ width: '150px', height: '100px' }} />} */}
                        <Box
                          component="img"
                          sx={{
                            height: 60,
                            width: 200,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                          }}
                          alt={row.img}
                          src={row.img}
                        />
                      </TableCell>
                      <TableCell align="center">{row.cuit}</TableCell>
                      <TableCell align="center">
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => editThis(row)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/supervisor/empresas/editar/${row.id}`}>
                          {" "}
                          <SettingsIcon />{" "}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </Box>
        <br />
        <br />
        <Box pl={3}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="informes"
            filename={day}
            sheet="Listado Empresas"
            buttonText="Descargar Listado Empresas"
          />
        </Box>
        <br />
      </TableContainer>

      {/* MODAL DE CONFIRMACION DE ELIMINACION DE EMPRESA */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Va a ser eliminada la:
          </Typography>
          <br></br>
          <Typography>Empresa: {dataModal.empresa}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            CUIT: {dataModal.cuit}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            SIGLAS: {dataModal.siglas}
          </Typography>
          <img
            src={dataModal.img}
            alt={dataModal.empresa}
            width="40%"
            height="40%"
          />
          <Box mt={4} gap={2}>
            <Button variant="contained" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => deleteCompany(dataModal.id)}
              sx={{ marginLeft: "20px" }}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* MODAL DE MENSAJE DE EXITO DE ELIMINACION DE EMPRESA */}
      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {dataModal.empresa} eliminada exitosamente
          </Typography>
          <Button variant="contained" onClick={closeEverything}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
