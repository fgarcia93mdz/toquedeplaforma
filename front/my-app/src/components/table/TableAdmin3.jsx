/* TABLERO DE SEGURIDAD */

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import ReactHTMLTableToExcel from "@goodev/react-html-table-to-excel";
import Typography from "@mui/material/Typography";

export default function TableAdmin3({ data, edit }) {
  // edit. if edit is true so the table will have a column with edit button

  const day = `Registro de ingresantes en informes_${new Date()
    .toJSON()
    .slice(0, 10)}`;


  return (
    <TableContainer
      component={Paper}
      sx={{ width: "98%", margin: "auto", borderRadius: "30px" }}
    >
      <Box px={4}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" id="informes">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography textTransform="uppercase">
                  Nº de <br></br> Registro
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography textTransform="uppercase">
                  Fecha de ingreso
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography textTransform="uppercase">
                  {" "}
                  Horario <br></br> de ingreso
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography textTransform="uppercase">
                  Destino/Origen/Servicio
                </Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Interno</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Empresa</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Interurbano</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Servicio</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Fecha Salida</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">
                  Horario <br></br>Salida
                </Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Plat</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">Estado</Typography>
              </TableCell>
              <TableCell align="center" textTransform="uppercase">
                <Typography textTransform="uppercase">TV</Typography>
              </TableCell>
              {edit && <TableCell align="right">Editar</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log('DATA en tabla admin..:', data)} */}
            {data.length > 0 &&
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.fecha_ingreso}</TableCell>
                  <TableCell align="center">{row.horario_ingreso}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.destino}{" "}
                  </TableCell>
                  <TableCell align="center">{row.interno}</TableCell>
                  <TableCell align="center">{row.empresa}</TableCell>
                  {row.interurbano != null ? (
                    <TableCell align="center">
                      {row.interurbano == "L" ? (
                       " Llegada"
                      ) : (
                      " Salida"
                      )}
                    </TableCell>
                  ) : (
                    <TableCell align="center">-</TableCell>
                  )}
                  {/* <TableCell align="center">{row.interurbano}</TableCell> */}
                  <TableCell align="center">{row.servicio}</TableCell>
                  <TableCell align="center"> {row.fecha_salida} </TableCell>
                  <TableCell align="center"> {row.horario_salida} </TableCell>
                  <TableCell align="center">{row.plataforma}</TableCell>
                  <TableCell align="center">{row.estado}</TableCell>
                  <TableCell align="center">{row.tipo_tv}</TableCell>
                  {edit && (
                    <TableCell align="right">
                      <Link to={`/informes/editar/ingreso/${row.id}`}>
                        {" "}
                        <SettingsIcon />{" "}
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <br />
      <br />
      <Box pl={4}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="informes"
          filename={day}
          sheet="ingresos"
          buttonText="Descargar Reporte"
        />
      </Box>
      <br />
    </TableContainer>
  );
}
