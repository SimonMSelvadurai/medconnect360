import React from 'react';

import { Redirect, useParams, useHistory, Route } from 'react-router-dom';
import Auth from '../utils/auth';

const AuthedRoute = ({children, requiredRole, ...routeProps}) => {
  const history = useHistory();
  return <Route 
    {...routeProps} 
    render={() => {
        const role = Auth.getRole();
        if (!Auth.loggedIn()) {
            return <Redirect to="/" />;
        }
        if (role != requiredRole) {
            return history.goBack();
        }
        return children
    }}
  />;
};

export default AuthedRoute;
