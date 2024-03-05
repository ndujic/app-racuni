import React from "react";
import Izbornik from "./components/izbornik";
import { SWRConfig } from "swr";
import { customFetch } from "./api";
import { Routes, Route } from "react-router-dom";
import ListaKlijenti from "./components/listaKlijenti";
import DodajKlijenta from "./components/dodajKlijenta";
import ListaRacuni from "./components/listaRacuni";
import DodajRacun from "./components/dodajRacun";
import PrikazRacuna from "./components/prikazRacuna";
import Postavke from "./components/postavke";
import Registracija from "./components/registracija";
import Prijava from "./components/prijava";
import Box from "@mui/material/Box";

function App() {
  const drawerWidth = 240;
  const korisnikJeLogiran = !!localStorage.getItem("authToken");

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: customFetch,
      }}
    >
      <Izbornik />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {korisnikJeLogiran ? (
          <Routes>
            <Route path="/klijenti" element={<ListaKlijenti />} />
            <Route path="/noviKlijent" element={<DodajKlijenta />} />
            <Route path="/racuni" element={<ListaRacuni />} />
            <Route path="/noviRacun" element={<DodajRacun />} />
            <Route path="/racuni/:id" element={<PrikazRacuna />} />
            <Route path="/postavke" element={<Postavke />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/registracija" element={<Registracija />} />
            <Route path="/prijava" element={<Prijava />} />
          </Routes>
        )}
      </Box>
    </SWRConfig>
  );
}

export default App;
