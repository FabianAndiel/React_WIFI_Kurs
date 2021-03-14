import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Signup from './user/pages/Signup';
import Login from './user/pages/Login';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, userId, login, logout } = useAuth();

  let routes;

  if(token)
 {
   routes=(
  <Switch>
    <Route path="/" exact>
      <Users/>
    </Route>
    <Route path="/:userId/places" exact>
      <UserPlaces/>
    </Route>
    <Route path="/places/new" exact>
      <NewPlace/>
    </Route>
    <Route path="/places/:placeId" exact>
      <UpdatePlace/>
    </Route>
    <Redirect to="/"/>
  </Switch>);
 } 
 
 else {
routes=(
  <Switch>
  <Route path="/" exact>
    <Users/>
  </Route>
  <Route path="/:userId/places" exact>
    <UserPlaces/>
  </Route>
  <Route path="/login" exact>
    <Login/>
  </Route>
  <Route path="/signup" exact>
    <Signup/>
  </Route>
  <Redirect to="/login" />
</Switch>
    );
 }
  return (

  <AuthContext.Provider value={
    {
      isLoggedIn: !!token, token, login, logout,userId
    }
  }>
    <Router>
      <MainNavigation/>
      <main> {routes}</main>
    </Router>
    <div>Ich bin die APP</div>
  </AuthContext.Provider>
  )
};

export default App;
