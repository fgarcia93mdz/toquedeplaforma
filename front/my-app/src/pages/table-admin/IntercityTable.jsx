import React, { useState, useEffect } from 'react';
import TableInterurbanos from '../../components/table/TableInterurbanos';
import axios from 'axios'


// LISTADO DE ARRIBOS DE TICKETS
// VISTA DE TORRE DE SEGURIDAD


const IntercityTable = ({ info }) => {
   const token = sessionStorage.getItem("jwt");
   const [interurbanos, setInterurbanos] = React.useState([]);

   const config = { headers: { authorization: `Bearer ${token}` } };

   const getInterurbano = () => {
     axios
       .get("http://localhost:8080/interurbanos", config)
       .then((data) => {
         return setInterurbanos(data.data.interurbanos);
       })
       .catch((err) => console.log("Error GET interurbanos:", err));
   };
    useEffect(() => {
      getInterurbano();
      setInterval(() => {
        getInterurbano();
      }, 10000);
    }, [token]);

    return (
      <div>
        <h2>Tablero de Interurbanos </h2>
        {data.length > 0 && (
          <>
            <TableInterurbanos data={interurbanos} />
          </>
        )}
      </div>
    );
}

export default IntercityTable;
