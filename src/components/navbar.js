import React, { Component } from 'react'

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: '#121212' }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className="LogoNavbar">Social Web</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a href="#" className="nav-link" aria-current="page">
              Profile
            </a>
            <a className="nav-link" href="#">
              Messages
            </a>
          </div>
        </div>
        <div className="d-flex">
          <a className="nav-link" href="#">
            LogOut
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
