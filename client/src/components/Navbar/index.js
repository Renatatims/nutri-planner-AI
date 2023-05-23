import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteIcon from "@mui/icons-material/Favorite";

//Import Login modal
import LoginModal from "../LoginModal/index";
import SignupModal from "../SignupModal/index";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

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

  //Signup Modal
  //Modal - useState
  const [modalSignupShow, setSignupModalShow] = useState(false);

  //Open Modal
  const handleOpenSignupModal = () => {
    setSignupModalShow(true);
  };

  console.log(handleOpenModal);

  //Close Modal
  const handleCloseSignupModal = () => {
    setSignupModalShow(false);
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
          {Auth.loggedIn() ? (
            <div>
              <Link to="/MealPlan">
                <IconButton
                  size="large"
                  aria-label="heart"
                  sx={{ ml: 2, color: "white" }}
                >
                  <Badge badgeContent={0} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                size="large"
                aria-label="logout"
                color="inherit"
                onClick={() => {
                  Auth.logout();
                }}
              >
                <Badge badgeContent={0} color="error">
                  <ExitToAppIcon />
                </Badge>
              </IconButton>
            </div>
          ) : (
            <>
              <Button
                sx={{ ml: "auto" }}
                color="inherit"
                onClick={handleOpenModal}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleOpenSignupModal}
                sx={{ margin: 2, backgroundColor: "#8C2E5A" }}
              >
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={modalShow} handleClose={handleCloseModal} />
      <SignupModal
        open={modalSignupShow}
        handleClose={handleCloseSignupModal}
      />
    </Box>
  );
}
