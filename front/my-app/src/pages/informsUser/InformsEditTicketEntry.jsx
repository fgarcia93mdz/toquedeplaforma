// import FormTicket from '../../components/ticket/FormTicket';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormEditTicketOnPlatform from '../../components/forms/FormEditTicketEntry';
import { CircularProgress } from '@mui/material';

const InformsEditTicket = () => {
    const [ ticket, setTicket ] = useState('') 
    const token = sessionStorage.getItem("jwt");
    const params = useParams();
    const id = params.id

    // console.log('params:', params);

    useEffect(() => {
        const url = `http://localhost:8080/informes/${id}`;
        const config = { headers: { authorization: `Bearer ${token}`}}

        axios.get(url, config)
        .then( data => {
            setTicket(data.data.ingresos)
            // console.log('data get edit ticket:', data)
        })
        .catch( error => console.log('error get edit ticket:', error))

    }, [id, token]);

    return (
        <>
            { ticket === '' ? <CircularProgress /> : <FormEditTicketOnPlatform ticket={ticket} /> }
        </>
    )
}

export default InformsEditTicket