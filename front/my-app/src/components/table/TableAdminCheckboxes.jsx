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
import ReactHTMLTableToExcel from "@goodev/react-html-table-to-excel";
import Typography from "@mui/material/Typography";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Counter } from "../../features/counter/Counter";
import { reset } from "../../features/counter/counterSlice";
import { useDispatch } from "react-redux";

export default function TableAdminCheckboxes({ data, edit }) {
  // edit. if edit is true so the table will have a column with edit button
  //  console.log('data', data)

  const [stateShowID, setStateShowID] = React.useState(true);
  const [stateShowArrivalDate, setStateShowArrivalDate] = React.useState(true);
  const [stateShowArrivalTime, setStateShowArrivalTime] = React.useState(true);
  const [stateShowDestiny, setStateShowDestiny] = React.useState(true);
  const [stateShowIntern, setStateShowIntern] = React.useState(true);
  const [stateShowCompany, setStateShowCompany] = React.useState(true);
  const [stateShowTypeService, setStateShowTypeService] = React.useState(true);
  const [stateShowDepartureDate, setStateShowDepartureDate] =
    React.useState(true);
  const [stateShowDepartureTime, setStateShowDepartureTime] =
    React.useState(true);
  const [stateShowPlatform, setStateShowPlatform] = React.useState(true);
  const [stateShowState, setStateShowState] = React.useState(true);
  const [stateShowUser, setStateShowUser] = React.useState(true);
  const [stateShowCreatedAt, setStateShowCreatedAt] = React.useState(true);
  const [stateShowOperacion, setStateShowOperacion] = React.useState(true);
  const [stateShowInterurbano, setStateShowInterurbano] = React.useState(true);

  const dispatch = useDispatch();

  const resetState = () => {
    return dispatch(reset());
  };

  React.useEffect(() => {
    resetState();
    return () => {};
  }, []);

  const day = `Registro de ingresantes en informes_${new Date()
    .toJSON()
    .slice(0, 10)}`;

  // console.log("data table admin:", data);

  const showID = (event) => {
    setStateShowID(event.target.checked);
  };

  const showArrivalDate = (event) => {
    setStateShowArrivalDate(event.target.checked);
  };

  const showArrivalTime = (event) => {
    setStateShowArrivalTime(event.target.checked);
  };

  const showDestiny = (event) => {
    setStateShowDestiny(event.target.checked);
  };

  const showIntern = (event) => {
    setStateShowIntern(event.target.checked);
  };

  const showCompany = (event) => {
    setStateShowCompany(event.target.checked);
  };

  const showTypeService = (event) => {
    setStateShowTypeService(event.target.checked);
  };

  const showDepartureDate = (event) => {
    setStateShowDepartureDate(event.target.checked);
  };

  const showDepartureTime = (event) => {
    setStateShowDepartureTime(event.target.checked);
  };

  const showPlatform = (event) => {
    setStateShowPlatform(event.target.checked);
  };

  const showUser = (event) => {
    setStateShowUser(event.target.checked);
  };
  const showCreatedAt = (event) => {
    setStateShowCreatedAt(event.target.checked);
  };
  const showInterurbano = (event) => {
    setStateShowInterurbano(event.target.checked);
  };
  const showOperacion = (event) => {
    setStateShowOperacion(event.target.checked);
  };

  const showState = (event) => {
    setStateShowState(event.target.checked);
  };

  const checkboxStyle = {
    color: "#1976d2",
  };

  const styleCheckboxList = {
    display: "flex",
    flexDirection: "column",
  };

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
        }}>
        REGISTRO ADMINISTRATIVO LOGS
      </Typography>

      <FormGroup sx={{ width: "95%", margin: "auto" }}>
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={style}>
            Filtros
          </AccordionSummary>
          <Grid
            container
            sx={{ width: "100%", justifyContent: "center" }}
            display="flex"
            mb={3}>
            <Grid item sm={2} style={styleCheckboxList}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showID"
                    value={true}
                    onChange={showID}
                    defaultChecked={true}
                    style={checkboxStyle}
                  />
                }
                label="Nº de Registro"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showCreatedAt"
                    style={checkboxStyle}
                    value={true}
                    defaultChecked={true}
                    onChange={showCreatedAt}
                  />
                }
                label="Creación de registro"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showUser"
                    style={checkboxStyle}
                    value={true}
                    defaultChecked={true}
                    onChange={showUser}
                  />
                }
                label="Usuario"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showOperacion"
                    style={checkboxStyle}
                    value={true}
                    defaultChecked={true}
                    onChange={showOperacion}
                  />
                }
                label="Operación"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    defaultChecked={true}
                    name="showCompany"
                    style={checkboxStyle}
                    value={true}
                    onChange={showCompany}
                  />
                }
                label="Empresa"
              />
            </Grid>
            <Grid item sm={2} style={styleCheckboxList}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showDestiny"
                    defaultChecked={true}
                    value={true}
                    style={checkboxStyle}
                    onChange={showDestiny}
                  />
                }
                label="Destino/Origen/Servicio"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showArrivalDate"
                    value={true}
                    defaultChecked={true}
                    style={checkboxStyle}
                    onChange={showArrivalDate}
                  />
                }
                label="Fecha Ingreso"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showTimeArrival"
                    style={checkboxStyle}
                    defaultChecked={true}
                    value={true}
                    onChange={showArrivalTime}
                  />
                }
                label="Horario Ingreso"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showIntern"
                    defaultChecked={true}
                    value={true}
                    onChange={showIntern}
                    style={checkboxStyle}
                  />
                }
                label="Interno"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showTypeService"
                    value={true}
                    style={checkboxStyle}
                    defaultChecked={true}
                    onChange={showTypeService}
                  />
                }
                label="Servicio"
              />
            </Grid>
            <Grid item xs={2} style={styleCheckboxList}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showDepartureDate"
                    value={true}
                    style={checkboxStyle}
                    onChange={showDepartureDate}
                    defaultChecked={true}
                  />
                }
                label="Fecha Salida"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showDepartureTime"
                    defaultChecked={true}
                    style={checkboxStyle}
                    value={true}
                    onChange={showDepartureTime}
                  />
                }
                label="Horario de salida"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showPlatform"
                    style={checkboxStyle}
                    defaultChecked={true}
                    value={true}
                    onChange={showPlatform}
                  />
                }
                label="Plataforma"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showState"
                    style={checkboxStyle}
                    defaultChecked={true}
                    value={true}
                    onChange={showState}
                  />
                }
                label="Estado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="showInterurbano"
                    style={checkboxStyle}
                    value={true}
                    defaultChecked={true}
                    onChange={showInterurbano}
                  />
                }
                label="Interurbano"
              />
            </Grid>
          </Grid>
        </Accordion>
      </FormGroup>
      <Box pr={3} sx={{ float: "right" }}>
        <Counter />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ width: "98%", margin: "auto", borderRadius: "20px" }}>
        <Box px={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" id="informes">
            <TableHead>
              <TableRow>
                {stateShowID && (
                  <TableCell align="left">
                    <Typography textTransform="uppercase">
                      Nº de <br></br> Registro
                    </Typography>
                  </TableCell>
                )}
                {stateShowCreatedAt && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">
                      Creación del registro
                    </Typography>
                  </TableCell>
                )}
                {stateShowUser && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Usuario</Typography>
                  </TableCell>
                )}
                {stateShowOperacion && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Operación</Typography>
                  </TableCell>
                )}
                {stateShowCompany && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Empresa</Typography>
                  </TableCell>
                )}
                {stateShowDestiny && (
                  <TableCell align="center">
                    <Typography textTransform="uppercase">
                      Destino/Origen/Servicio
                    </Typography>
                  </TableCell>
                )}
                {stateShowArrivalDate && (
                  <TableCell align="left">
                    <Typography textTransform="uppercase">
                      Fecha de ingreso
                    </Typography>
                  </TableCell>
                )}
                {stateShowArrivalTime && (
                  <TableCell align="center">
                    <Typography textTransform="uppercase">
                      {" "}
                      Horario <br></br> de ingreso
                    </Typography>
                  </TableCell>
                )}
                {stateShowIntern && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Interno</Typography>
                  </TableCell>
                )}

                {stateShowTypeService && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Servicio</Typography>
                  </TableCell>
                )}
                {stateShowDepartureDate && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">
                      Fecha Salida
                    </Typography>
                  </TableCell>
                )}
                {stateShowDepartureTime && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">
                      Horario <br></br>Salida
                    </Typography>
                  </TableCell>
                )}
                {stateShowPlatform && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Plat</Typography>
                  </TableCell>
                )}
                {stateShowState && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">Estado</Typography>
                  </TableCell>
                )}
                {stateShowInterurbano && (
                  <TableCell align="center" textTransform="uppercase">
                    <Typography textTransform="uppercase">
                      Interurbano
                    </Typography>
                  </TableCell>
                )}

                {edit && <TableCell align="right">Editar</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {stateShowID && (
                      <TableCell align="left">{row.id_registro}</TableCell>
                    )}
                    {stateShowCreatedAt && (
                      <TableCell align="center">{row.createdAt}</TableCell>
                    )}
                    {stateShowUser && (
                      <TableCell align="center">
                        {row.registro_usuario.usuario}
                      </TableCell>
                    )}
                    {stateShowOperacion && (
                      <TableCell align="center">
                        {row.registro_operacion.tipo_operacion}
                      </TableCell>
                    )}
                    {stateShowCompany && (
                      <TableCell align="center">
                        {row.registro_empresa.empresa}
                      </TableCell>
                    )}
                    {stateShowDestiny && (
                      <TableCell component="th" scope="row" align="center">
                        {row.destino}{" "}
                      </TableCell>
                    )}
                    {stateShowArrivalDate && (
                      <TableCell align="left">{row.fecha_ingreso}</TableCell>
                    )}
                    {stateShowArrivalTime && (
                      <TableCell align="center">{row.hora_ingreso}</TableCell>
                    )}
                    {stateShowIntern && (
                      <TableCell align="center">{row.interno}</TableCell>
                    )}
                    {stateShowTypeService && (
                      <TableCell align="center">
                        {row.registro_servicio.siglas}
                      </TableCell>
                    )}
                    {stateShowDepartureDate && (
                      <TableCell align="center"> {row.fecha_salida} </TableCell>
                    )}
                    {stateShowDepartureTime && (
                      <TableCell align="center"> {row.hora_salida} </TableCell>
                    )}
                    {stateShowPlatform && (
                      <TableCell align="center">
                        {row.registro_plataforma.plataforma}
                      </TableCell>
                    )}
                    {stateShowState && (
                      <TableCell align="center">
                        {row.registro_estado.tipo}
                      </TableCell>
                    )}

                    {stateShowInterurbano === true ? (
                      row.interurbano != null ? (
                        <TableCell align="center">
                          {row.interurbano === "L" ? " Llegada" : " Salida"}
                        </TableCell>
                      ) : (
                        <TableCell align="center">-</TableCell>
                      )
                    ) : null}

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
        <Stack ml={5} mt={5} direction="row" justifyContent={"space-between"}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="informes"
            filename={day}
            sheet="ingresos"
            buttonText="Descargar Reporte"
          />
        </Stack>
        <br />
      </TableContainer>
      <Box pr={3} sx={{ float: "right" }}>
        <Counter />
      </Box>
    </Box>
  );
}
