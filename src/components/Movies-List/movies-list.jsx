import React from 'react';
// import Col from 'react-bootstrap/Col';
//import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import VisibilityFilterInput from '../Visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../Movie-Card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return < >
            <Col md={6} id="search-box" ><VisibilityFilterInput visibilityFilter={visibilityFilter} /></Col>
            <Col md={6}></Col>
            {filteredMovies.map(m => (
              <MovieCard movie={m} />
            ))}
    </>;
}

export default connect(mapStateToProps)(MoviesList);