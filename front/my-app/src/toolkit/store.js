import { configureStore } from '@reduxjs/toolkit'
import estadoGlobalSlice from './reducer'

export default configureStore( {

    reducer: {  
        estado: estadoGlobalSlice
    }
}) 





