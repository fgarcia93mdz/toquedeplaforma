import React from "react";
import "./NavBar.styles.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Link } from 'react-router-dom'
// import jwt_decode from "jwt-decode";

// import jwt from 'jsonwebtoken'

// inicio
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import SettingsIcon from "@mui/icons-material/Settings";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
import { Link } from "react-router-dom";
import { Avatar, Tooltip } from "@mui/material";

// import { Box, Stack } from '@mui/system';

const NavBarRRHH = ({ name }) => {
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
  const token = window.sessionStorage.getItem("jwt");

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
                <Link to="/usuarios">
                  <MenuItem key={"usuarios"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Usuarios</Typography>
                  </MenuItem>
                </Link>
                <Link to="/usuarios/crear">
                  <MenuItem key={"crearUsuario"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Crear Usuario</Typography>
                  </MenuItem>
                </Link>
                <Link to="/usuarios/resetPass">
                  <MenuItem
                    key={"resetearContraseña"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">
                      Resetear Contraseñas
                    </Typography>
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
              }}
            >
              <Link to="/usuarios" onClick={handleCloseNavMenu}>
                <Button
                  key={"inicio"}
                  sx={{
                    my: 2,
                    color: "#0E315A",
                    display: "block",
                    marginRight: "20px",
                    marginLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  USUARIOS
                </Button>
              </Link>
              <Link to="/usuarios/crear" onClick={handleCloseNavMenu}>
                <Button
                  key={"inicio2"}
                  sx={{
                    my: 2,
                    color: "#0E315A",
                    display: "block",
                    marginRight: "20px",
                    fontSize: "18px",
                  }}
                >
                  CREAR USUARIO
                </Button>
              </Link>
              <Link to="/usuarios/resetPass" onClick={handleCloseNavMenu}>
                <Button
                  key={"inicio2"}
                  sx={{
                    my: 2,
                    color: "#0E315A",
                    display: "block",
                    marginRight: "20px",
                    fontSize: "18px",
                  }}
                >
                  RESETEAR CONTRASEÑAS
                </Button>
              </Link>
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
              <Tooltip title="Open settings">
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
                    sx={{ my: 2, color: "#0E315A", display: "block" }}
                  >
                    CERRAR SESION
                  </MenuItem>
                </Menu>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBarRRHH;
