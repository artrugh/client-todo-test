import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// styles
import './css/App.scss';

// components
import Home from './routers/Home';
import Login  from './routers/Login';
import  Sign  from './routers/Sign';
import Admin from './routers/Admin';
import  User  from './routers/User';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign" component={Sign} />
        <Route path="/user" component={User} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
