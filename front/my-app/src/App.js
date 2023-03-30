import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import ArrivalsBoard2 from "./pages/board-tv/ArrivalsBoard2";
import DeparturesBoard2 from "./pages/board-tv/DeparturesBoard2";
import InterurbanosBoard2 from "./pages/board-tv/InterurbanosBoard2";
import AppWebRouter from "./AppWebRouter";


function App() {

  return (
    <div className="App">
        <Routes>
          <Route exact path="/arribos" element={<ArrivalsBoard2 />} />
          <Route exact path="/partidas" element={<DeparturesBoard2 />} />
          <Route exact path="/interurbanos" element={ <InterurbanosBoard2 />} />

          <Route path="*" element={<AppWebRouter />} />
          {/* <Route component={AppWebRouter}/> */}
        </Routes>
    </div>
  );
}

export default App;
