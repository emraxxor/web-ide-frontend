import { Col, Row } from "react-bootstrap";
import { Component } from 'react';
import axios from '../../../HttpClient';
import { connect } from "react-redux";
import UIErrorHandler from "../handler/ErrorHandler";


/**
 * @author Attila Barna
 */
class Home extends Component {

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    render() {
        return (
            <Row md={12} xs={4} className='mt-5'>
              <Col md={12}>
                <Row>
                    <Col>Home</Col>
                </Row>
              </Col>
            </Row>
        );
    }
}


const states = state => {
    return {
        isAuthenticated: state.auth.authenticated
    };
};

const dispatches = dispatch => {
    return {
    };
};

export default connect( states, dispatches )( UIErrorHandler( Home, axios ) );
