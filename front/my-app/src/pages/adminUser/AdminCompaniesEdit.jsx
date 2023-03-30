import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import FormCompany from '../../components/forms/FormCompanyEdit'

const AdminCompaniesEdit = () => {
    const [ company, setCompany ] = React.useState(null)

    const { id } = useParams()
    const getCompanyToEdit = (id) => {
        const url = 'http://localhost:8080/empresas/' + id
        const token = sessionStorage.getItem('jwt')
        const config = { headers: { authorization: `Bearer ${token}`}}


        axios.get(url, config)
        .then(data => {
            // console.log('data from getCompanyToEdit:', data.data.empresa)
            setCompany(data.data.empresa)
        })
        .catch(err => console.log('error comapny edit page', err))
    }

    React.useEffect(() => {
        getCompanyToEdit(id)
    }, [])

    return (
        <FormCompany company={company} />
    )
}

export default AdminCompaniesEdit