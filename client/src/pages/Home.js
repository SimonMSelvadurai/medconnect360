import React from "react";

import { Container } from "../components/Container";
import { H2 } from '../components/Text';
import img from "../images/H1.jpeg";

const Home = () => {
  return (
    <Container alignContent="center">
      <H2>Welcome to MedConnect360</H2>
      <H2>Global Health Provider</H2>
      <img
                className="nav-log-img"
                style={{ width: "50rem" }}
                src={img}
              />
    </Container>
  );
};

export default Home;
