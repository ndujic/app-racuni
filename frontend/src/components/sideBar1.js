import "./izbornik.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function odjava() {
  localStorage.removeItem("authToken");
  window.location.href = "/";
}

function SideBar1() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Divider />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          <ListItem component={Link} to="/klijenti">
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Klijenti"} />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to="/racuni">
            <ListItemButton>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary={"Računi"} />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem component={Link} to="/noviKlijent">
            <ListItemButton>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Novi Klijent"} />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to="/noviRacun">
            <ListItemButton>
              <ListItemIcon>
                <AddCardIcon />
              </ListItemIcon>
              <ListItemText primary={"Novi Račun"} />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem component={Link} to="/postavke">
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Postavke"} />
            </ListItemButton>
          </ListItem>

          <Divider />
          <Button onClick={() => odjava()}>Odjavi se</Button>
        </List>
      </Drawer>
    </Box>
  );
}

export default SideBar1;
