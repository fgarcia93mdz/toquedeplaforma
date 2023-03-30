import React, { useState } from 'react'
import axios from 'axios'
import {  Stack } from '@mui/system'
import { Button, Grid, TextField, Typography } from '@mui/material'
import * as yup from 'yup';
import BasicModal from '../modals/Modal';
import { useFormik } from 'formik';


const validationSchema = yup.object({
    texto: yup.string().required('Campo requerido'),
  });


 
const FormMarquesine = ({ texto, estado }) => {
    const [ openModal, setOpenModal ] = useState(false)
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
    
    const setInitialReason = () => {
      return (
        {
          texto: '' // string
        }
      )
    };

    const url = 'http://localhost:8080/marquesinas';
    const config =  { headers: { 'authorization': `Bearer ${token}` } };

    const formik = useFormik({
        initialValues: setInitialReason(),
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            const data = formik.values

            axios.post(url, data, config)
                .then((res) => {
                    if(res.status === 200){
                      setOpenModal(true);
                      formik.resetForm({values: setInitialReason()})
                    }
                })
                .catch(function (error) {
                    console.log('Error Post Method Marquesine Front:', error);
                });
        },
      });

    return (
      <Stack  sx={{ background: "#0b2748", shadow: 4 }}  my={0}  mx={0} p={4} sm={6} pl={{ xs: 0, sm: 12 }} >
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" color="white" sx={{fontSize: { xs: "25px", md: "40px" },}} >
             Marquesina
          </Typography>
          <Grid container my={2}>
            <Grid item alignItems="top" gap={2} xs={12} sm={8} my={0}>
              <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
                Crear nuevo mensaje:
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
            <Grid item align="center" pt={8} xs={12} sm={4} flexDirection="column" >
              <Button variant="contained" ml="auto" type="submit" my={2}>
                Crear Marquesina
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

export default FormMarquesine