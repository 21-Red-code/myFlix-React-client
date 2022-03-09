import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { setMovies } from '../../actions/actions';//actions movies
import { setUser } from '../../actions/actions';//actions user
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import MoviesList from '../movies-list/movies-list'
import { LoginView } from '../Login/login-view';
import { RegistrationView } from '../Register/register';
//import { MovieCard } from '../Movie-Card/movie-card';
import { MovieView } from '../Movie-View/movie-view';
import { ProfileView } from '../User-Profile/profile-view';
import { GenreView } from '../Genre/genre-view';
import { DirectorView } from '../Director/director-view';
import  {NavbarView}  from '../Navbar/navbar-view';

import './main-view.scss';

class MainView extends React.Component {
	constructor() {
			super();
			// Initial state is set to null
			this.state = {
					// movies: [],
					//selectedMovie: null,
					user: null
			};
	}
	componentDidMount() {
			let accessToken = localStorage.getItem('token');
			if (accessToken !== null) {
					this.setState({
							user: localStorage.getItem('user')
					});
					this.getMovies(accessToken);
			}
	}
	/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
	onLoggedIn(authData) {
			console.log(authData);
			this.setState({
					user: authData.user.Username
			});
			localStorage.setItem('token', authData.token);
			localStorage.setItem('user', authData.user.Username);
			this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}

	getMovies(token) {
		axios.get(`https://good-movies-origin.herokuapp.com/movies`, {
			headers: { Authorization: `Bearer ${token}`}
		})
			.then(response => {
				// Action
					this.props.setMovies(response.data);
			})
			.catch(function (error) {
				console.log(error + "---- get Movies list error (Main-View)----");
			});
	}
  
	// for testing of .map is not a function
	getUser = (token) => {
        const Username = localStorage.getItem('user');
        axios
            .get(`https://good-movies-origin.herokuapp.com/users/${Username}/user`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              this.setState({ user: response.data });
            })
            .catch(function (error ) {
                console.log(error + "----get user error (Main-View)----");
            });
    };

	render() {
	  let { movies } = this.props;
    //let { user } = this.props;
		//from CF I have to check props/state (if I have issue later  will use user as state and remove SET_USER action)
    let { user } = this.state;
	return (
		<Router>
			<Container>
				<NavbarView  />
				<Row className="main-view justify-content-md-center">
						<Route exact path="/" render={() => {
							if (!user) {
									return <Redirect to="/login" />;
							}
							if (movies.length === 0) return <div className="main-view" />;
							return <MoviesList movies={movies}  />
						}} />
						<Route path="/login" render={() => {
								if (user) {
										return <Redirect to="/" />;
								}
								return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
						}} />
						<Route path="/register" render={() => {
								if (user) {
										return <Redirect to="/" />;
								}
								return (
										<Col>
												<RegistrationView />
										</Col>
								);
						}} />
						<Route path="/movies/:movieId" render={({ match, history }) => {
								if (!user) {
										return (
												<Col>
														<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
												</Col>
										);
								}
								if (movies.length === 0) {
										return <div className="main-view" />;
								}
								return (
										<Col sm={6} >
											<MovieView
											movie={movies.find(m => m._id === match.params.movieId)}
											//movie={movies.find(m => m.tite === match.params.Title)}
											onBackClick={() => history.goBack()} addToFav={this.addToFav} />
										</Col>
								);
						}} />
						<Route path="/profile" render={({ history }) => {
								if (!user) {
										return (
												<Col>
														<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
												</Col>
										);
								}
								return (
										<Col md={8}>
												<ProfileView movies={movies} onBackClick={() => history.goBack()} />
										</Col>
								);
						}} />
						<Route path="/genres/:Name" render={({ match, history }) => {
								if (!user) {
										return (
												<Col>
														<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
												</Col>
										);
								}
								if (movies.length === 0) {
										return <div className="main-view" />;
								}
								return (
										<Col md={8}>
												<GenreView
														genre={movies.find(m => m.Genre.Name === match.params.Name).Genre}
														onBackClick={() => history.goBack()}
														// movies={movies.filter(movie => movie.Genre.Name === match.params.Name)}
												/>
										</Col>
								)
						}} />
						<Route path="/directors/:Name" render={({ match, history }) => {
							if (!user) {
								return (
									<Col>
										<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
									</Col>
								);
							}
							if (movies.length === 0) return <div className="main-view" />;
							return (
								<Col md={8}>
									{/* <DirectorView Director={movies.find(m => m.Director.Name === match.params.Name).Director}  onBackClick={() => history.goBack()} /> */}
									<DirectorView
										director={movies.find(m => m.Director.Name === match.params.Name).Director}
										onBackClick={() => history.goBack()}
										//movies={movies.filter(movie => movie.Director.Name === match.params.Name)} 
									/>
								</Col>
							);
						}} />
				</Row>
			</Container>
		</Router>
	);
	}
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}
//mapStateToProps is a function that—if defined—will allow the component (the one you want to connect) to subscribe to store updates
export default connect(mapStateToProps, { setMovies } )(MainView);
