import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="home">
        <div className="welcome-container">
            <h1 className="logo">TODO APP</h1>
            <Link className="sign" to="/login">log in</Link>
            <Link className="sign" to="/sign">sing up</Link>
        </div>
    </div>
);

export default Home;