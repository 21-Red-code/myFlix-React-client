import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginView } from '../Login/login-view';
import { RegistrationView } from '../Register/register';
import { MovieCard } from '../Movie-Card/movie-card';
import { MovieView } from '../Movie-View/movie-view';
import { ProfileView } from '../User-Profile/profile-view';
import { GenreView } from '../Genre/genre-view';
import { DirectorView } from '../Director/director-view';
import  {NavbarView}  from '../Navbar/navbar-view';
import './main-view.scss';


export class MainView extends React.Component {
	constructor() {
			super();
			// Initial state is set to null
			this.state = {
					movies: [],
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
				// Assign the result to the state
				this.setState({
					movies: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
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
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavMovies: response.data.FavMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

		// addToFav(movie) {
    //   // let favs = this.state.userData.FavouriteMovies;
    //   let favs = this.state.userData.FavMovies;
    //   console.log(favs, movie, 'favourites');
    //   if (favs.indexOf(movie) < 0) {
    //     console.log('inside if condition');
    //     favs.push(movie);
      
    //   this.setState(prevState => ({
    //     ...prevState,
    //     user: {
    //       ...prevState.userData,
    //       FavMovies: favs
    //     }
    //   })
    //   );
    // }}

	render() {
	const {movies, user} = this.state;
	// ;
	// const user = this.props;
	return (
		<Router>
			<NavbarView  />
			<Container>
				<Row className="main-view justify-content-md-center">
						<Route exact path="/" render={() => {
							if (!user) {
									return <Redirect to="/login" />;
							}
							return (
								movies.map(m => (
                  <Col sm={6} key={m.id}>
                    <MovieCard movie={m}  
										/>
                  </Col>
                ))
									// <>
									// 		{movies.map(movie => (
									// 				<Col md={6} key={movie._id}>
									// 						<MovieCard movie={movie}  />
									// 				</Col>
									// 		))}
									// </>
							);
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
										<Col md={4}>
											<MovieView
											movie={movies.find(m => m.id === match.params.movieid)}
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