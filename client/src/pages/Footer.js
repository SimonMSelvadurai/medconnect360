import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <AppBar position="static" color="primary">
        <div className="container text-center mb-5">
          <Container maxWidth="md">
            <Toolbar>
              <h4>
                Made with{" "}
                <span
                  className="emoji"
                  role="img"
                  aria-label="heart"
                  aria-hidden="false"
                >
                  ❤️
                </span>{" "}
                &copy; 2021 SimonS
              </h4>
            </Toolbar>
          </Container>
        </div>
      </AppBar>
    </>
  );
};

export default Footer;
