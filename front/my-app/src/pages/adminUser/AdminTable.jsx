import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import TableAdminCheckboxes from "../../components/table/TableAdminCheckboxes";
// import { reset } from "../../features/counter/counterSlice";

import { Box, Stack } from "@mui/material";

const AdminRegistry = () => {
  const [arrivals, setArrivals] = useState([]);
  const count = useSelector((state) => state.counter.value);

  // FETCH DATA
  useEffect(() => {
    const token = window.sessionStorage.getItem("jwt");
    const url = `http://localhost:8080/logs?page=${count}`;
    const config = { headers: { authorization: `Bearer ${token}` } };

    axios
      .get(url, config)
      .then((data) => {
        setArrivals(data.data.registros.rows);
      })
      .catch((error) => console.log("error supervisor home", error));
  }, [count]);

  const styles = {
    margin: "auto",
    width: "100%",
    background: "#0e315a",
    color: "white",
    paddingBottom: "32px",
  };

  return (
    <Stack>
      <Box style={styles}>
        <TableAdminCheckboxes data={arrivals} />
      </Box>
    </Stack>
  );
};

export default AdminRegistry;
