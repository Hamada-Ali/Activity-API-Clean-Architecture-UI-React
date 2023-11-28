import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {

  return (
    <Navbar expand="lg" bg='dark' className='navbar-css'  data-bs-theme="dark">
      <Container>
      <Navbar.Brand as={NavLink} to="/" href="#home" className='mr-2'>
            <img
              alt=""
              src="/assets/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <span className='mt-1 d-inline-block'>Reactivities</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={'/activities'}  className="d-inline-block align-top mt-1">Activities</Nav.Link>
            <Nav.Link as={NavLink} to={'/errors'}  className="d-inline-block align-top mt-1 success">Errors</Nav.Link>
            <Nav.Link as={NavLink} to={'/createActivity'} ><Button variant="success m-0" size="sm">Create Activity</Button>{' '}</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;