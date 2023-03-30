import React, { useState } from 'react'
import axios from 'axios'
import {  Stack } from '@mui/system'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import * as yup from 'yup';
import BasicModal from '../modals/Modal';
import { useFormik } from 'formik';
import { useMarquesineUpdate } from '../../pages/marquesine/MarquesineContext';


const validationSchema = yup.object({
    texto: yup.string().required('Campo requerido'),
  });


 
const FormMarquesineEdit = ({ texto, estado, id }) => {
    const [ openModal, setOpenModal ] = useState(false)
    const updateMarquesine = useMarquesineUpdate()
    // const MARQUESINE = useMarquesine()
    const token = window.sessionStorage.getItem('jwt')



    const formStyle = {
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
    }

    const inputStyle = {
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      ".MuiInputBase-root": {
        color: "white",
      },
      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
    }
  
    const initialReason = {
        texto: texto, // string
        estado: estado // number
    }

    const url = 'http://localhost:8080/marquesinas/' + id
    const config =  { headers: { 'authorization': `Bearer ${token}` } }

    const formik = useFormik({
        initialValues: initialReason,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            const data = formik.values

            axios.patch(url, data, config)
                .then((res) => {
                    if(res.status === 200){
                      setOpenModal(true);
                      updateMarquesine('jojojo');
                    }
                })
                .catch(function (error) {
                    console.log('Error Post Method Marquesine Front:', error);
                });
        },
      });

    return (
      <Stack  sx={{ background: "#0b2748", shadow: 4 }}  my={0}  mx={0} p={4} sm={6} pl={{ xs: 0, sm: 8 }} >
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" color="white" mt={4} sx={{fontSize: { xs: "25px", md: "40px" },}} >
             Marquesina
          </Typography>
          <Grid container my={2}>
            <Grid item alignItems="top" gap={2} xs={12} sm={8} my={0}>
              <Typography variant="subtitle1" color="white" mb={1}>
                Editar mensaje:
              </Typography>
              <TextField
                sx={formStyle}
                InputProps={{
                  type: "text"
                }}
                fullWidth
                multiline
                rows={2}
                value={formik.values.texto}
                name="texto"
                onChange={formik.handleChange}
                error={formik.errors.texto}
                helperText={formik.errors.texto}
                placeholder="Escriba aqui su mensaje..."
              />
            </Grid>
            <Grid xs={12} sm={2} ml={4} >
              <Typography variant="subtitle1" color="white" mb={1}>
                Estado:
              </Typography>
              <TextField
                fullWidth
                select
                // label="Estado"
                sx={inputStyle}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                name="estado"
                value={formik.values.estado}
                onChange={formik.handleChange}
                // error={formik.errors.length > 0}
                // error={formik.errors?.estado}
                // helperText={formik.errors?.estado}
              >
                  <MenuItem
                    value={1}
                    key={1}
                    selected={true}
                  >
                    Activo
                  </MenuItem>
                  <MenuItem
                    value={0}
                    key={0}
                    selected={true}
                  >
                    Inactivo
                  </MenuItem>
                </TextField>
            </Grid>
            <Grid item align="center" pt={8} xs={12} flexDirection="column" >
              <Button sx={{background: 'whitesmoke', color: 'blue'}} variant="contained" type="submit" my={2}>
                  Editar Marquesina
              </Button>
            </Grid>
            {openModal && (
              <BasicModal
                title="Éxito"
                message="Marquesina creada con éxito"
                openModal={openModal}
              />
            )}
          </Grid>
        </form>
      </Stack>
    );
}

export default FormMarquesineEdit