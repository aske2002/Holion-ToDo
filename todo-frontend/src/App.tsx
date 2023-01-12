import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import * as AuthService from "./services/auth-service";

import NavBar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import loginModel from "./models/loginModel";

function App() {
  const [currentUser, setCurrentUser] = useState<loginModel | undefined>(undefined);

  useEffect(() => {
    const user: loginModel | undefined = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);  
  };
  return (
    <div>
      <NavBar logOut={logOut}></NavBar>      
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;