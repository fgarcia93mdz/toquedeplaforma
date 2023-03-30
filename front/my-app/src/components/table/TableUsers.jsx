import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import ReactHTMLTableToExcel from "@goodev/react-html-table-to-excel";

const day = `Informe de ingresos_${new Date().toJSON().slice(0, 10)}`;


export default function TableUsers({ data }) {
  return (
    <TableContainer component={Paper} sx={{borderRadius: '30px'}}>
      <Box px={4}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          id="rrhh"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Usuario</TableCell>
              <TableCell align="center">Rol</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log('DATA en tabla admin..:', data)} */}
            {data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}{" "}
                </TableCell>
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.apellido}</TableCell>
                <TableCell align="center">{row.usuario}</TableCell>
                <TableCell align="center">{row.rol_usuario.rol}</TableCell>
                <TableCell align="center">
                  <Link to={`/usuarios/editar/${row.id}`}>
                    <SettingsIcon />
                  </Link>
                </TableCell>
              </TableRow>
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
            table="rrhh"
            filename={day}
            sheet="Usuarios"
            buttonText="Descargar Excel"
          />
      </Box>
      <br />
    </TableContainer>
  );
}
