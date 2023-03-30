import React, { useState, useEffect } from 'react'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import {  useParams } from 'react-router-dom';
// useNavigate
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import BasicModal from '../../components/modals/Modal';




const validationSchema = yup.object({
    nombre: yup.string().required('Campo requerido'),
    apellido: yup.string().required('Campo requerido'),
    rol: yup.number().required('Campo requerido'),
    usuario: yup.string().required('Campo requerido'),
    password: yup.string().required('Campo requerido'),
});

const FormEditUser = () => {
    const [ openModal, setOpenModal ] = useState(false)
    const [ roles, setRoles ] = useState([])
    const [ user, setUser ] = useState({})
    // const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const token = sessionStorage.getItem('jwt')

    const [ formValues, setFormValues ] = useState(null)

    const userInitial = {
        nombre: "", // '01-01-2022'
        apellido: "", // '12:00'
        rol: "", // 123
        usuario: "", // 2
        password: "", // 2
        estado_password: "", // 2
    }
    
    useEffect(() => {
        const url = `http://localhost:8080/users/getUser/${id}`

        axios.get(url, { headers: {"authorization": `Bearer ${token}` }} )
        .then(response =>  {
            return response
        })
        .then( data => {
            // console.log('data', data)
            setRoles(data.data.rolesDisponibles)
            setUser(data.data.usuarioAEnviar)
            setFormValues(data.data.usuarioAEnviar)
            // console.log('DATA', data)
            // console.log('USER', user)
            // console.log('ROLES', roles)
            // console.log('formvalues:', formValues)
        
        })
        .catch(error => console.log('error USER DATA:', error))
    }, [id, token])

    const formik = useFormik({
        initialValues: formValues || userInitial,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {

            const url = `http://localhost:8080/users/modifyUser/${id}`
            const data = formik.values
            const headers = { headers: {"authorization": `Bearer ${token}` }}

            axios.patch(url, data, headers)
                .then((res) => {
                    if(res.status === 200){
                        return setOpenModal(true)
                        // navigate("/")
                        // return alert('ok')
                    }
                })
                .catch((error) => {
                    throw new Error('Error edicion usuario', error)
                });
        },
      });


    return (
        <Stack sx={{background: '#0b2748', borderRadius: '25px', shadow:4}} my={4} mx={{xs: 1, sm: 6}} p={4} sm={6}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" color='white'>Editar usuario:</Typography>
                <Grid container my={4}>
                    <Grid item display={{ xs: 'block', sm: 'flex'}} alignItems='center' gap={2} xs={12} sm={6}  my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm:0}}>Nombre:</Typography>
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
                                type: "text"
                            }}
                            value={formik.values.nombre}
                            name='nombre'
                            onChange={formik.handleChange}
                            error={formik.errors.nombre}
                            helperText={formik.errors.nombre}
                        />
                    </Grid>
                    <Grid item display={{ xs: 'block', md: 'flex'}}  alignItems='center' gap={2} xs={12} sm={6} my={2}>
                        <Typography variant='subtitle1' color='white' display={{xs: 'none', sm: 'block'}}>Apellido:</Typography>
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
                            label='Apellido'
                            name='apellido'
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            error={formik.errors.apellido}
                            helperText={formik.errors.apellido}
                        />
                    </Grid>

                    <Grid item  display={{ xs: 'block', sm: 'flex'}}  alignItems='center' gap={2} xs={12} sm={6} my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm: 0}}>Usuario:</Typography>
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
                                type: "text",
                            }}
                            name='usuario'
                            value={formik.values.usuario}
                            onChange={formik.handleChange}
                            error={formik.errors.usuario}
                            helperText={formik.errors.usuario}
                        />
                    </Grid>

                    <Grid item  display={{ xs: 'block', sm: 'flex'}}  alignItems='center' gap={2} xs={12} sm={6} my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm: 0}}>Password:</Typography>
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
                                type: "text",
                            }}
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password}
                            helperText={formik.errors.password}
                        />
                    </Grid>
                    
                    <Grid item display={{ xs: 'block', md: 'flex'}} alignItems='center' gap={2} xs={12} md={6} my={2}>
                        <Typography variant='subtitle1' color='white' mb={{xs: 1, sm:0}} display={{xs: 'none', sm: 'block'}}>Rol usuario:</Typography>
                        <TextField
                            select
                            label='Seleccione Rol'
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
                            name='rol'
                            value={formik.values.rol}
                            onChange={formik.handleChange}
                            error={formik.errors.rol}
                            helperText={formik.errors.rol}
                        >
                            {roles?.map((rol) =>
                                <MenuItem key={rol.rol} value={rol.id}  selected={true}> {rol.rol} </MenuItem>
                            )}
                            {/* <MenuItem value={'default'} disabled >Seleccione una opcion</MenuItem> */}
                            {/* <MenuItem value={1}>Administracion</MenuItem>
                            <MenuItem value={2}>Recursos Humanos</MenuItem>
                            <MenuItem value={3}>Supervisor</MenuItem>
                            <MenuItem value={4}>Operador de Seguridad</MenuItem>
                            <MenuItem value={5}>Informes</MenuItem> */}
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

                    <Grid item sx={{marginRight: 'auto'}} xs={12}>
                        <Button  variant="contained" ml='auto' type="submit" my={2}>Editar usuario</Button>
                    </Grid>
                    {openModal &&
                        <BasicModal title='Exito' message='Usuario editado con exito' openModal={openModal}  />
                    }
                </Grid>
            </form>
        </Stack>
    )

}

export default FormEditUser