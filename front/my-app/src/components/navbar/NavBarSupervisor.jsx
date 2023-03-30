import React from "react";
import "./NavBar.styles.css";
// import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";

// menu navbar

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

// Fin menu

// inicio
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Tooltip } from "@mui/material";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import FormInterurbanosCreate from "../forms/FormInterurbanosCreate";

// CSS DE MENU DESPLEGABLE
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));
// FIN CSS

const NavBarSupervisor = ({ name }) => {
  //INICIO DE FUNCIONES DEL MENU
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  // FIN FUNCIONES DEL MENU

  //INICIO DE FUNCIONES DEL MENU 2
  const [open2, setOpen2] = React.useState(false);
  const anchorRef2 = React.useRef(null);

  const handleToggle2 = () => {
    setOpen2((prevOpen2) => !prevOpen2);
  };

  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpen2(false);
  };

  function handleListKeyDown2(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen2(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen2 = React.useRef(open2);
  React.useEffect(() => {
    if (prevOpen2.current === true && open2 === false) {
      anchorRef2.current.focus();
    }

    prevOpen2.current = open2;
  }, [open2]);
  // FIN FUNCIONES DEL MENU 2

  //INICIO DE FUNCIONES DEL MENU 3
  const [open3, setOpen3] = React.useState(false);
  const anchorRef3 = React.useRef(null);

  const handleToggle3 = () => {
    setOpen3((prevOpen3) => !prevOpen3);
  };

  const handleClose3 = (event) => {
    if (anchorRef3.current && anchorRef3.current.contains(event.target)) {
      return;
    }

    setOpen3(false);
  };

  function handleListKeyDown3(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen3(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen3 = React.useRef(open3);
  React.useEffect(() => {
    if (prevOpen3.current === true && open3 === false) {
      anchorRef3.current.focus();
    }

    prevOpen3.current = open3;
  }, [open3]);
  // FIN FUNCIONES DEL MENU 3

  //INICIO DE FUNCIONES DEL MENU 4
  const [open4, setOpen4] = React.useState(false);
  const anchorRef4 = React.useRef(null);

  const handleToggle4 = () => {
    setOpen4((prevOpen4) => !prevOpen4);
  };

  const handleClose4 = (event) => {
    if (anchorRef4.current && anchorRef4.current.contains(event.target)) {
      return;
    }

    setOpen4(false);
  };

  function handleListKeyDown4(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen4(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen4 = React.useRef(open4);
  React.useEffect(() => {
    if (prevOpen4.current === true && open4 === false) {
      anchorRef4.current.focus();
    }

    prevOpen4.current = open4;
  }, [open4]);
  // FIN FUNCIONES DEL MENU 4

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState({});
  // const [ userName, setUserName ] = React.useState('')

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const token = window.sessionStorage.getItem("jwt");

  const closeSession = () => {
    handleCloseUserMenu();
    setUserInfo({});
    axios
      .get("http://localhost:8080/auth/logout", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => res.json())
      .catch((err) => console.log("Error en logout:", err));
    window.sessionStorage.removeItem("jwt");
    navigate("/login");
    window.location.reload();
  };

  React.useEffect(() => {
    if (token) {
      const tokenDecoded = jwt_decode(token);
      // console.log("tokenDecoded", tokenDecoded);
      setUserInfo(tokenDecoded);
      setUserInfo((state) => ({ ...state, tokenDecoded }));
      // console.log('decoded', userInfo);
      // console.log('decoded', userNombre);
    } else if (token === null) {
      return null;
    }

    return () => {
      setUserInfo({});
    };
  }, [token]);

  return (
    <>
      <AppBar
        position="sticky"
        style={{ background: "white", color: "#0E315A" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "column",
                }}
              >
                <Link to="/marquesina">
                  <MenuItem key={"/marquesina"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Marquesina</Typography>
                  </MenuItem>
                </Link>
                <Link to="/marquesina/tabla">
                  <MenuItem
                    key={"/marquesina/tabla"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Marquesina Tabla</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/registro">
                  <MenuItem
                    key={"/supervisor/registro"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">
                      Registro Administrativo Log
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/registroMensual">
                  <MenuItem
                    key={"/supervisor/registroMensual"}
                    onClick={handleCloseNavMenu}
                  >
                    Registro Mensual
                  </MenuItem>
                </Link>
                <Link to="/supervisor/seguridad">
                  <MenuItem
                    key={"/supervisor/seguridad"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Torre</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/informes">
                  <MenuItem key={"/informes"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Informes</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/ticket/crear">
                  <MenuItem
                    key={"/supervisor/ticket/crear"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Crear Ingreso</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/usuarios">
                  <MenuItem key={"usuarios"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Usuarios</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/usuarios/registro">
                  <MenuItem key={"usuarios"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      Registro de usuarios
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/usuarios/crear">
                  <MenuItem key={"crearUsuario"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Crear Usuario</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/usuarios/resetPass">
                  <MenuItem
                    key={"resetearContraseña"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">
                      Resetear Contraseñas
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/empresas">
                  <MenuItem key={"/empresas"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Empresas</Typography>
                  </MenuItem>
                </Link>
                <Link to="/">
                  <MenuItem key={"/empresas"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Crear Empresas</Typography>
                  </MenuItem>
                </Link>
                <Link to="/">
                  <MenuItem key={"/empresas"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      Listado interurbanos
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/empresas">
                  <MenuItem key={"/empresas"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      Crear interurbano
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/tablero-arribos">
                  <MenuItem
                    key={"/supervisor/tablero-arribos"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Arribos</Typography>
                  </MenuItem>
                </Link>
                <Link to="/supervisor/tablero-partidas">
                  <MenuItem
                    key={"/supervisor/tablero-partidas"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Partidas</Typography>
                  </MenuItem>
                </Link>
                <Link to="/">
                  <MenuItem
                    key={"/supervisor/tablero-partidas"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Interurbanos</Typography>
                  </MenuItem>
                </Link>
              </Menu>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "start",
                alignItems: "flex-end",
              }}
            >
              <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                sx={{
                  my: 2,
                  color: "#0E315A",
                  display: "block",
                  marginRight: "20px",
                  marginLeft: "10px",
                  fontSize: "18px",
                }}
              >
                SEGURIDAD - INFORMES
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <Link to="/supervisor/registro">
                            <MenuItem
                              onClick={handleClose}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              REGISTRO ADMINISTRATIVO LOGS
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/registroMensual">
                            <MenuItem
                              onClick={handleClose}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              REGISTRO MENSUAL
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/seguridad">
                            <MenuItem
                              onClick={handleClose}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              REGISTROS DE INGRESOS DE TORRE
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/informes">
                            <MenuItem
                              onClick={handleClose}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              REGISTROS DE INGRESOS DE INFORMES
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/ticket/crear">
                            <MenuItem
                              onClick={handleClose}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              CREAR INGRESO
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Link to="/marquesina">
                <Button
                  key={"marquesina"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#0E315A",
                    display: "block",
                    marginRight: "20px",
                    marginLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  Marquesina
                </Button>
              </Link>
              <Button
                ref={anchorRef2}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle2}
                sx={{
                  my: 2,
                  color: "#0E315A",
                  display: "block",
                  marginRight: "20px",
                  marginLeft: "10px",
                  fontSize: "18px",
                }}
              >
                RECURSOS HUMANOS
              </Button>
              <Popper
                open={open2}
                anchorEl={anchorRef2.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose2}>
                        <MenuList
                          autoFocusItem={open2}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown2}
                        >
                          <Link to="/supervisor/usuarios">
                            <MenuItem
                              onClick={handleClose2}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              USUARIOS REGISTRADOS Y ROLES
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/usuarios/registro">
                            <MenuItem
                              onClick={handleClose2}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              HISTORIAL DE INGRESOS DE USUARIOS
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/usuarios/crear">
                            <MenuItem
                              onClick={handleClose2}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              CREAR USUARIO
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/usuarios/resetPass">
                            <MenuItem
                              onClick={handleClose2}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              RESETEAR CONTRASEÑA
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

              <Button
                ref={anchorRef3}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle3}
                sx={{
                  my: 2,
                  color: "#0E315A",
                  display: "block",
                  marginRight: "20px",
                  marginLeft: "10px",
                  fontSize: "18px",
                }}
              >
                ADMINISTRACIÓN
              </Button>
              <Popper
                open={open3}
                anchorEl={anchorRef3.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose3}>
                        <MenuList
                          autoFocusItem={open3}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown3}
                        >
                          <Link to="/supervisor/empresas">
                            <MenuItem
                              onClick={handleClose3}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              LISTADO DE EMPRESAS
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/empresas/crear">
                            <MenuItem
                              onClick={handleClose3}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              CREAR EMPRESA
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/tabla-interurbanos">
                            <MenuItem
                              onClick={handleClose3}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              INTERURBANOS LISTADO
                            </MenuItem>
                          </Link>
                          <Link to="/interurbanos/crear">
                            <MenuItem
                              onClick={handleClose3}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              CREAR INTERURBANO
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Button
                ref={anchorRef4}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle4}
                sx={{
                  my: 2,
                  color: "#0E315A",
                  display: "block",
                  marginRight: "20px",
                  marginLeft: "10px",
                  fontSize: "18px",
                }}
              >
                TV's
              </Button>
              <Popper
                open={open4}
                anchorEl={anchorRef4.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose4}>
                        <MenuList
                          autoFocusItem={open4}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown4}
                        >
                          <MenuItem
                            onClick={handleClose4}
                            sx={{
                              my: 2,
                              color: "#0E315A",
                              display: "block",
                              marginRight: "20px",
                              marginLeft: "10px",
                              fontSize: "18px",
                            }}
                          >
                            <Link to="/supervisor/tablero-arribos">
                              ARRIBOS
                            </Link>
                          </MenuItem>
                          <Link to="/supervisor/tablero-partidas">
                            <MenuItem
                              onClick={handleClose4}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              PARTIDAS
                            </MenuItem>
                          </Link>
                          <Link to="/supervisor/tablero-interurbanos">
                            <MenuItem
                              onClick={handleClose4}
                              sx={{
                                my: 2,
                                color: "#0E315A",
                                display: "block",
                                marginRight: "20px",
                                marginLeft: "10px",
                                fontSize: "18px",
                              }}
                            >
                              INTERURBANOS
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
            {userInfo && userInfo.nombre && (
              <Typography
                variant="body"
                my="auto"
                align="center"
                width={{ xs: "90%", sm: "auto" }}
                pr={{ xs: 0, sm: 8 }}
                fontSize={{ xs: "12px", sm: "25px" }}
              >
                ¡Hola {userInfo.nombre}!
              </Typography>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Configuración Usuario">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    <SettingsIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link to="/perfil/password">
                  <MenuItem
                    key={"inicio4"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#0E315A", display: "block" }}
                  >
                    CAMBIAR CONTRASEÑA
                  </MenuItem>
                </Link>
                <MenuItem
                  key={"inicio5"}
                  onClick={() => closeSession()}
                  sx={{ mt: 1, color: "#0E315A", display: "block" }}
                >
                  CERRAR SESION
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBarSupervisor;
