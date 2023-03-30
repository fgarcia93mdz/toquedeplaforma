import React, { useState } from 'react'
import { Button, Divider, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
// import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import BasicModal from '../modals/Modal';
import { Link, useNavigate } from "react-router-dom";



const validationSchema = yup.object({
    // fecha_salida: yup.string().required('Campo requerido'),
    // hora_salida: yup.string().required('Campo requerido'),
    // interno: yup.number().required('Campo requerido'),
    // empresa_id: yup.number().required('Campo requerido'),
    // servicios_id: yup.number().required('Campo requerido'),
    estado_id: yup.string().required('Campo requerido'),
    // destino: yup.string().required('Campo requerido'),
    usuarios_id: yup.string().required('Campo requerido'),
    //plataformas: yup.string().required('Campo requerido')
  });

const FormEditTicketOnPlatform = ({ ticket }) => { 
    const [ openModal, setOpenModal ] = useState(false)
    const [ dataDropdown, setDataDropdown ] = useState({})
    // const navigate = useNavigate()
    const token = sessionStorage.getItem('jwt')


    const initialTicket = {
      fecha_ingreso: "", // '01-01-2022'
      hora_ingreso: "", // '12:00'
      interno: "", // 123
      empresa_id: "", // 2
      servicios_id: "", // 2
      usuarios_id: "", // 2
      plataformas_id: "" || null, // ? 1
      estado_id: "", // '0'
      tipo_tv: "", // '0'
      destino: "", // 'Mar de Ajo'
      hora_salida: "",
      fecha_salida: "",
    };

    console.log('ticket:', ticket)

    const editTicket = {
        fecha_ingreso: ticket.fecha_ingreso, // '01-01-2022'
        hora_ingreso: ticket.hora_ingreso, // '12:00'
        interno: ticket.interno, // 123
        usuarios_id: ticket.usuarios_id, // 2
        plataformas_id: ticket.plataformas_id  || null, // ? 1
        estado_id: ticket.registro_estado.id, // '0'
        destino: ticket.destino, // 'Mar de Ajo'
        tipo_tv: ticket.tipo_tv_id, // 1 o 2
        fecha_salida: ticket.fecha_salida,
        hora_salida: ticket.hora_salida
    }

    
    React.useEffect(() => {
        const url = 'http://localhost:8080/informes/dataDropdown'

        axios.get(url, { headers: {"authorization": `Bearer ${token}` }} )
        .then(response =>  setDataDropdown(response.data))
        .catch(error => console.log('error jwt:', error.response.data.mensaje))

        // console.log('dataDropdown:', dataDropdown)

    }, [token])

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
    };
    
    const formik = useFormik({
        initialValues: editTicket || initialTicket,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const config = { headers: { authorization: `Bearer ${token}`}}
            const url = `http://localhost:8080/informes/modificar/${ticket.id}`
            const data = formik.values

            // console.log('data to send:', data)

            axios.patch(url, data, config)
                .then((res) => {
                    if(res.status === 200){
                        setOpenModal(true)
                    }
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
        },
      });

    return (
      <Stack
        sx={{ background: "#0b2748", borderRadius: "25px", shadow: 4 }}
        my={4}
        mx={{ xs: 1, sm: 6 }}
        p={4}
        sm={6}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" color="white">
            Editar ticket en plataforma:
          </Typography>
          <Grid container my={4}>
            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              md={12}
              my={2}
            >
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Plataforma:
              </Typography>
              <TextField
                select
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "#fff",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                // label="Plataforma asiganada"
                name="plataformas_id"
                value={formik.values.plataformas_id}
                onChange={formik.handleChange}
                error={formik.errors.plataformas_id}
                helperText={formik.errors.plataformas_id}
              >
                {dataDropdown.plataformas?.map((plataforma) => (
                  <MenuItem value={plataforma.id} selected={true}>
                    {plataforma.plataforma}
                  </MenuItem>
                ))}
              </TextField>
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
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Fecha de salida:
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
                  type: "date",
                }}
                name="fecha_salida"
                value={formik.values.fecha_salida}
                onChange={formik.handleChange}
                error={formik.errors.fecha_salida}
                helperText={formik.errors.fecha_salida}
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
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Hora de salida:
              </Typography>
              <TextField
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                InputProps={{
                  type: "time",
                }}
                value={formik.values.hora_salida}
                name="hora_salida"
                onChange={formik.handleChange}
                error={formik.errors.hora_salida}
                helperText={formik.errors.hora_salida}
              />
            </Grid>
            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              sm={6}
              my={2}
            >
              <Typography
                variant="subtitle1"
                color="white"
                display={{ xs: "none", sm: "block" }}
              >
                Estado:
              </Typography>
              <RadioGroup
                row
                aria-labelledby="Estado"

                fullWidth
                name="estado_id"
                sx={inputStyle}
                value={formik.values.estado_id}
                onChange={formik.handleChange}
                error={formik.errors?.estado_id}
                helperText={formik.errors?.estado_id}
              >
                <FormControlLabel value={'1'} control={<Radio />} sx={{color: 'white',}} label="En Plataforma" />
                <FormControlLabel value={'4'} control={<Radio />}  sx={{color: 'white'}} label="Fuera de Plataforma" />
              </RadioGroup>
            </Grid>
            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              sm={6}
              my={2}
            >
              <Typography
                variant="subtitle1"
                color="white"
                display={{ xs: "none", sm: "block" }}
              >
                Tipo de tv:
              </Typography>
              <RadioGroup
                row
                aria-labelledby="Estado"
                fullWidth
                name="tipo_tv"
                sx={inputStyle}
                value={formik.values.tipo_tv}
                onChange={formik.handleChange}
                error={formik.errors.tipo_tv}
                helperText={formik.errors.tipo_tv}
              >
                <FormControlLabel value={'1'} control={<Radio />} sx={{color: 'white',}} label="Arribos" />
                <FormControlLabel value={'2'} control={<Radio />}  sx={{color: 'white'}} label="Partidas" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} py={4}>
              <Divider color="white" />
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
              {/* <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Interno:
              </Typography> */}
              <TextField
                label="Interno"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                }}
                InputProps={{
                  type: "text",
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                value={formik.values.interno}
                name="interno"
                onChange={formik.handleChange}
                error={formik.errors.interno}
                helperText={formik.errors.interno}
              />
            </Grid>
            <Grid
              item
              display={{ xs: "none", md: "none" }}
              alignItems="center"
              gap={2}
              xs={12}
              sm={6}
              my={2}
            >
              <Typography
                variant="subtitle1"
                color="white"
                display={{ xs: "none", sm: "block" }}
              >
                Usuario ID:
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
                InputLabelProps={{
                  style: { color: "#fff" },
                  readOnly: true,
                }}
                label="Inserte usuario ID"
                name="usuarios_id"
                value={formik.values.usuarios_id}
                onChange={formik.handleChange}
                error={formik.errors.usuarios_id}
                helperText={formik.errors.usuarios_id}
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
              {/* <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Fecha de ingreso:
              </Typography> */}
              <TextField
                label="Fecha Ingreso"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                    width: "100%",
                  },
                }}
                InputProps={{
                  type: "date",
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                name="fecha_ingreso"
                value={formik.values.fecha_ingreso}
                onChange={formik.handleChange}
                error={formik.errors.fecha_ingreso}
                helperText={formik.errors.fecha_ingreso}
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
              {/* <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Hora de ingreso:
              </Typography> */}
              <TextField
                label="Hora Ingreso"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    width: "200%",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                }}
                InputProps={{
                  type: "time",
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                value={formik.values.hora_ingreso}
                name="hora_ingreso"
                onChange={formik.handleChange}
                error={formik.errors.hora_ingreso}
                helperText={formik.errors.hora_ingreso}
              />
            </Grid>

            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              md={6}
              my={2}
            >
              {/* <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
                display={{ xs: "none", sm: "block" }}
              >
                Empresa:
              </Typography> */}
              <TextField
                label="Empresa"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  minWidth: "200px",
                }}
                InputProps={{
                  type: "text",
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                name="empresa_id"
                value={ticket.registro_empresa?.empresa}
                onChange={formik.handleChange}
                error={formik.errors.empresa_id}
                helperText={formik.errors.empresa_id}
              >
                {/* <MenuItem value={'default'} disabled >Seleccione una opcion</MenuItem> */}
                {/* <MenuItem value={2}>ISL - Iselin</MenuItem> */}
                {/* <MenuItem value={3}>FLB - Flecha Bus </MenuItem> */}
              </TextField>
            </Grid>
            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              md={6}
              my={2}
            >
              {/* <Typography
                variant="subtitle1"
                color="white"
                display={{ xs: "none", sm: "block" }}
              >
                Tipo de servicio:
              </Typography> */}
              <TextField
                label="Tipo de servicio"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  minWidth: "260px",
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  readOnly: true,
                }}
                name="servicios_id"
                value={ticket.registro_servicio.tipo_servicio}
                onChange={formik.handleChange}
                error={formik.errors.servicios_id}
                helperText={formik.errors.servicios_id}
              >
                {/* <MenuItem value={'default'} disabled >Seleccione una opcion</MenuItem> */}
                {dataDropdown.servicios?.map((servicio) => (
                  <MenuItem value={servicio.id} selected={true}>
                    {servicio.tipo_servicio} - {servicio.siglas}
                  </MenuItem>
                ))}
                {/* <MenuItem value={1} selected={true}>Media distancia</MenuItem>
                            <MenuItem value={2}>Larga distancia</MenuItem>
                            <MenuItem value={3}>Corta distancia </MenuItem> */}
              </TextField>
            </Grid>
            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              md={6}
              my={2}
            >
              {/* <Typography
                variant="subtitle1"
                color="white"
                display={{ xs: "none", sm: "block" }}
              >
                Destino / Origen:
              </Typography> */}
              <TextField
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  readOnly: true,
                }}
                label=" Destino / Origen"
                name="destino"
                value={formik.values.destino}
                onChange={formik.handleChange}
                error={formik.errors.destino}
                helperText={formik.errors.destino}
              />
            </Grid>

            <Grid
              item
              sx={{ marginRight: "auto" }}
              align="center"
              xs={12}
              pt={4}
            >
              <Link to="/informes">
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
              <Button variant="contained" ml="auto" type="submit" my={2}>
                Editar ingreso
              </Button>
            </Grid>
            {openModal && (
              <BasicModal
                title="Éxito"
                message="El registro fue modificado"
                openModal={openModal}
              />
            )}
          </Grid>
        </form>
      </Stack>
    );

}

export default FormEditTicketOnPlatform