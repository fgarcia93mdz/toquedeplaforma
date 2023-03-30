import React from 'react'
import FormMarquesineCreate from '../../components/forms/FormMarquesineCreate'
import TableMarquesine from '../../components/table/TableMarquesine'
import {  MarquesineProvider } from './MarquesineContext'


const MarquesineEdit = () => {

    return (
        <MarquesineProvider>
            <FormMarquesineCreate />
            <TableMarquesine />
        </MarquesineProvider>
    )

}

export default MarquesineEdit