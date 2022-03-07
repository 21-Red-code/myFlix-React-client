import React from 'react';
//import axios from 'axios';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Col } from 'react-bootstrap';

import './movie-card.scss';
export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;
		return (
			<Col sm={8} className="movie-card" >
			  <Card>
				  <Card.Img variant="top" src={movie.ImagePath} />
				  <Card.Body>
				  	<Card.Title>{movie.Title}</Card.Title>
				  	{/* <Card.Text>{movie.Description}</Card.Text> */}
				  	<Link to={`/movies/${movie._id}`}>
				  		<Button variant="primary" >Open</Button>
				  	</Link>
				  </Card.Body>
			  </Card>
			</Col>
		);
	}
}

//MovieCard.propTypes = {
		// movie: PropTypes.shape({
		// 		Title: PropTypes.string.isRequired,
		// 		Description: PropTypes.string.isRequired,
		// 		ImagePath: PropTypes.string.isRequired,
		// 		Genre: PropTypes.shape({
		// 				Name: PropTypes.string.isRequired,
		// 				Description: PropTypes.string.isRequired,
		// 		}).isRequired,
		// 		Director: PropTypes.shape({
		// 				Bio: PropTypes.string.isRequired,
		// 				Birth: PropTypes.string.isRequired,
		// 				Death: PropTypes.string.isRequired,
		// 				Name: PropTypes.string.isRequired,
		// 		}).isRequired,
		// }).isRequired,
		// onMovieClick: PropTypes.func.isRequired
//};