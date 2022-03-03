import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
// import Logo from '../../logo/logo.png';
import './navbar-view.scss';

export function NavbarView() {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar className="main-nav" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand className="navbar-logo" href="/">classic movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href="/profile">My profile</Nav.Link>
                        )}
                        {isAuth() && (
                          <Nav.Link id="logout" onClick={() => { onLoggedOut() }}>Logout</Nav.Link>

                          // <Button variant="link" onClick={() => {
                          //     onLoggedOut()
                          // }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Login</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Register</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

  //original
// export function NavbarView({ onLoggedOut }) {
//   return (
//       <Navbar className="navbar"
//         collapseOnSelect
//         expand="lg"
//         variant="dark"
//         sticky="top">
//         <Container>
//           <Navbar.Brand href="#home">
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="nav-link">
//               <Nav.Link href="#home" >Home</Nav.Link>
//               <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//   )
// }