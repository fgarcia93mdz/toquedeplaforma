import React, { useState, useEffect } from 'react';
import TableDepartures from '../../components/table/TableDepartures';
import axios from "axios";

// LISTADO DE PARTIDAS DE TICKETS
// VISTA DE TORRE DE SEGURIDAD


const DeparturesTable = () => {
    const [ data, setData ] = useState({})

    useEffect(() => {
        fetch('http://localhost:8080/api/plataforma/partidas')
                .then(response =>  response.json())
                .then(data => {
                    // console.log('data::', data)
                    return setData(data)
                })
                .catch(error => console.log(error))
    }, [])

    return (
        <div >
            <h2>Tablero de Partidas </h2>
            {data.length > 0 && 
                <>
                    <TableDepartures data={data} />
                </>
            }
        </div>
    );
}

export default DeparturesTable;
