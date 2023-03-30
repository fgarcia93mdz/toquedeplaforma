import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  Stack } from '@mui/system'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import * as yup from 'yup';
import BasicModal from '../modals/Modal';
import { useFormik } from 'formik';



const validationSchema = yup.object({
    motivo: yup.string().required('Campo requerido'),
    id: yup.number().required('Campo requerido'),
  });

const ResetPassword = () => {
    const [ openModal, setOpenModal ] = useState(false)
    const [ users, setUsers ] = useState([])
    const token = window.sessionStorage.getItem('jwt')
    // const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8080/users', { headers: {authorization: `Bearer ${token}` }} )
        .then(data => {
            setUsers(data.data.usuarios)})
        .catch(error => console.log('error users', error))
    }, [token])

    const initialReason = {
        motivo: '', // string
        id: '' // number
    }
    const url = 'http://localhost:8080/users/resetPassword'
    const config =  { headers: { 'authorization': `Bearer ${token}` } }

    const formik = useFormik({
        initialValues: initialReason,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            const data = formik.values

            axios.post(url, data, config)
                .then((res) => {
                    if(res.status === 200){
                        setOpenModal(true)
                    }
                })
                .catch(function (error) {
                    console.log('Error send reset pasword:', error);
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
            Resetear contraseña:
          </Typography>
          <Grid container my={4}>
            <Grid
              item
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              gap={2}
              xs={12}
              md={10}
              my={2}
            >
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
                display={{ xs: "none", sm: "block" }}
              >
                Usuario:
              </Typography>
              <TextField
                select
                label="Seleccione usuario a editar"
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
                  minWidth: "300px",
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                name="id"
                value={formik.values.id}
                onChange={formik.handleChange}
                error={formik.errors.id}
                helperText={formik.errors.id}
              >
                {users?.map((user) => (
                  <MenuItem value={user.id} key={user.nombre} selected={true}>
                    {" "}
                    {user.nombre} {user.apellido}{" "}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              display={{ xs: "block", sm: "flex" }}
              alignItems="top"
              gap={2}
              xs={12}
              my={2}
            >
              <Typography
                variant="subtitle1"
                color="white"
                mb={{ xs: 1, sm: 0 }}
              >
                Motivo:
              </Typography>
              <TextField
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  minWidth: "300px",
                }}
                InputProps={{
                  type: "text",
                }}
                multiline
                rows={4}
                value={formik.values.motivo}
                name="motivo"
                onChange={formik.handleChange}
                error={formik.errors.motivo}
                helperText={formik.errors.motivo}
              />
            </Grid>
            <Grid
              item
              sx={{ marginRight: "auto" }}
              align="center"
              pt={8}
              xs={12}
            >
              <Button variant="contained" ml="auto" type="submit" my={2}>
                Resetear contraseña
              </Button>
            </Grid>
            {openModal && (
              <BasicModal
                title="Exito"
                message="Contraseña reseteada con exito"
                openModal={openModal}
              />
            )}
          </Grid>
        </form>
      </Stack>
    );
}

export default ResetPassword