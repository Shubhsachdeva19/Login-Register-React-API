import React, { Component } from "react";
import './Welcome.css';
// import Signup from './components/form/Signup';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


const Welcome = () => {
    return (
        <div className="wrapper">
            <div className="link_wrapper">
                <Router>
                <Link to="/Signup" class="a btn-2">Register</Link>
                <p>|</p>
                <Link href="/Login" class="a btn-5">Login</Link>
                </Router>
            </div>

        </div>

    )
}

export default Welcome;