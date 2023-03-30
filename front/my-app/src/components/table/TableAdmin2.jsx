/* TABLERO DE INFORMES, EN PLATAFORMA */

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

export default function TableAdmin2({ data, edit }) {
  // edit. if edit is true so the table will have a column with edit button

  const [timeState, setTimeState] = React.useState("");
  const day = `Registro de en plataforma en informes_${new Date()
    .toJSON()
    .slice(0, 10)}`;

  const timeNow = () => {
    const dateNow = new Date();
    const time = dateNow.getHours() + ":" + dateNow.getMinutes();

    return time;
  };

  const checkTime = (date, hour) => {
    if (date === undefined || date === null) return "none";
    if (hour === undefined || hour === null) return "none";
    const dateNow = new Date();

    const string = `${date}T${hour}`;
    const dateToDate = new Date(string);
    const dateCheck = new Date(dateToDate.getTime() + 20 * 60000);

    // console.log(dateCheck, new Date(dateCheck.getTime() + 20*60000), date, hour);
    // console.log('dateNow', dateNow);
    // console.log('dataCheck', dataCheck);
    if (dateCheck < dateNow) {
      return "#ff00005c";
    } else {
      return "none";
    }
  };

  const setState = (t) => {
    setTimeState(t);
  };

  React.useEffect(() => {
    const getTime = (t) => setState(t);

    const setIntervalData = setInterval(() => {
      const time = timeNow();
      getTime(time);
      // console.log('HICE EL INTERVALO DE 1 MINUTO PA')
    }, 60000);

    const pauseInterval = () => {
      clearInterval(setIntervalData);
    };
    return () => {
      pauseInterval();
    };
  }, [timeState]);

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "98%", margin: "auto", borderRadius: "30px" }}
    >
      <Box px={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" id="informes">
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha de ingreso aca</TableCell>
              <TableCell align="center">
                Horario <br></br>de ingreso
              </TableCell>
              {edit && <TableCell align="right">Editar</TableCell>}
              <TableCell align="center">Destino/Origen/Servicio</TableCell>
              <TableCell align="center">Empresa</TableCell>
              <TableCell align="center">Interno</TableCell>
              <TableCell align="center">Fecha Salida</TableCell>
              <TableCell align="center">
                Horario <br></br>Salida
              </TableCell>
              <TableCell align="center">Plat</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">TV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{
                    background: checkTime(row.fecha_salida, row.horario_salida),
                  }}
                >
                  <TableCell align="left">{row.fecha_ingreso}</TableCell>
                  <TableCell align="center">{row.horario_ingreso}</TableCell>
                  {edit && (
                    <TableCell align="right">
                      <Link to={`/informes/editar/en-plataforma/${row.id}`}>
                        {" "}
                        <SettingsIcon sx={{ pt: 1 }} />{" "}
                      </Link>
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row" align="center">
                    {row.destino}{" "}
                  </TableCell>
                  <TableCell align="center">{row.empresa}</TableCell>
                  <TableCell align="center">{row.interno}</TableCell>
                  <TableCell align="center"> {row.fecha_salida} </TableCell>
                  <TableCell align="center"> {row.horario_salida} </TableCell>
                  {console.log("plataforma", row)}
                  <TableCell align="center">{row.plataforma}</TableCell>
                  <TableCell align="center">{row.estado}</TableCell>
                  <TableCell align="center">{row.tipo_tv}</TableCell>
                  {edit && (
                    <TableCell align="right">
                      <Link to={`/informes/editar/en-plataforma/${row.id}`}>
                        {" "}
                        <SettingsIcon sx={{ pt: 1 }} />{" "}
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
      <Box pl={3}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="informes"
          filename={day}
          sheet="ingresos"
          buttonText="Descargar Excel"
        />
      </Box>
      <br />
    </TableContainer>
  );
}
