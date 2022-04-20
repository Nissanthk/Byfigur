import React from 'react';
import './App.css';

const NavBar = ()=>{

    if (localStorage.getItem("account") == "true"){
      return (
      <nav class="navbar">
      <div class="container">
        <a href="/" className="navbarTitle">Småfigurer</a>
        <a href="/logout" className="logButton">{localStorage.getItem("googleUserName")}</a>
      </div>
      </nav>
      )
    }
    else {
    return(
      <nav class="navbar">
        <div class="container">
          <a href="/" className="navbarTitle">Småfigurer</a>
          <a href="/login" className="logButton">Login</a>
        </div>
      </nav>
      )
    }
}

export default NavBar; 

