import React from 'react'
import { useParams } from 'react-router-dom'
import FormCompany from '../../components/forms/FormCompanyCreate'

const AdminCompaniesCreate = () => {

    const { id } = useParams()
    const getCompanyToEdit = (id) => {
        const url = 'http://localhost:8080/empresas/nueva';
        const token = sessionStorage.getItem('jwt');
        const config = { headers: { authorization: `Bearer ${token}`}};
    }

    return (
        <FormCompany  />
    )
}

export default AdminCompaniesCreate