import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import TableAdminMonth from "../../components/table/TableAdminMonth";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import ModalExcel from "../../components/modals/ModalExcel";
import ModalError from "../../components/modals/ModalError";
import { Box, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";


// Fecha actual
  const dateNow = new Date(); // Creating a new date object with the current date and time
  const menosUno = 1;
  dateNow.setHours(menosUno);
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
  ? `0${dateNow.getUTCDate()}`
  : dateNow.getUTCDate();
  

const AdminRegistry = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [DataLosMensual, setDataLosMensual] = useState([]);
  
 const day = `Registro administrativo mensual_${new Date()
   .toJSON()
   .slice(0, 10)}`;

  const getInitialTicket = () => {
    return {
      month: "", // '01-01-2022'
      year: `${year}`, // '12:00'
    };
  };
  // FETCH DATA
  
    const formik = useFormik({
      initialValues: getInitialTicket(),
      onSubmit: (values) => {
        const token = window.sessionStorage.getItem("jwt");
        const url = `http://localhost:8080/logs/month?month=${formik.values.month}&year=${formik.values.year}`;
        const config = { headers: { authorization: `Bearer ${token}` } };
        axios({
          url: url,
          method: "GET",
          config: { headers: { authorization: `Bearer ${token}` } },
          responseType: "blob",
        })
          .then((res) => {
            if (res.status === 200) {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `${day}.xls`);
              document.body.appendChild(link);
              link.click();
              setOpenModal(true);
            } 
          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.log(error.response.status);
            setOpenModal2(true);
          }});
      },
    });
  



  const styles = {
    margin: "auto",
    width: "100%",
    background: "#0e315a",
    color: "white",
    paddingBottom: "32px",
  };
  const styless = {
    background: "#024ca4",
    color: "white",
    ".MuiAccordionSummary-root .MuiSvgIcon-root": {
      color: "white",
      fontSize: "3.5rem",
    },
    "Mui-expanded": {
      margin: "0px",
    },
    "&:focus": {
      background: "#0b2748",
    },
    display: "flex",
    justifyContent: "spacebettwen",
  };

  return (
    <Stack>
      <form onSubmit={formik.handleSubmit}>
        <Box style={styless}>
          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            sm={6}
            my={2}
            marginLeft="400px"
          >
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Mes:
            </Typography>
            <TextField
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiInputBase-root": {
                  color: "white",
                },
              }}
              InputProps={{
                type: "text",
              }}
              value={formik.values.month}
              name="month"
              onChange={formik.handleChange}
              error={formik.errors.interno}
              helperText={formik.errors.interno}
            />
          </Grid>
          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            sm={6}
            my={2}
            marginLeft="20px"
          >
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Año:
            </Typography>
            <TextField
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiInputBase-root": {
                  color: "white",
                },
              }}
              InputProps={{
                type: "text",
              }}
              value={formik.values.year}
              name="year"
              onChange={formik.handleChange}
              error={formik.errors.interno}
              helperText={formik.errors.interno}
            />
          </Grid>
          <Grid
            item
            sx={{ marginRight: "auto" }}
            xs={12}
            marginLeft="25px"
            marginTop="25px"
          >
            <Button variant="contained" ml="auto" type="submit" my={2}>
              Buscar registro mensual
            </Button>
          </Grid>
        </Box>
      </form>
      {openModal && <ModalExcel title="Éxito" openModal={openModal} />}
      {openModal2 && (
        <ModalError
          title="Error"
          message="Por favor verifique la fecha ingresada"
          openModal={openModal2}
        />
      )}
    </Stack>
  );
};

export default AdminRegistry;
