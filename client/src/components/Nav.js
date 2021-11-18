import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
// import { color, shape } from "../styles";
// import styled from "styled-components";

//import img from "../images/icon.webp";
import img from "../images/doctor8.jpg";
import img1 from "./doctor_1.png"

// const Header = styled.header`
//   // padding: 20px;
//   background: ${color.headerColor};
// `;

// const StyledNav = styled.nav`
//   display: flex;
// `;

// const NavigationList = styled.ul`
//   display: flex;
//   vertical-align: top;
//   width: 100%;

//   ${(props) =>
//     props.float &&
//     `
// 		justify-content: end;
// 	`}
// `;

// const NavigationItem = styled.li`
//   margin: 1rem;
//   padding: 1rem;
//   border-radius: ${shape.borderRadius};
//   background: ${color.bodyColor};
//   a {
//     color: ${color.textDark};
//     text-decoration: none;
//     font-size: 1.6rem;
//   }

//   &:hover {
//     background: ${color.backgroundLight};
//   }
// `;
// const size = {
//   height: 105,
//   width: 105
// }

function AuthNav() {
  if (Auth.loggedIn() && Auth.isRole("User")) {
    return (
      <>
        <ul>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>

          <li className="mx-1">
            {/* <a href="/appointmentForm">Book Online </a> */}
            <a href="/userAppointments">My Appointments </a>
          </li>

          <li className="mx-1">
            <a href="/appointment">Book Appointment</a>
          </li>
        </ul>
      </>
    );
  } else if (Auth.loggedIn() && Auth.isRole("Doctor")) {
    return (
      <>
        <ul>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="mx-1">
            <a href="/me">MyAppointments</a>
          </li>
          {/* <li className="mx-1">
            <a href="/appointment">Appointment</a>
          </li> */}
        </ul>
      </>
    );
  } else {
    return (
      //   <NavigationList float="right">
      //     <NavigationItem>
      //       <Link to="/signup">Signup</Link>
      //     </NavigationItem>
      //     <NavigationItem>
      //       <Link to="/signupdoc">SignupDoctor</Link>
      //     </NavigationItem>
      //     <NavigationItem>
      //       <Link to="/login">Login</Link>
      //     </NavigationItem>
      //     <NavigationItem>
      //       <Link to="/logindoc">LoginDoctor</Link>
      //     </NavigationItem>
      //   </NavigationList>
<>
      <ul className="flex-row">
        <li className="mx-1">
          <Link to="/signup">Signup</Link>
        </li>
        <li className="mx-1">
          <Link to="/login">Login</Link>
        </li>

            <li className="mx-1">
              <Link to="/signupdoc">SignupDoctor</Link>
            </li>
            <li className="mx-1">
              <Link to="/logindoc">LoginDoctor</Link>
            </li>
          </ul>
          </>
    );
  }
}

function Nav() {
  return (
    <header className="flex-row px-1">
      <h1 className="center">
        <Link to="/">
          <p>
            {/* <img src={img} alt="logo" width="20" height="20" /> */}
            <Link className="nav-logo" to="/">
                    {/* Cure<img className="nav-log-img" style={{width: "3.2rem"}} src={require("./doctor_1.png")} />        */}
                                    Cure<img className="nav-log-img" style={{width: "3.2rem"}} src={img1} />       

                </Link>

          </p>
        </Link>
      </h1>

      <nav>{AuthNav()}</nav>
    </header>

    // <Header>
    //   <StyledNav>
    //     <NavigationList>
    //       <NavigationItem>
    //         <Link to="/">
    //           {/* <img src={"../images/doctor8.jpg"} alt="logo" /> */}
    //           <p><img src={img} alt="logo" width="20" height="20" /></p>
    //           {/* <img styles={size} src={img} alt="logo"/> */}
    //         </Link>
    //       </NavigationItem>

    //       <NavigationItem>
    //         {/* this is not using the Link component to logout or user and then refresh the application to the start */}
    //         <a href="/dashboard">Our Team</a>
    //       </NavigationItem>
    //     </NavigationList>
    //     <AuthNav />
    //   </StyledNav>
    // </Header>
  );
}

export default Nav;
