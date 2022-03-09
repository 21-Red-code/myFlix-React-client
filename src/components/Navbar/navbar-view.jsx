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
				<Navbar className="main-nav" expand="md" >
						<Container fluid>
								<Navbar.Brand id="navbar-logo" href="/">classic movies</Navbar.Brand>
								<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
								<Navbar.Collapse id="responsive-navbar-nav">
										<Nav className="ml-auto">
												{isAuth() && (
														<Nav.Link href="/profile">My profile</Nav.Link>
												)}
												{isAuth() && (
												<Nav.Link id="logout" onClick={() => { onLoggedOut() }}>Logout</Nav.Link>
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
