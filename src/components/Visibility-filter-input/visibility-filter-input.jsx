import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return <Row>
      <Col>
        <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search"
        />
      </Col>
    </Row>
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);