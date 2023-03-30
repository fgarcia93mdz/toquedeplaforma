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


export default function TableUsersLogs({ data }) {
  const style = {
    width: "100%",
    paddingBlock: "2vh",
    textAlign: "center",
    align: "center",
  };
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "10px" }} style={style}>
      <Box px={4} >
        <Table
          sx={{ minWidth: 150 }}
          aria-label="simple table"
          id="rrhh"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Registro</TableCell>
              <TableCell align="center">Operación</TableCell>
              <TableCell align="center">Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">{row.tipo_de_estado}</TableCell>
                <TableCell align="center">{row.usuario_log}</TableCell>
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
