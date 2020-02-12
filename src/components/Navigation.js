import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import FormContainer from './FormContainer';

import { logout } from '../requests/fetchData';

const Navigation = props => {

  // logout the user calling the API and removing the token from LocalStorage
  const logoutuser = async () => {
    // request
    const response = await logout(props.jwt);
    // if it succeeds
    if (response.status === 200) {
      // delete the token from the localStorage
      localStorage.removeItem('x-auth-token');
      // redirect the client to the home
      props.history.push('/')
    }
  }

  return (
    <div className = "nav-container">
      <nav>
        <Link to="/user"
          className="logo">
          TODO APP
      </Link>
        <Link to="/" className="logout" onClick={() => logoutuser()}>
          {props.name}<br />
          logout
        </Link>
      </nav>
      <FormContainer addNewItem={props.addNewItem} />
    </div>
  )
};

export default withRouter(Navigation);
