import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

//Import Login modal
import LoginModal from "../LoginModal/index";

export default function Navbar() {
  //Login Modal
  //Modal - useState
  const [modalShow, setModalShow] = useState(false);

  //Open Modal
  const handleOpenModal = () => {
    setModalShow(true);
  };

  console.log(handleOpenModal);

  //Close Modal
  const handleCloseModal = () => {
    setModalShow(false);
  };
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#8C2E5A",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#8C2E5A",
            }}
          >
            <a href="/">
              <img
                src={require("../../assets/logo/nutriLogoNav.png")}
                alt="icon"
                height="50px"
              ></img>
            </a>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{ ml: "auto" }} color="inherit" onClick={handleOpenModal}>
            Login
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ margin: 2, backgroundColor:"#8C2E5A" }}
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>
      <LoginModal open={modalShow} handleClose={handleCloseModal} />
    </Box>
  );
}
