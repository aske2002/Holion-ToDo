import React from "react";
import * as AuthService from "../services/auth-service";

interface NavBarProps {
    logOut: () => void;
}

const NavBar: React.FC<NavBarProps> = ({logOut}: NavBarProps) => {
    if(AuthService.getCurrentUser() === undefined) {
        return (null)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand d-flex align-items-center" >
                    <h1>Todo</h1>
                    <small className="mx-3">hello {AuthService.getCurrentUser()?.username}</small>
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={() => logOut()}>Logout</button>
                </form>
            </div>
        </nav>
    );
}

export default NavBar
