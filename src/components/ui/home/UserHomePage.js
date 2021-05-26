import { Component } from 'react';
import { Button, Card, Col, ListGroup, Row, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from '../../../HttpClient';
import UIErrorHandler from '../handler/ErrorHandler';
import JSONPretty from 'react-json-prettify';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/project/actions';
import * as userActions from '../../../store/auth/actions';
import Spinner from '../spinner/Spinner';

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
        state: 'INIT',
        project : {
            name: '',
        },
        spinner  : null,
        userPanel : null
    }

    constructor(props) {
        super(props)
        this.handleCloseModalWindow = this.handleCloseModalWindow.bind(this)
    }

    componentDidMount() {
         this.setSpinner((<Spinner/>))
         this.props.init()
         this.props.userInfo()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( this.props.state === 'DONE' && this.state.state !== 'DONE' )  {
            this.setSpinner(null)
            this.setState({state:'DONE'})
        }
    }

    onShowProject(project) {
        this.setState({
            ...this.state,
            showProjectModal: true,
            project
        });
    }

    setSpinner(spinner) {
        this.setState({spinner})
    }

    handleCloseModalWindow() {
        this.setState({...this.state,showProjectModal:false})
    }

    render() {
        if ( !this.props.isAuthenticated )
            return (<></>)

        if ( this.props.user && this.state.userPanel == null ) {
            this.setState({userPanel: (
                <>
                    <p>Name: {this.props.user.firstName} {this.props.user.lastName ?? ''}</p>
                    <p>Neptun id: {this.props.user.neptunId}</p>
                    <p>Role: {this.props.user.role}</p>
                    <p>E-mail: {this.props.user.userMail}</p>
                </>
                )
            })
        }

        return (
            <>
            {this.state.spinner}
            <Modal size="xl" show={this.state.showProjectModal} onHide={this.handleCloseModalWindow}>
                <Modal.Header closeButton>
                <Modal.Title>{this.state.project.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NavLink to={{ pathname: `/project/${this.state.project.id}` }}>
                        <Button variant="primary">Open</Button>
                    </NavLink>
                    <JSONPretty json={this.state.project}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseModalWindow}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>


            <Row className={ ["mt-5"] }>
                <Col md="6">
                       <Card>
                            <Card.Header as="h5">User</Card.Header>
                            <Card.Body>
                                <Card.Title>User information</Card.Title>
                            </Card.Body>
                           <Card.Body>
                               {this.state.userPanel}
                           </Card.Body>
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
                                                <ListGroup.Item key={e.identifier} onClick={() => this.onShowProject(e)} ><ProjectItem>{e.name} ( {e.identifier})</ProjectItem></ListGroup.Item>
                                                
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
        isAuthenticated: state.auth.authenticated,
        projects: state.project.projects,
        user: state.auth.user,
        state: state.project.state
    };
};

const dispatches = dispatch => {
    return {
        init: () => dispatch( actions.initProject() ),
        userInfo: () => dispatch(userActions.currentUserInfo())
    };
};

export default connect( states, dispatches )( UIErrorHandler( UserHomePage, axios ) );

