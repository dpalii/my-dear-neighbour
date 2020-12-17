import './App.scss';
import Login from '../loginComponent/Login';
import Register from '../registerComponent/Register';
import Content from '../contentComponent/Content';
import { AppContext } from '../appContext';

import React, { useState } from 'react'; 
import { 
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

function App(props) {
  const [ token, setToken ] = useState(localStorage.getItem('jwt'));
  const [ lang, setLang ] = useState('uk');

  const authCallback = (jwt) => {
    setToken(jwt);
    localStorage.setItem('jwt', jwt);
  }

  return (
    <AppContext.Provider value={{
      lang: lang,
      token: token,
      setToken: authCallback,
      setLang: setLang
    }}>
      <Router>
        <Switch>
          <Route exact path="/login" >
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route
            path="/"
            render={() => {
                return (
                  token ?
                  <Content /> :
                  <Redirect to="/login" /> 
                )
            }}
          />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
