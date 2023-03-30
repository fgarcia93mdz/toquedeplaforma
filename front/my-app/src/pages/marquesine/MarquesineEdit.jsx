import React from 'react';
import FormMarquesineEdit from '../../components/forms/FormMarquesineEdit';
import TableMarquesine from '../../components/table/TableMarquesine';
import {  MarquesineProvider } from './MarquesineContext';


const MarquesineEdit = () => {

    return (
        <MarquesineProvider>
            <FormMarquesineEdit />
            <TableMarquesine />
        </MarquesineProvider>
    )

};

export default MarquesineEdit