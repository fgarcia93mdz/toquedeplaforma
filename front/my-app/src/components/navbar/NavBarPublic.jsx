import React from "react";
import axios from "axios";
import "./NavBar.styles.css";
import Marquee from "react-fast-marquee";

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
import { Link } from "react-router-dom";
import LogoItem from "./LogoItem";
//import LoginIcon from '@mui/icons-material/Login';
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import NorthIcon from "@mui/icons-material/North";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import AdbIcon from '@mui/icons-material/Adb';

// final


const NavBarPublic = () => {

  const [data, setData] = React.useState([]);
  const token = window.sessionStorage.getItem("jwt");

  const url = "http://localhost:8080/marquesinas/marquesina";
  const config = { headers: { authorization: `Bearer ${token}` } };

  React.useEffect(() => {
    axios
      .get(url, config)
      .then((data) => {
        return setData(data.data.marquesina);
      })
      .catch((error) => console.log("Error Marquesine Table:", error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const mobileNavbarStyle = {
    background: 'white',
    height: '78px',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    zIndex: '99',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    boxShadow: '0px -3px 9px 0px #0000004d',

  }

const mobileNavbarStyleInter = {
  width: "100%",
  position: "fixed",
  bottom: "0",
  zIndex: "99",
  textAlign: "center",
  display: {xs: 'block', sm: 'none'}
};
  const mobileNavbarIconStyle = {
    width: "45px",
    padding: '13px',
  }

  const mobileNavbarIconContainer = {
    background: 'white',
    borderRadius: '42%',
    boxShadow: '0px -3px 9px 0px #0000004d',
    marginTop: '-35px',

  }
  

  // const handleOpenUserMenu = (event) => {
  //     setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  // };

  return (
    <>
      <Box display={{ xs: "none", sm: "block" }}>
        <Marquee
          gradient={false}
          style={{
            padding: "0",
            maxHeight: "100px",
            color: "#0E315A",
            margin: "0",
            background: "white",
            textTransform: "uppercase",
            paddingTop: "3px",
          }}
        >
          <span className="texto">{data?.texto && data.texto}</span>
        </Marquee>
        <AppBar
          position="sticky"
          style={{ background: "white", color: "#0E315A", boxShadow: "none" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link to="/login">
                <LogoItem />
              </Link>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", sm: "none" },
                  justifyContent: "end",
                }}
              >
                <LogoItem />

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
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <Link to="/tablero-arribos">
                    <MenuItem
                      key={"/tablero-arribos"}
                      onClick={handleCloseNavMenu}
                    >
                      {/* <ArrowDownwardIcon /> */}
                      <Typography textAlign="center">ARRIBOS</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/tablero-partidas">
                    <MenuItem
                      key={"/tablero-partidas"}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">PARTIDAS</Typography>
                    </MenuItem>
                  </Link>

                  <a href="https://shop.terminalmendoza.com.ar/search">
                    <MenuItem
                      key={"/tablero-arribos"}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">
                        VENTA DE PASAJES
                      </Typography>
                    </MenuItem>
                  </a>
                </Menu>
              </Box>
              {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "flex" },
                  justifyContent: "center",
                }}
              >
                <Link to="/tablero-arribos">
                  <Button
                    key={"arribos"}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: "block",
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    Arribos
                    {/* <ArrowDownwardIcon  sx={{ marginLeft: '10px'}}/> */}
                  </Button>
                </Link>
                <Link to="/tablero-partidas">
                  <Button
                    key={"partidas"}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: "block",
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    Partidas
                    {/* <NorthIcon sx={{ marginLeft: '10px'}}/>  */}
                  </Button>
                </Link>
                <Link to="/tablero-interurbanos">
                  <Button
                    key={"interubanos"}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: "block",
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    INTERURBANOS
                    {/* <NorthIcon sx={{ marginLeft: '10px'}}/>  */}
                  </Button>
                </Link>
                <a href="https://shop.terminalmendoza.com.ar/search">
                  <Button
                    sx={{
                      my: 2,
                      color: "#0E315A",
                      display: { sm: "none", md: "hidden" },
                      fontSize: "20px",
                      marginRight: "50px",
                    }}
                  >
                    Venta de pasajes
                    {/* <ConfirmationNumberIcon sx={{ marginLeft: '10px'}} /> */}
                  </Button>
                </a>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box display={{ xs: "flex", sm: "none" }} style={mobileNavbarStyle}>
        <span>
          <Link to="/tablero-partidas">
            <MenuItem key={"/tablero-partidas"} onClick={handleCloseNavMenu}>
              <Typography textAlign="center" fontWeight="bold" color="#0e315a">
                PARTIDAS
              </Typography>
            </MenuItem>
          </Link>
        </span>
        <Box style={mobileNavbarIconContainer} mt={-2}>
          <Link to="/login">
              <LogoItem />
          </Link>
        </Box>
        <span>
          <Link to="/tablero-arribos">
            <MenuItem key={"/tablero-arribos"} onClick={handleCloseNavMenu}>
              {/* <ArrowDownwardIcon /> */}
              <Typography textAlign="center" fontWeight="bold" color="#0e315a">
                ARRIBOS
              </Typography>
            </MenuItem>
          </Link>
        </span>
      </Box>
      <Box sx={mobileNavbarStyleInter}>
        <Link to="/tablero-interurbanos">
          <MenuItem key={"/tablero-interurbanos"} onClick={handleCloseNavMenu}>
            {/* <ArrowDownwardIcon /> */}
            <Typography sx={{margin:'auto'}} textAlign="center" fontWeight="bold" color="#0e315a">
              INTERURBANOS
            </Typography>
          </MenuItem>
        </Link>
      </Box>
    </>
  );
};

export default NavBarPublic;


