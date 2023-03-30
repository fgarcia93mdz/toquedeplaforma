import React, { useState } from "react";
import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
// import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import BasicModal from "../../components/modals/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";

// SUPERVISOR CREAR TICKET - SEGURIDAD CREAR TICKET

const FormTicket = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataDropdown, setDataDropdown] = useState({});
  const [ valueEmpresa, setValueEmpresa ] = useState(null)
  const [ valueInterurbano, setValueInterurbano ] = useState(null);
  
  const token = sessionStorage.getItem("jwt");
  const config = { headers: { authorization: `Bearer ${token}` } };

  // Fecha actual
  const dateNow = new Date(); // Creating a new date object with the current date and time
  const menosUno = 1;
  dateNow.setHours(menosUno);
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
  ? `0${dateNow.getUTCDate()}`
  : dateNow.getUTCDate();
  
  
  const getHour = () => {
    const dateNow = new Date();
    let hours = dateNow.getHours();

    if(hours < 10){
      hours = 0 + `${hours}`
      return hours
    } else {
      hours = `${hours}`
      return hours
    } 
  }

  const getMinutes = () => {
    const dateNow = new Date();
    let minutes = dateNow.getMinutes();

    if(minutes < 10){
      minutes = 0 + `${minutes}`
      return minutes
    } else {
      minutes = `${minutes}`
      return minutes
    }
  }

  const [ hoursState, setHoursState ] = useState(getHour());
  const [ minutesState, setMinutesState ] = useState(getMinutes());

  // HORA ACTUAL
  const setTime = () => {
    setHoursState(getHour());
    setMinutesState(getMinutes());
  }
 
  const functionCloseModal = () => {
    return setOpenModal(false);
  }

  const functionOpenModal = () => {
    setTimeout(
      () => functionCloseModal(), 
      5000
    );
    return setOpenModal(true);
  }

   
  const finalFunction = () => {
      setTime();
      resetForm();
  }

  const getInitialTicket = () => {
    return {
      fecha_ingreso: `${year}-${month}-${date}`, // '01-01-2022'
      hora_ingreso: `${getHour()}:${getMinutes()}`, // '12:00'
      interno: "", // 123
      empresa_id: valueEmpresa, // 2
      servicios_id: "3", // 2 
      estado_id: "2", // '0'
      destino: "", // 'Mar de Ajo'
      tipo_tv_id: 3,
      interurbano: ""
    }
  };

  const resetForm = () => {
    setValueEmpresa(null);
    setValueInterurbano(null);
    setTime();
    formik.resetForm({
      values: getInitialTicket()
    });
    functionOpenModal()
  }

  function handleClick(event) {
    if (event.target.value === valueInterurbano) {
      setValueInterurbano("");
    } else {
      setValueInterurbano(event.target.value);
    }
  }

 

  const validationSchema = yup.object({
    fecha_ingreso: yup.string().required("Campo requerido"),
    hora_ingreso: yup.string().required("Campo requerido"),
    interno: yup.number().required("Campo requerido"),
    empresa_id: yup.number().required("Campo requerido"),
    servicios_id: yup.number().required("Campo requerido"),
    estado_id: yup.string().required("Campo requerido"),
    destino: yup.string().required("Campo requerido"),
  });

  React.useEffect(() => {
    const url = "http://localhost:8080/informes/dataDropdown";
    axios
      .get(url, config)
      .then((response) => setDataDropdown(response.data))
      .catch((error) => console.log("error jwt:", error.response.data.mensaje));
  }, [token]);

  const formik = useFormik({
    validateOnChange: true,
    initialValues: getInitialTicket(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const url = "http://localhost:8080/informes/nuevo";
      const data = formik.values;
      // console.log("data form create ticket", data);
      
      axios.post(url, data, config)
        .then((res) => {
          if (res.status === 200) {
            functionOpenModal();
            setValueEmpresa(null);
            setValueInterurbano(null);
            setTime();
            formik.resetForm({
              values: getInitialTicket()
            });
          }
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
    },
  });

  const inputStyle = {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
      transition: '250ms all ease'
    },
    ".MuiInputBase-root": {
      color: "white",
      transition:'250ms all ease'
    },
    ".MuiSvgIcon-root": {
      color: "white",
    },
    ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      color: "white",
    },
    "input:hover": {
      background:'transparent',
      // color: "#29507e",
    },
    ".MuiInputBase-root:hover ":{
      // backgroundColor: "rgb(255, 255, 255)",
      // color: "#29507e",
      boxShadow:' inset 0 0 9px rgb(63, 100, 143)'
    },
    ".MuiInputBase-root:hover .MuiSvgIcon-root":{
      color: "rgb(19, 46, 77)",
      border:'none'

    },
    ".css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
      border:'none'
    },
    ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
      borderColor:'white'
    }
  }



  return (
    <Stack
      sx={{ background: "#0b2748", borderRadius: "25px", shadow: 4 }}
      my={4}
      mx={{ xs: 1, sm: 6 }}
      p={4}
      sm={6}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h4"
          color="white"
          sx={{
            fontSize: { xs: "25px", md: "40px" },
          }}
        >
          Crear nuevo Registro:
        </Typography>
        <Grid container my={4}>
          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            sm={12}
            md={6}
            my={2}
          >
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Interno:
            </Typography>
            <TextField
              sx={inputStyle}
              InputProps={{
                type: "text",
              }}
              value={formik.values.interno}
              name="interno"
              onChange={formik.handleChange}
              error={formik.errors.interno}
              helperText={formik.errors.interno ? "Campo requerido" : null}
            />
          </Grid>
          <Grid item xs={12} md={6} mt={2}>
            <FormLabel
              sx={{ color: "white" }}
              id="demo-radio-buttons-group-label"
            >
              Interurbano:
            </FormLabel>
            <RadioGroup
              aria-labelledby="interurbano-radio"
              defaultValue={null}
              name="interurbano"
              value={valueInterurbano}
              onChange={formik.handleChange}
              row
              sx={{
                color: "#fffffffd",
                ".css-vqmohf-MuiButtonBase-root-MuiRadio-root": {
                  color: "#fffffffd",
                },
              }}
            >
              <FormControlLabel
                value="L"
                control={<Radio onClick={handleClick} />}
                label="Llegada"
              />
              <FormControlLabel
                value="S"
                control={<Radio onClick={handleClick} />}
                label="Salida"
              />
            </RadioGroup>
          </Grid>
          <Grid
            item
            display={{ xs: "none", sm: "none" }}
            alignItems="center"
            gap={2}
            xs={6}
            sm={6}
            my={2}
          >
            <Typography
              variant="subtitle1"
              color="white"
              mb={{ xs: 1, sm: 0 }}
              display={{ xs: "none", sm: "block" }}
            >
              Tipo tv id:
            </Typography>
            <TextField
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiInputBase-root": {
                  color: "white",
                },
              }}
              InputProps={{
                type: "number",
              }}
              defaultValue={3}
              name="tipo_tv_id"
            />
          </Grid>

          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            sm={6}
            my={2}
          >
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Fecha de ingreso:
            </Typography>
            <TextField
              sx={inputStyle}
              InputProps={{
                type: "date",
              }}
              name="fecha_ingreso"
              value={formik.values.fecha_ingreso}
              onChange={formik.handleChange}
              error={formik.errors.fecha_ingreso}
              helperText={formik.errors?.fecha_ingreso}
            />
          </Grid>
          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            sm={6}
            my={2}
          >
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Hora de ingreso:
            </Typography>
            <TextField
              sx={inputStyle}
              InputProps={{
                type: "time",
                style: {
                  color: 'white',
                  fill: 'white',
                  
                }
              }}
              value={formik.values.hora_ingreso}
              name="hora_ingreso"
              onChange={formik.handleChange}
              error={formik.errors?.hora_ingreso}
              helperText={formik.errors?.hora_ingreso}
            />
          </Grid>

          <Grid
            item
            // display={{ xs: "block", md: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            sm={6}
            my={2}
            pr={{ xs: 0, md: 8 }}
          >
            <Typography
              variant="subtitle1"
              color="white"
              mb={{ xs: 1, sm: 0 }}
              // display={{ xs: "none", sm: "block" }}
              style={{ marginBottom: "3px" }}
            >
              Empresa:
            </Typography>

            {dataDropdown.empresas && (
              <Autocomplete
                fullWidth
                clearOnEscape
                value={valueEmpresa}
                options={dataDropdown.empresas}
                sx={inputStyle}
                onChange={(event, newValue) => {
                  setValueEmpresa(newValue);
                  formik.setFieldValue("empresa_id", newValue.id);
                }}
                getOptionLabel={(option) => option.empresa}
                renderInput={(params) => (
                  <TextField
                    error={formik.errors.empresa_id}
                    {...params}
                    label="Busque una empresa"
                    style={{
                      color: "#f5f5f0",
                    }}
                    sx={{
                      ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "#f5f5f0",
                      },
                    }}
                  />
                )}
              />
            )}
          </Grid>
          <Grid
            item
            // display={{ xs: "block", md: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            md={6}
            my={2}
            pr={{ xs: 0, md: 2 }}
          >
            
             <FormControl >
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "3px" }}
                  color="white"
                >
                  Tipo de Servicio:
                </Typography>
              <RadioGroup
                row
                aria-labelledby="Estado"
                // defaultValue={'1'}
                sx={inputStyle}
                fullWidth
                name="servicios_id"
                value={formik.values.servicios_id}
                onChange={formik.handleChange}
                error={formik.errors?.servicios_id}
                helperText={formik.errors?.servicios_id}
              >
                <FormControlLabel value={'2'} control={<Radio />} sx={{color: 'white'}} label="Larga Distancia" />
                <FormControlLabel value={'3'} control={<Radio />}  sx={{color: 'white'}} label="Corta Distancia" />
                <FormControlLabel value={'4'} control={<Radio />}  sx={{color: 'white'}} label="Servicio Externo" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            alignItems="center"
            gap={2}
            xs={12}
            pr={{ xs: 0, md: 8 }}
            sm={6}
            my={2}
          >
           
            <FormControl >
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "3px" }}
                  color="white"
                >
                  Estado:
                </Typography>
              <RadioGroup
                row
                aria-labelledby="Estado"
                // defaultValue={'1'}
                sx={inputStyle}
                fullWidth
                name="estado_id"
                value={formik.values.estado_id}
                onChange={formik.handleChange}
                error={formik.errors?.estado_id}
                helperText={formik.errors?.estado_id}
              >
                <FormControlLabel value={'2'} control={<Radio />} sx={{color: 'white',}} label="Ingresando" />
                <FormControlLabel value={'3'} control={<Radio />}  sx={{color: 'white'}} label="Sin Platarfoma" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            // display={{ xs: "block", md: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            md={6}
            pr={{ xs: 0, md: 2 }}
            my={2}
          >
            <Typography
              variant="subtitle1"
              color="white"
              style={{ marginBottom: "3px" }}
            >
              Destino / Origen / Servicio:
            </Typography>
            <TextField
              fullWidth
              sx={inputStyle}
              InputLabelProps={{
                style: { color: "#fff" },
                texttransform: "uppercase",
              }}
              label="Inserte destino / origen / servicio"
              name="destino"
              value={formik.values.destino}
              onChange={formik.handleChange}
              // error={formik.errors.length > 0}
              error={formik.errors?.destino}
              helperText={formik.errors?.destino}
            />
          </Grid>

          <Grid item xs={12} align="center" pt={{ xs: 4, sm: 6 }}>
            <Link to="/seguridad">
              <Button
                variant="outlined"
                py={2}
                my={4}
                mx={4}
                sx={{ color: "red", margin: "16px" }}
              >
                Volver
              </Button>
            </Link>
            <Button
              variant="outlined"
              onClick={resetForm}
              type={"reset"}
              py={2}
              my={4}
              mx={4}
              sx={{ color: "white", margin: "16px" }}
            >
              Limpiar registro
            </Button>
            <Button variant="contained" type="submit" py={2} my={4} mx={4}>
              Crear registro
            </Button>
          </Grid>
          {openModal && (
            <BasicModal
              title=<CheckCircleOutlineIcon
                sx={{ fontSize: "50px", marginLeft: "-25px" }}
              />
              message="Registro creado con éxito"
              openModal={openModal}
              redirectTo={"/seguridad/ticket/crear"}
            />
          )}
        </Grid>
      </form>
    </Stack>
  );
};

export default FormTicket;
