import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import ArrivalsBoard from "./pages/board-tv/ArrivalsBoard";
import DeparturesBoard from "./pages/board-tv/DeparturesBoard";
import Login from "./pages/login/Login";
import Ingreso from "./pages/login/Ingreso";
import FormTicket from "./pages/securityUser/SecurityCreateTicket";
import FormTicketinformes from "./pages/informsUser/InformsCreateTicket";
import FormEditUser from "./pages/RRHHUser.jsx/FormEditUser";
import FormCreateUser from "./components/profile/FormCreateUser";
import SecurityHome from "./pages/securityUser/SecurityHome";
import InformsHome from "./pages/informsUser/InformsHome";
import Protected from "./components/protected/Protected";
import ListUsers from "./pages/RRHHUser.jsx/ListUsers";
import ListUsersLogs from "./pages/RRHHUser.jsx/ListUsersLogs";
import jwt_decode from "jwt-decode";
import NavBarContainer from "./components/navbar/NavBarContainer";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/not-found/NotFound";
import PageResetPassword from "./pages/RRHHUser.jsx/PageResetPassword";
import WritePassword from "./components/forms/FormChangePassword";
import InformsEditTicket from "./pages/informsUser/InformsEditTicketEntry";
import InformsEditTicketOnPlatform from "./pages/informsUser/InformsEditTicketOnPlatform";
import AdminTable from "./pages/adminUser/AdminTable";
import AdminTableMonth from "./pages/adminUser/AdminTableMonth";
import AdminCompaniesList from "./pages/adminUser/AdminCompaniesList";
import AdminCompaniesCreate from "./pages/adminUser/AdminCompaniesCreate";
import AdminCompaniesEdit from "./pages/adminUser/AdminCompaniesEdit";
import TableMarquesine from "./components/table/TableMarquesine";
import MarquesineCreate from "./pages/marquesine/MarquesineCreate";
import InterurbanosBoard from "./pages/board-tv/InterurbanosBoard";
import FormInterurbanosCreate from "./components/forms/FormInterurbanosCreate";
import TableInterurbano from "./components/table/TableInterurbanos";

const AppWebRouter = () => {
  // aca voy a crear que segun el tipo de usuario que se renderice diferentes navbars
  // navbars adminitrativo/seguridad y navbar de cliente/publico normal
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  //   const [ tokenState, setTokenState ] = useState(null);

  const token = window.sessionStorage.getItem("jwt");
  // console.log('token', token)

  React.useEffect(() => {
    // if (token.length > 0) { setTokenState(token) }
    if (token === undefined || token === null) {
      setIsLoggedIn(false);
    } else if (token !== undefined || token !== null) {
      const tokenDecoded = jwt_decode(token);
      // console.log('tokenDecoded', tokenDecoded)
      setUserRole(tokenDecoded.rol);
      setIsLoggedIn(true);
      setUserId(tokenDecoded.id);
      // if(tokenDecoded.estado_password === 0){
      //    return  window.location.replace('/perfil/password')
      // }

      // console.log('token estado password', tokenDecoded.estado_password)
      // setUserInfo(state => ({ ...state, tokenDecoded: tokenDecoded }));
      // console.log('decoded', userInfo);
      // console.log('decoded', userRole);
    }
  }, [token]);

  return (
    <>
      <NavBarContainer />
      <Routes>
        <Route exact path="/" element={<ArrivalsBoard />} />
        <Route path="/tablero-arribos" element={<ArrivalsBoard />} />
        <Route path="/tablero-partidas" element={<DeparturesBoard />} />
        <Route path="/tablero-interurbanos" element={<InterurbanosBoard />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/ingreso"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Ingreso />
            </Protected>
          }
        />

        <Route
          exact
          path="/marquesina"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <MarquesineCreate />
            </Protected>
          }
        />

        <Route
          exact
          path="/marquesina/tabla"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <TableMarquesine />
            </Protected>
          }
        />

        <Route
          exact
          path="/interurbanos/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormInterurbanosCreate />
            </Protected>
          }
        />

        <Route
          path="/perfil/editar"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormEditUser />
            </Protected>
          }
        />
        <Route
          path="/perfil/password"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <WritePassword />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/registro"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <AdminTable />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/registroMensual"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <AdminTableMonth />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/seguridad"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <SecurityHome />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/ticket/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormTicketinformes id={userId} />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/informes"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InformsHome />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/tablero-arribos"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ArrivalsBoard />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/tablero-partidas"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <DeparturesBoard />
            </Protected>
          }
        />
        <Route
          path="/supervisor/tablero-interurbanos"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InterurbanosBoard />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/informes/editar/ingreso/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InformsEditTicket />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/informes/editar/en-plataforma/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InformsEditTicketOnPlatform />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/usuarios"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ListUsers />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/usuarios/registro"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ListUsersLogs />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/usuarios/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormCreateUser />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/usuarios/resetPass"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <PageResetPassword token={token} />
            </Protected>
          }
        />
        <Route
          exact
          path="/supervisor/usuarios/editar/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormEditUser />
            </Protected>
          }
        />

        <Route
          exact
          path="/seguridad"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <SecurityHome />
            </Protected>
          }
        />
        <Route
          exact
          path="/seguridad/ticket/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormTicket />
            </Protected>
          }
        />
        <Route
          exact
          path="/seguridad/arribos"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ArrivalsBoard />
            </Protected>
          }
        />
        <Route
          exact
          path="/seguridad/partidas"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <DeparturesBoard />
            </Protected>
          }
        />

        <Route
          exact
          path="/informes"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InformsHome />
            </Protected>
          }
        />

        <Route
          exact
          path="/informes/ticket/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormTicketinformes id={userId} />
            </Protected>
          }
        />

        <Route
          exact
          path="/informes/arribos"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ArrivalsBoard />
            </Protected>
          }
        />

        <Route
          exact
          path="/informes/partidas"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <DeparturesBoard />
            </Protected>
          }
        />

        <Route
          exact
          path="/informes/editar/ingreso/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InformsEditTicket />
            </Protected>
          }
        />

        <Route
          exact
          path="/informes/editar/en-plataforma/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <InformsEditTicketOnPlatform />
            </Protected>
          }
        />

        <Route
          exact
          path="/usuarios"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Protected isLoggedIn={isLoggedIn}>
                <ListUsers />
              </Protected>
            </Protected>
          }
        />
        <Route
          exact
          path="/usuarios/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Protected isLoggedIn={isLoggedIn}>
                <FormCreateUser />
              </Protected>
            </Protected>
          }
        />
        <Route
          exact
          path="/usuarios/resetPass"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Protected isLoggedIn={isLoggedIn}>
                <PageResetPassword token={token} />
              </Protected>
            </Protected>
          }
        />
        <Route
          exact
          path="/usuarios/editar/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <FormEditUser />
            </Protected>
          }
        />

        <Route
          exact
          path="/supervisor/empresas"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <AdminCompaniesList />
            </Protected>
          }
        />

        <Route
          path="/supervisor/empresas/crear"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <AdminCompaniesCreate />
            </Protected>
          }
        />

        <Route
          path="/supervisor/empresas/editar/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <AdminCompaniesEdit />
            </Protected>
          }
        />
        <Route
          path="/supervisor/tabla-interurbanos"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <TableInterurbano />
            </Protected>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppWebRouter;
