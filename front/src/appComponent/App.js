import './App.scss';
import Login from '../loginComponent/Login';
import Register from '../registerComponent/Register';

import React, { useState } from 'react'; 
import { 
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

function App() {
  const [ token, setToken ] = useState(localStorage.getItem('jwt'));

  const authCallback = (jwt) => {
    setToken(jwt);
    localStorage.setItem('jwt', jwt);
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
              return (
                token ?
                <Redirect to="/groups" /> :
                <Redirect to="/login" /> 
              )
          }}
        />
        <Route exact path="/login" >
          <Login authCallback={authCallback}/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/groups">
          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
