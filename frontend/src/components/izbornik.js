import "./izbornik.css";
import * as React from "react";
import SideBar1 from "./sideBar1";
import SideBar2 from "./sideBar2";

const korisnikJeLogiran = !!localStorage.getItem("authToken");

function Izbornik() {
  return <div>{korisnikJeLogiran ? <SideBar1 /> : <SideBar2 />}</div>;
}

export default Izbornik;
