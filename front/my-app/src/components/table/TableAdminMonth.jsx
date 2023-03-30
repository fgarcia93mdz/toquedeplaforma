/* TABLERO DE SEGURIDAD */

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

import Typography from "@mui/material/Typography";

export default function TableAdminMonth({ data, edit }) {
  // edit. if edit is true so the table will have a column with edit button
  //  console.log('data', data)

  

  // React.useEffect(() => {
  //   resetState();
  //   return () => {};
  // }, []);



  const style = {
    background: "#0b2748",
    color: "white",
    ".MuiAccordionSummary-root .MuiSvgIcon-root": {
      color: "white",
      fontSize: "3.5rem",
    },
    "Mui-expanded": {
      margin: "0px",
    },
    "&:focus": {
      background: "#0b2748",
    },
  };

  return (
    <Box sx={{ background: "#0B2748", color: "white", paddingBottom: "32px" }}>
      
      <Typography
        variant="h3"
        textAlign="center"
        color="white"
        py={3}
        sx={{
          fontSize: { xs: "25px", md: "45px" },
        }}
      >
        REGISTRO ADMINISTRATIVO MENSUAL
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ width: "98%", margin: "auto", borderRadius: "20px" }}
      >
        <Box px={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" id="informes">
            <TableHead>
              <TableRow >
                <TableCell align="left">
                  <Typography textTransform="uppercase">
                    Nº de <br></br> Registro
                  </Typography>
                </TableCell>
                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">
                    Creación del registro
                  </Typography>
                </TableCell>

                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">Usuario</Typography>
                </TableCell>

                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">Operación</Typography>
                </TableCell>

                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">Empresa</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography textTransform="uppercase">
                    Destino/Origen/Servicio
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

                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">Interno</Typography>
                </TableCell>

                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">Servicio</Typography>
                </TableCell>

                <TableCell align="center" textTransform="uppercase">
                  <Typography textTransform="uppercase">
                    Fecha Salida
                  </Typography>
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
                  <Typography textTransform="uppercase">Interurbano</Typography>
                </TableCell>

                {edit && <TableCell align="right">Editar</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.id}</TableCell>

                  <TableCell align="center">{row.createdAt}</TableCell>

                  <TableCell align="center">
                    {row.registro_usuario.usuario}
                  </TableCell>

                  <TableCell align="center">
                    {row.registro_operacion.tipo_operacion}
                  </TableCell>

                  <TableCell align="center">
                    {row.registro_empresa.empresa}
                  </TableCell>

                  <TableCell component="th" scope="row" align="center">
                    {row.destino}{" "}
                  </TableCell>

                  <TableCell align="left">{row.fecha_ingreso}</TableCell>

                  <TableCell align="center">{row.hora_ingreso}</TableCell>

                  <TableCell align="center">{row.interno}</TableCell>

                  <TableCell align="center">
                    {row.registro_servicio.siglas}
                  </TableCell>

                  <TableCell align="center"> {row.fecha_salida} </TableCell>

                  <TableCell align="center"> {row.hora_salida} </TableCell>

                  <TableCell align="center">
                    {row.registro_plataforma.plataforma}
                  </TableCell>

                  <TableCell align="center">
                    {row.registro_estado.tipo}
                  </TableCell>

                  {row.interurbano != null ? (
                    <TableCell align="center">
                      {row.interurbano == "L" ? " Llegada" : " Salida"}
                    </TableCell>
                  ) : (
                    <TableCell align="center">-</TableCell>
                  )}

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
      </TableContainer>
    </Box>
  );
}
