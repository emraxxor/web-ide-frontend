import { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from '../../../HttpClient';
import UIErrorHandler from '../handler/ErrorHandler';


/**
 * @author Attila Barna
 */
class UserHomePage extends Component {

    componentDidMount() {

    }


    componentDidUpdate() {

    }

    render() {

        if ( !this.props.isAuthenticated )
            return (<></>)

        return (
            <Row>
                <Col md="6">
                       <Card>
                            <Card.Header as="h5">Projects</Card.Header>
                            <Card.Body>
                                <Card.Title>Recent projects</Card.Title>

                               
                            </Card.Body>
                            <Card.Footer>
                                <Button>New project</Button>
                            </Card.Footer>
                        </Card>
                </Col>
                <Col md="6">
                       <Card>
                            <Card.Header as="h5">Containers</Card.Header>
                            <Card.Body>
                                <Card.Title>Active containers</Card.Title>

                               
                            </Card.Body>
                        </Card>
                </Col>
            </Row>
        )
    }
}



const states = state => {
    return {};
};

const dispatches = dispatch => {
    return {};
};

export default connect( states, dispatches )( UIErrorHandler( UserHomePage, axios ) );

