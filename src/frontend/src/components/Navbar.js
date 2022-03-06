import React from 'react';

const Navbar = function(props) {
    return (
        <div className="__navbar navbar border-bottom navbar-expand-sm container-fluid bg-light">
            <div className="navbar-brand">
                <span className="display-6 text-center"> Notes </span>
            </div>
            <div className="navbar-nav">
                <a className="nav-item nav-link " href="/">Home</a>
                <a className="nav-item nav-link" href="/list">My notes</a>
                <a className="nav-item nav-link text-reset disabled" href="#">New note</a>
                <a className="nav-item nav-link text-reset disabled" href="#">Log in</a>
                <a className="nav-item nav-link text-reset disabled" href="#">Sign up</a>
            </div>
        </div>
    )
}

export default Navbar;