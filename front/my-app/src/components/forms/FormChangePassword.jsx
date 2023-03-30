import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  Stack } from '@mui/system'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import * as yup from 'yup';
import BasicModal from '../modals/Modal';
import { useFormik } from 'formik';
import jwt_decode from "jwt-decode";



const validationSchema = yup.object({
    password: yup.string().required('Campo requerido'),
    nuevaClave: yup.string().required('Campo requerido'),
    nuevaClaveConfirmation: yup.string()
     .oneOf([yup.ref('nuevaClave'), null], 'Las contraseñas tienen que ser iguales')
  });

const WritePassword = () => {
    const [ openModal, setOpenModal ] = useState(false)
    const token = window.sessionStorage.getItem('jwt')

    // const tokenDecoded = jwt_decode(token);
    // const id = tokenDecoded.id


    const initialValues = {
        password: '', // string
        nuevaClave: ''
        // passwordConfirmation: '' // number
    }
    const url = `http://localhost:8080/users/changePassword`
    const config =  { headers: { 'authorization': `Bearer ${token}` } }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            const data = formik.values

           // console.log('data:', data)

            const dataPassword = {
                password: data.password,
                nuevaClave: data.nuevaClave
            }

            // console.log('data to send:', dataPassword)

            axios.post(url, dataPassword, config)
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
        <Stack sx={{background: '#0b2748', borderRadius: '25px', shadow:4}} my={4} mx={{xs: 1, sm: 6}} p={4} sm={6}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" color='white' >Cambiar contraseña:</Typography>
                <Grid container my={4} sx={{textAlign: 'center', alignItems: 'center'}}>
                   
                <Grid item display={{ xs: 'block', md: 'flex'}} alignItems='center' gap={2} xs={12} md={8} my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm:0}} display={{xs: 'none', sm: 'block'}}>Contraseña antigua:</Typography>
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-notchedOutline':{
                                    borderColor: 'white'
                                },
                                '.MuiInputBase-root':{
                                    color: 'white'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                                minWidth:'200px'
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password}
                            helperText={formik.errors.password}
                        >
                            
                        </TextField>
                    </Grid>
                    <Grid item display={{ xs: 'block', md: 'flex'}} alignItems='center' gap={2} xs={12} md={8} my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm:0}} display={{xs: 'none', sm: 'block'}}>Nueva Contraseña:</Typography>
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-notchedOutline':{
                                    borderColor: 'white'
                                },
                                '.MuiInputBase-root':{
                                    color: 'white'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                                minWidth:'200px'
                            }}
                            InputLabelProps={{
                                style: { color: '#fff' },
                            }}
                            type='nuevaClave'
                            name='nuevaClave'
                            value={formik.values.nuevaClave}
                            onChange={formik.handleChange}
                            error={formik.errors.nuevaClave}
                            helperText={formik.errors.nuevaClave}
                        >
                            
                        </TextField>
                    </Grid>
                    <Grid item display={{ xs: 'block', sm: 'flex'}} alignItems='left' gap={2} xs={12}  my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm:0}}>Confirmar contraseña:</Typography>
                        <TextField 
                            sx={{
                                '.MuiOutlinedInput-notchedOutline':{
                                    borderColor: 'white'
                                },
                                '.MuiInputBase-root':{
                                    color: 'white'
                                }
                            }}
                            InputProps={{
                                type: "password"
                            }} 
                            value={formik.values.nuevaClaveConfirmation}
                            name='nuevaClaveConfirmation'
                            onChange={formik.handleChange}
                            error={formik.errors.nuevaClaveConfirmation}
                            helperText={formik.errors.nuevaClaveConfirmation}
                        />
                    </Grid>
                    <Grid item  xs={12} pt={6}>
                        <Button  variant="contained" type="submit" my={2}>Cambiar contraseña</Button>
                    </Grid>
                    {openModal && 
                        <BasicModal title='Éxito' message='Contraseña reseteada con éxito' openModal={openModal}  />
                    }
                </Grid>
            </form>
        </Stack>
    )
}

export default WritePassword