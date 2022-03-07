import React from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

	// keypressCallback(event) {
	// 		console.log(event.key);
	// }
	componentDidMount() {
			// document.addEventListener('keypress', this.keypressCallback);
	}
	// componentWillUnmount() {
	// 		document.removeEventListener('keypress', this.keypressCallback);
	// }
	render() {
		const { movie, onBackClick, addToFav } = this.props;
		return (
			<Container fluid className="moviesContainer">
				<Row>
					<Col>
						<div className="movie-view">
							<div className="movie-poster">
								<img src={movie.ImagePath}/>
							</div>
							<div className="movie-title">
								<span className="label">Title: </span>
								<span className="value">{movie.Title}</span>
							</div>
							<div className="movie-title">
								<span className="label">Year: </span>
								<span className="value">{movie.Year}</span>
							</div>
							<div className="movie-description">
								<span className="label">Description: </span>
								<span className="value">{movie.Description}</span>
							</div>
							<div className="movie-genre">
								<span className="label">Genre: </span>
								<Link to={`/genres/${movie.Genre.Name}`}>
									<Button variant="link">{movie.Genre.Name}</Button>
								</Link>
							</div>
							<div className="movie-director">
								<span className="label">Director: </span>
								<Link to={`/directors/${movie.Director.Name}`}>
									<Button variant="link">{movie.Director.Name}</Button>
								</Link>
							</div>
							<Button id="back-btn" variant="primary" onClick={() => onBackClick(null)}>Back</Button>
							<Button id="like-btn" variant="primary" type="submit" onClick={() => addToFav()}>Like</Button>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}