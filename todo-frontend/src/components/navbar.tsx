import React, { useState, useEffect } from "react";
import loginModel from '../models/loginModel';
import * as AuthService from "../services/auth-service";

interface NavBarProps {
    logOut: () => void;
}

const NavBar: React.FC<NavBarProps> = ({logOut}: NavBarProps) => {
    if(AuthService.getCurrentUser() == undefined) {
        return (null)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Todo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">hello {AuthService.getCurrentUser()?.username}</a>
                    </li>
                </ul>
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={() => logOut()}>Logout</button>
                </form>
            </div>
        </nav>
    );
}

export default NavBar
