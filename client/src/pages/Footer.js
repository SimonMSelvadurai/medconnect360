import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";


// const Header = styled.header`
//   // padding: 20px;
//   background: #212529;
// `;

// headerColor: '#212529',

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <>
    <AppBar position="static" color="primary">
    {/* <footer className="w-100 mt-auto bg-secondary p-4"> */}
      <div className="container text-center mb-5">
      <Container maxWidth="md">
      <Toolbar>

        {/* {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )} */}
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          &copy; 2021 SimonS
        </h4>
        </Toolbar>

        </Container>
        </div>


        </AppBar>
    {/* </footer> */}
    </>
  );
};

export default Footer;
