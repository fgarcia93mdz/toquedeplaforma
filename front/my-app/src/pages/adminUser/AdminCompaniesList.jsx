import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import TableAdminCompanies from '../../components/table/TableAdminCompanies'

const AdminCompaniesList = () => {
    const [companies, setCompanies] = React.useState([])
    
    const token = sessionStorage.getItem('jwt')
    const config = { headers: {"authorization": `Bearer ${token}` }}

    const getCompanies = async () => {
        axios.get('http://localhost:8080/empresas/listado', config )
        .then(data => {
            // console.log(data.data.empresas)
            setCompanies(data.data.empresas)
        })
        .catch(error => console.log('error users', error))
    }
    
    React.useEffect(() => {
        getCompanies()
    }, [])

    const style ={
        background: '#0b2748',
        color: 'white',
        minWidth: '100%',
        paddingBlock: '2vh',
        textAlign: 'center'
    }
    

    return (
        <Box px={3} pb={4} py={4} sx={{ background:'#0b2748'}}>
            <Typography variant='h4' style={style}>Listado de Empresas</Typography>
            <TableAdminCompanies data={companies} />
        </Box>
    )
}

export default AdminCompaniesList