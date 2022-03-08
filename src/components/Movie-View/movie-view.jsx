import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

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

  addToFav(movie) {
		const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
		const MovieId = movie._id
    let url = `https://good-movies-origin.herokuapp.com/users/${Username}/${MovieId}`;
    // let url = "https://good-movies-origin.herokuapp.com/users/" + localStorage.getItem('user')
      // + movie._id;
    console.log(url);
    axios
        .put(url, {}, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            alert("Movie was added to favorites");
						console.log(movie)
        });
    }
		
	render() {
		const { movie, onBackClick } = this.props;
		return (

			
			<Container fluid="lg" className="moviesContainer">
				<Row>
				  <Col lg="auto">
					  <div className="movie-poster">
					    	<img src={movie.ImagePath} />
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
									{movie.Genre.Name}
					    		{/* <Button variant="link">{movie.Genre.Name}</Button> */}
					    	</Link>
					    </div>
					    
					    <div className="movie-director">
					    	<span className="label">Director: </span>
					    	<Link to={`/directors/${movie.Director.Name}`}>
									{movie.Director.Name}
					    		{/* <Button variant="link">{movie.Director.Name}</Button> */} 
					    	</Link>
					    </div>
					  </Col>
				    <Col lg="auto">
						  <Button id="back-btn" variant="primary" onClick={() => onBackClick(null)}>Back</Button>
					    <Button id="like-btn" variant="primary" type="submit" onClick={() => this.addToFav(movie)}>Like</Button>
					  </Col>
					</Row>
			</Container>
		);
	}
}