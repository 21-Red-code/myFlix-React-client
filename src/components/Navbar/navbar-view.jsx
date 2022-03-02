import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
// import Logo from '../../logo/logo.png';

export function NavbarView({ onLoggedOut }) {
  return (
      <Navbar className="navbar"
        collapseOnSelect
        expand="lg"
        variant="dark"
        sticky="top">
        <Container>
          <Navbar.Brand href="#home">
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-link">
              <Nav.Link href="#home" >Home</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}