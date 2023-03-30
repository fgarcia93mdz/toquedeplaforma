import { createSlice } from "@reduxjs/toolkit"


// creo el estado inicial y las props
// const estadoInicialSlice = {
//   id: 1,
//   empresa: "cuchuflito",
//   siglas: "cft",
//   img: "img5",
//   destino: "RETIRO",
//   horarioSalida: "23:25",
//   horarioEstimado: "23:25",
//   plataforma: "5",
//   estado: "PARTIO"
// };


// creo el estado inicial y las props
const estadoInicialSlice = {
  nombre: '',
  apellido: '',
  rol: ''
};




export const estadoGlobalSlice = createSlice({

    name: "user",
    initialState: estadoInicialSlice,
    reducers: {

        setId: function(state, action){
            state.id = action.payload
        },

        setEmpresa: function(state, action){
            state.empresa = action.payload
        },

        setSiglas: function(state, action){
            state.siglas = action.payload
        },

        setImg: function(state, action){
            state.img = action.payload
        },

        setPlataforma: function(state, action){

            state.plataforma = action.payload
        }

       

    }
})

// console.log('counterSlice.reducer', counterSlice.reducer.increment)

export const { setHoraEstimado, setHoraEstimada, setDestino, setPlataforma, setEstadoActual, setId, setEmpresa, setSiglas, setImg } = estadoGlobalSlice.actions
export default estadoGlobalSlice.reducer