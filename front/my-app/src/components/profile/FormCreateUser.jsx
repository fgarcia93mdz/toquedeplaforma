import React, { useState } from 'react'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import BasicModal from '../modals/Modal';

const user = {
    nombre: "", // '01-01-2022'
    apellido: "", // '12:00'
    rol: "", // 123
    usuario: "", // 2
    password: "1234", // 2
}


const validationSchema = yup.object({
    nombre: yup.string().required('Campo requerido'),
    apellido: yup.string().required('Campo requerido'),
    usuario: yup.string().required('Campo requerido'),
    password: yup.string().required('Campo requerido'),
    rol: yup.number().required('Campo requerido'),
});

const FormCreateUser = () => {
    const [ openModal, setOpenModal ] = useState(false)
    const token = sessionStorage.getItem('jwt')

    
    React.useEffect(() => {
        const url = `http://localhost:8080/users/new`
        axios.get(url, { headers: {"authorization": `Bearer ${token}` }} )
        .then(response =>  console.log('RESPONSE USER DATA:', response.json()))
        .catch(error => console.log('error USER DATA:', error.response.data.mensaje))
    }, [token])

    const formik = useFormik({
        initialValues: user,
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const url = `http://localhost:8080/users/register/`
            const data = formik.values

            axios.post(url, data)
                .then((res) => {
                    if(res.status === 200){
                        setOpenModal(true)
                    }
                })
                .catch(function (error) {
                    console.log('Error Submit:', error.response.data.mensaje);
                    return alert('problem')

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
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontSize: { xs: "25px", md: "40px" },
            }}
          >
            Crear usuario nuevo:
          </Typography>
          <Grid container my={4}>
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
                Nombre:
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
                  type: "text",
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                label="Nombre del usuario"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.errors.nombre}
                helperText={formik.errors.nombre}
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
                Apellido:
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
                  type: "text",
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                label="Apellido del usuario"
                name="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                error={formik.errors.apellido}
                helperText={formik.errors.apellido}
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
                Usuario:
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
                  type: "text",
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                label="Usuario. Ej: fgarcia"
                name="usuario"
                value={formik.values.usuario}
                onChange={formik.handleChange}
                error={formik.errors.usuario}
                helperText={formik.errors.usuario}
              />
            </Grid>
            <Grid item hidden alignItems="center" gap={2} xs={12} sm={6} my={2}>
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Contraseña:
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
                  type: "text",
                }}
                name="password"
                defaultValue="1234"
                value="1234"
                onChange={formik.handleChange}
                error={formik.errors.password}
                helperText={formik.errors.password}
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
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
                display={{ xs: "none", sm: "block" }}
              >
                Rol usuario:
              </Typography>
              <TextField
                select
                label="Seleccione Rol"
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
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                name="rol"
                value={formik.values.rol}
                onChange={formik.handleChange}
                error={formik.errors.rol}
                helperText={formik.errors.rol}
              >
                {/* {dataDropdown.empresas?.map((empresa) =>
                                <MenuItem value={empresa.id}  selected={true}> {empresa.empresa} </MenuItem>
                            )} */}
                {/* <MenuItem value={'default'} disabled >Seleccione una opcion</MenuItem> */}
                <MenuItem key={"Administracion"} value={1}>
                  Administracion
                </MenuItem>
                <MenuItem key={"Recursos Humanos"} value={2}>
                  Recursos Humanos
                </MenuItem>
                <MenuItem key={"Supervisor"} value={3}>
                  Supervisor
                </MenuItem>
                <MenuItem key={"Operador de Seguridad"} value={4}>
                  Operador de Seguridad
                </MenuItem>
                <MenuItem key={"Informes"} value={5}>
                  Informes
                </MenuItem>
              </TextField>
            </Grid>

            {/* <Grid item display={{ xs: 'block', md: 'flex'}}  alignItems='center' gap={2} xs={12} md={6} my={2}>
                        <Typography variant='subtitle1' color='white' display={{xs: 'none', sm: 'block'}}>Plataforma:</Typography>
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-notchedOutline':{
                                    borderColor: 'white'
                                },
                                '.MuiInputBase-root':{
                                    color: 'white'
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            label='Inserte plataforma'
                            name='plataformas_id'
                            value={formik.values.plataformas_id}
                            onChange={formik.handleChange}
                            error={formik.errors.plataformas_id}
                            helperText={formik.errors.plataformas_id}
                        />
                    </Grid> */}

            <Grid
              item
              sx={{ marginRight: "auto" }}
              align={{ xs: "center", sm: "left" }}
              pl={{ xs: "0", sm: "3" }}
              pt={6}
              xs={12}
            >
              <Button variant="contained" ml="auto" type="submit" my={2}>
                Crear usuario
              </Button>
            </Grid>
            {openModal && (
              <BasicModal
                title="Exito"
                message="Usuario editado con exito"
                openModal={openModal}
              />
            )}
          </Grid>
        </form>
      </Stack>
    );

}

export default FormCreateUser