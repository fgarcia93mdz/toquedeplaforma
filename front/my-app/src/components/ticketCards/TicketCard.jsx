import React from 'react'
import { Grid, Typography } from '@mui/material'


const TicketCard = ({ ticket }) => {

    const cardStyle = {
        background: '#1C68C0',
        borderRadius: '25px',
        padding: '20px',
        width:'90%',
        margin: 'auto',
        color: 'white',
        marginBlock: '10px'

    }

    return (
        <Grid container style={cardStyle} display={{ sm: 'none'}}>
            <Grid item xs={8}>
                <Typography variant='caption'>
                    Destino/Origen:
                </Typography>
                <Typography variant='h5' fontWeight='bold'>
                    Retiro
                </Typography>
                <Typography variant='caption'>
                    Empresa:
                </Typography>
                <Typography variant='h5' fontWeight='bold'>
                    Flecha Bus
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='caption'>
                    Plat:
                </Typography>
                <Typography variant='h5' fontWeight='bold'>
                    5
                </Typography>
                <Typography variant='caption'>
                    Interno: 
                </Typography>
                <Typography variant='h5' fontWeight='bold'>
                    5526
                </Typography>
                <Typography variant='caption'>
                    Horario:
                </Typography>
                <Typography variant='h5' fontWeight='bold'>
                    23:25
                </Typography>
            </Grid>
            
 
        </Grid>
    )
}

export default TicketCard