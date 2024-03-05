import "./izbornik.css";
import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

function SideBar2() {
  return (
    <div style={{ paddingTop: "3px" }}>
      <Divider />
      <ListItem component={Link} to="/registracija">
        <ListItemButton>
          <ListItemIcon>
            <AppRegistrationIcon />
          </ListItemIcon>
          <ListItemText primary={"Registracija"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem component={Link} to="/prijava">
        <ListItemButton>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary={"Prijava"} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
}

export default SideBar2;
