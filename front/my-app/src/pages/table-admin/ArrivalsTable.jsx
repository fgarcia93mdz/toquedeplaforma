import React, { useState, useEffect } from 'react';
import TableAdmin from '../../components/table/TableAdmin';
import axios from 'axios'


// LISTADO DE ARRIBOS DE TICKETS
// VISTA DE TORRE DE SEGURIDAD


const ArrivalsTable = ({ info }) => {
    const [ data, setData ] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8080/api/plataforma/arribos')
                .then(response =>  response.json())
                .then(data => {
                    // console.log('data::', data)
                    return setData(data)
                })
                .catch(error => console.log(error))
    }, [])

    return (
        <div >
            <h2>Tablero de Arribos </h2>
            {data.length > 0 && 
                <>
                    <TableAdmin data={data} />
                </>
            }
        </div>
    );
}

export default ArrivalsTable;
