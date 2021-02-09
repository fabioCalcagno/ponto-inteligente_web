import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Login from './pages/login/login';
import Landing from './pages/landing/landing';
import AreaUsuario from './pages/user-area/userArea';
import LancarHora from './components/LancarHora/lancarHora';
import Unauthorized from './utils/unauthorized/unauthorized';
import {isAuthenticated} from './utils/authUtils';



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/unauthorized", state: { from: props.location } }} />
        )
      }
    />
  );


function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path="/area-usuario" exact component={AreaUsuario}/>
                <PrivateRoute path="/lancamentos" exact component={LancarHora}/>
                <Route path="/unauthorized" exact component={Unauthorized}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;