import styled from 'styled-components';
import axios from '../../../../HttpClient';
import Spinner from '../../../ui/spinner/Spinner';
import UIErrorHandler from '../../handler/ErrorHandler';
import JSONPretty from 'react-json-prettify';
import {Col, ListGroup, Row, Card, Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Component } from 'react';

const ProjectItem = styled.div`
  cursor: pointer;
  overflow: hidden;
`;

const ProjectRemoveItem = styled.div`
  cursor: pointer;
  overflow: hidden;
`;

/**
 * @author Attila Barna
 */
class AdminProjectBrowser extends Component {

    state = {
        state: 'INIT',
        spinner  : null,
        redirect: null,
        project: {
            name: ''
        },
        projects: [],
        showProjectModal: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
         this.fetchProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( this.state.state === 'END_FETCH' && this.state.state !== 'DONE' )  {
            this.setSpinner(null)
            this.setState({state:'DONE'})
        } else if ( this.state.state === 'START_FETCH' && this.state.state !== 'FETCH' ) {
            this.setSpinner((<Spinner/>))
            this.setState({state:'FETCH'})
        } 
    }
    
    fetchProjects() {
        this.setState({state:'START_FETCH'})

        axios  
            .get(`/api/project`)
            .then(e => {
                this.setState({projects: e.data.object, state:'END_FETCH'})
            })
            .catch(e => console.error(e))
    }

    onShowProject(project) {
        this.setState({...this.state, project, showProjectModal:true});
    }

    setSpinner(spinner) {
        this.setState({spinner})
    }

    handleCloseModalWindow() {
        this.setState({...this.state,showProjectModal:false})
    }

    reloadProjects() {
        this.fetchProjects()
    }

    handleDeleteProject(project) {
        this.setSpinner((<Spinner/>))

        axios  
        .delete(`/api/project/admin/${project.id}`)
        .then(resp =>  {
            if ( resp.status === 200 && resp.data.code === 1 )
                this.reloadProjects()
        })
        .catch( err => console.error(err) )
    }

    render() {

        if ( !this.props.isAuthenticated )
            return (<></>)

        if ( this.state.redirect )
            return this.state.redirect
      
        return (
            <>
            {this.state.spinner}
            <Modal size="xl" show={this.state.showProjectModal} onHide={()=>this.handleCloseModalWindow()}>
                <Modal.Header closeButton>
                <Modal.Title>{this.state.project.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JSONPretty json={this.state.project}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.handleCloseModalWindow()}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col md={12} lg={12} className="mt-5">
                       <Card>
                            <Card.Header as="h5">Projects</Card.Header>
                            <Card.Body>
                                <Card.Title>Projects</Card.Title>
                                <ListGroup>
                                 {
                                     this.state.projects.map(
                                        (e,ix) =>                     
                                                (            
                                                    (
                                                        <div key={ix} style={ { display: 'flex' } }>          
                                                            <ListGroup.Item key={e.identifier} onClick={() => this.onShowProject(e)}  style={{width:'100%'}}><ProjectItem>{e.name} ( {e.identifier})</ProjectItem></ListGroup.Item>
                                                            <Button><ProjectRemoveItem onClick={() => this.handleDeleteProject(e)}>X</ProjectRemoveItem></Button>
                                                        </div>
                                                    )
                                                )
                                    )
                                }
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                            </Card.Footer>
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
    };
};

export default connect( states )( UIErrorHandler( AdminProjectBrowser, axios ) );

