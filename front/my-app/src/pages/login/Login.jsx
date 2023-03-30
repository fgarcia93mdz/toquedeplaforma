import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

import axios from 'axios'
import { Button, Typography } from '@mui/material';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        setEmail(email)
        setPassword(password)
        // console.log('email:', email)
        // console.log('password:', password)
    }, [email, password])
    

    const handleSubmit = (e) => {
        e.preventDefault()

        if(email === '' || password === ''){
            // alert('Please fill in all fields')
        }

        if(email.length > 0 && password.length > 0){
          
                const url = 'http://localhost:8080/auth/login'
            
                const data = {
                    email: email,
                    password: password
                }
            
                axios.post(url, data)
                .then((res) => {
                    // console.log('response', res)
         
                    if(res.status === 200){
                        const jwt = res.data
                        // escribe el jwt en session
                        window.sessionStorage.setItem("jwt", jwt);
                        // redirecciona a la pagina principal
                        //return navigate("/seguridad/ticket/crear")
                        navigate("/ingreso")
                        window.location.reload();

                    }
                })
                .catch(function (error) {
                    console.log('Error:', error.response.data.mensaje);
                    setError(error.response.data.mensaje)
                });
        }
    }


    return (
        

        <div className="container">
            <div className="login">
                <Typography className='azul bienvenido' variant='h5' fontWeight='bold' sx={{marginBottom:'16px'}}>Bienvenido</Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='item'>
                        <label htmlFor='email' className='azul'>Usuario:</label>
                        <input type="text" name='email' value={email}   onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='item'>
                        <label htmlFor="password" className='azul' >Contraseña:</label> 
                        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    
                    {error && 

                        <Typography variant="caption" color="error"  align='left' style={{color:'red', maxWidth: '90%', margin:'auto', display:'block'}}> * Hay un error en tu usuario o contraseña </Typography>
                        
                    }

                    <Button type='submit'  variant="contained" size="small" sx={{marginBlock: '16px'}}>Iniciar sesión</Button>
                    {/* <div>
                        <a href='/#' className='cambiar-cont'>Si olvidaste tu contraseña </a>
                    </div> */}
                </form>
            </div>
        </div>
        
    );
}

export default Login;
