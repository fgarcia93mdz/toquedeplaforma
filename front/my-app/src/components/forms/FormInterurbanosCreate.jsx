import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import BasicModal from "../modals/Modal";
import { useFormik } from "formik";

const validationSchema = yup.object({
  empresa_id: yup.number().required("Campo requerido"),
  desde: yup.number().required("Campo requerido"),
  hasta: yup.number().required("Campo requerido"),
});

const FormInterurbanosCreate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const token = window.sessionStorage.getItem("jwt");
  const url = "http://localhost:8080/interurbanos/";
  const config = { headers: { authorization: `Bearer ${token}` } };
  // const navigate = useNavigate()

  const getDropdown = () => {
    axios
      .all([
        axios.get("http://localhost:8080/empresas/listado", config),
        axios.get("http://localhost:8080/plataformas/listado", config),
      ])
      .then((data) => {
        setCompanies(data[0].data.empresas);
        setPlatforms(data[1].data.plataformas);
      })
      .catch((error) => console.log("error users", error));
  };

  useEffect(() => {
    getDropdown();
  }, []);

  const setInitialReason = () => {
    return {
      empresa_id: "", // number
      desde: "", // number
      hasta: "", // number
    };
  };

  const formik = useFormik({
    initialValues: setInitialReason(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = formik.values;
      // console.log('data to send', data)

      axios
        .post(url, data, config)
        .then((res) => {
          if (res.status === 200) {
            setOpenModal(true);
            formik.resetForm({ values: setInitialReason() });
          }
        })
        .catch(function (error) {
          console.log("Error send reset pasword:", error);
        });
    },
  });

  return (
    <Stack
      sx={{ background: "#0b2748", borderRadius: "25px", shadow: 4 }}
      my={4}
      mx={{ xs: 1, sm: 6 }}
      p={4}
      sm={6}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h4"
          color="white"
          sx={{
            fontSize: { xs: "25px", md: "40px" },
          }}>
          Asignar Plataformas a Empresa Interurbana:
        </Typography>
        <Grid container my={4}>
          <Grid
            item
            display={{ xs: "block", md: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            md={10}
            my={2}>
            <Typography
              variant="subtitle1"
              color="white"
              mb={{ xs: 1, sm: 0 }}
              display={{ xs: "none", sm: "block" }}>
              Empresa:
            </Typography>
            <TextField
              select
              label="Seleccione usuario a editar"
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                minWidth: "300px",
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              name="empresa_id"
              value={formik.values.empresa_id}
              onChange={formik.handleChange}
              error={formik.errors.empresa_id}
              helperText={formik.errors.empresa_id}>
              {companies?.map((comp) => (
                <MenuItem
                  value={comp.id}
                  key={comp.id + "empresa"}
                  selected={true}>
                  {comp.empresa}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            gap={2}
            xs={12}
            md={6}
            my={2}>
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Desde:
            </Typography>
            <TextField
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiInputBase-root": {
                  color: "white",
                },
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                minWidth: "300px",
              }}
              select
              multiline
              rows={4}
              value={formik.values.desde}
              name="desde"
              onChange={formik.handleChange}
              error={formik.errors.desde}
              helperText={formik.errors.desde}>
              {platforms?.map((plat) => (
                <MenuItem
                  value={plat.id}
                  key={"desde" + plat.plataforma + plat.id}
                  selected={true}>
                  {plat.plataforma}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            display={{ xs: "block", sm: "flex" }}
            alignItems="center"
            md={6}
            gap={2}
            xs={12}
            my={2}>
            <Typography variant="subtitle1" color="white" mb={{ xs: 1, sm: 0 }}>
              Hasta:
            </Typography>
            <TextField
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiInputBase-root": {
                  color: "white",
                },
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                minWidth: "300px",
              }}
              select
              multiline
              rows={4}
              value={formik.values.hasta}
              name="hasta"
              onChange={formik.handleChange}
              error={formik.errors.hasta}
              helperText={formik.errors.hasta}>
              {platforms?.map((plat) => (
                <MenuItem
                  value={plat.id}
                  key={"hasta" + plat.plataforma + plat.id}
                  selected={true}>
                  {plat.plataforma}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sx={{ marginRight: "auto" }} align="center" pt={8} xs={12}>
            <Button variant="contained" ml="auto" type="submit" my={2}>
              Asignar Plataformas
            </Button>
          </Grid>
          {openModal && (
            <BasicModal
              title="Exito"
              message="Plataformas seleccionadas con exito"
              openModal={openModal}
            />
          )}
        </Grid>
      </form>
    </Stack>
  );
};

export default FormInterurbanosCreate;
