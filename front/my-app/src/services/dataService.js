import  { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPlataforma } from '../toolkit/reducer'



export const TraerEmpresas = () => {
    const [ estado, setEstado ] = useState({})

    // dispatch is used to update the state
    let dispatch = useDispatch()

    fetch('http://localhost:3000/api/plataforma/locales')
    .then( data => {

        data.json()
    }).then( data => {

        setEstado(data)
    }) 

    if(estado?.length > 0){
        dispatch(setPlataforma(estado))
        // console.log('PLATAFORMA:: ', estado)
    }
}