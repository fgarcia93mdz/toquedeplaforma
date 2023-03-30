import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import NavBarAdmin from './NavBarAdmin';

// import NavBarPublic from './NavBarPublic'
// import NavBarSecurity from './NavBarSecurity'
// import NavBarRRHH from './NavBarRRHH'
// import NavBarInforms from './NavBarInforms';
// import NavBarSupervisor from './NavBarSupervisor';

const NavBarPublic = React.lazy(() => import('./NavBarPublic'))
const NavBarSecurity = React.lazy(() => import('./NavBarSecurity'))
const NavBarRRHH = React.lazy(() => import('./NavBarRRHH'))
const NavBarInforms = React.lazy(() => import('./NavBarInforms'))
const NavBarSupervisor = React.lazy(() => import('./NavBarSupervisor'))



const NavBarContainer = () => {
    const [ rol, setRol ] = useState(null)
    const [ name, setName ] = useState(null)

    const token = window.sessionStorage.getItem("jwt")
    
    useEffect(() => {
        
        if(token){
            const tokenDecoded = jwt_decode(token);
            setRol(tokenDecoded.rol)
            setName(tokenDecoded.nombre)
            // console.log('token decoded', tokenDecoded)
        } else if (token === null){
            setRol(null)
            setName(null)
        }

        return () => {
            setRol(null)
        }
    }, [token])

    // return isAdminState ? <NavBarAdmin /> : <NavBar />
    return (
        <>
        {(() => {
            switch (rol) {
              // RRHH
              case 1 : 
                return <NavBarAdmin name={name} />
              // RRHH
              case 2 : 
                return <NavBarRRHH name={name} />
              // Supervisor
              case 3 :
                return <NavBarSupervisor name={name}/>
              // Seguridad  
              case 4 :
                return <NavBarSecurity name={name} />
              // Informes
              case 5 :
                return <NavBarInforms name={name} />
              default:
                return <NavBarPublic />
            }
          })()}
        </>
    )
    
}

export default NavBarContainer