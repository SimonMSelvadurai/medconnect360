// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import React, { useEffect, Fragment } from 'react';
// import Alert from './components/layout/Alert';
// import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';


//import Auth from "./utils/auth";
import Home from './pages/Home';
import Footer from './pages/Footer';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupDoc from './pages/SignupDoc';
import LoginDoc from './pages/LoginDoc';
import UpdateBookingForm from './pages/UpdateBookingForm';
// import TestAppts from './pages/TestAppts';
import MyPage from './pages/MyPage';
// import Booking from './pages/Booking'

// import Appointment from './pages/Appointment';

// import AppointmentContainer from './containers/AppointmentContainer';
import AppointmentForm from './components/bookappointment/AppointmentForm';
// import Booking from './pages/Booking';
// import BookingContainer from './containers/BookingContainer';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import { StoreProvider } from './state/GlobalState';
// import BookingList from './components/booking/BookingList';
import Profiles from './pages/profiles/Profiles';
import  Success  from './pages/Success';
import  CancelSuccess  from './pages/CancelSuccess';
import UserAppointments from './pages/UserAppointments';
//import AuthedRoute from './components/AuthedRoute';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/loginDoc" component={LoginDoc} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signupDoc" component={SignupDoc} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/cancelSuccess" component={CancelSuccess} />
            
            {/* <Route exact path="/dashboard" component={Auth.loggedIn()(Dashboard)} /> */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/me" component={MyPage} />
            <Route exact path="/Appointment" component={Profiles} />

            {/* <Route exact path="/Appointment" component={AppointmentContainer} /> */}
            {/* <Route exact path="/appointmentForm" component={Booking} /> */}
            <Route exact path="/userAppointments" component={UserAppointments} />

            
            {/* <Route path="/booking/:doctorId" component={Booking} /> */}
            {/* <Route path="/booking/:doctorId" component={Booking} /> */}
            <Route exact path='/appointment/:id' component={AppointmentForm} />
            <Route path="/editBooking" component={UpdateBookingForm} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
