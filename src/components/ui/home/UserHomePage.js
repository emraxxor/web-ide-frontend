import { Component } from 'react';
import { Button, Card, Col, ListGroup, Row, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from '../../../HttpClient';
import UIErrorHandler from '../handler/ErrorHandler';
import JSONPretty from 'react-json-prettify';

const ProjectItem = styled.div`
  cursor: pointer;
  overflow: hidden;
`;


/**
 * @author Attila Barna
 */
class UserHomePage extends Component {

    state = {
        showProjectModal: false,
        project : {
            name: '',

        }
    }


    componentDidMount() {
    }


    componentDidUpdate() {
    }

    onShowProject(project) {
        this.setState({
            ...this.state,
            showProjectModal: true,
            project
        });
    }

    handleCloseModalWindow() {
        this.setState({...this.state,showProjectModal:false})
    }

    render() {

        if ( !this.props.isAuthenticated )
            return (<></>)

        return (
            <>
            <Modal size="xl" show={this.state.showProjectModal} onHide={e => this.handleCloseModalWindow()}>
                <Modal.Header closeButton>
                <Modal.Title>{this.state.project.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body><JSONPretty json={this.state.project}/></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={ e => this.handleCloseModalWindow()}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>


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
                            <Card.Header as="h5">Projects</Card.Header>
                            <Card.Body>
                                <Card.Title>Active projects</Card.Title>

                                <ListGroup>
                                 {
                                     this.props.projects.map(
                                        e => 
                                                <ListGroup.Item key={e.identifier} onClick={x => this.onShowProject(e)} ><ProjectItem>{e.name} ( {e.identifier})</ProjectItem></ListGroup.Item>
                                                
                                    )
                                 }
                                </ListGroup>
                               
                            </Card.Body>
                        </Card>
                </Col>
            </Row>
            </>
        )
    }
}



const states = state => {
    return {
        projects: state.project.projects,
    };
};

const dispatches = dispatch => {
    return {};
};

export default connect( states, dispatches )( UIErrorHandler( UserHomePage, axios ) );

