// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import React, { useEffect, Fragment } from 'react';
// import Alert from './components/layout/Alert';
// import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';


//import Auth from "./utils/auth";
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupDoc from './pages/SignupDoc';
import LoginDoc from './pages/LoginDoc';
import Appointment from './pages/Appointment';
import Booking from './pages/Booking';
import BookingContainer from './containers/BookingContainer';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import { StoreProvider } from './state/GlobalState';
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
            {/* <Route exact path="/dashboard" component={Auth.loggedIn()(Dashboard)} /> */}
            <Route exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/Appointment" component={BookingContainer} /> */}
            <Route exact path="/BookingContainer" component={BookingContainer} />
            
            {/* <Route path="/booking/:doctorId" component={Booking} /> */}
            <Route path="/booking/:doctorId" component={Booking} />
            <Route component={NoMatch} />
          </Switch>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
