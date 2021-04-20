import { Component } from 'react';
import {   Col, ListGroup, Row, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from '../../../../HttpClient';
import UIErrorHandler from '../../handler/ErrorHandler';
import Spinner from '../../spinner/Spinner';
import * as actions from '../../../../store/project/actions';
import { generatePath, Redirect } from 'react-router-dom';
import NewProjectDialogWindow from './dialog/NewProjectDialogWindow'


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
class ProjectBrowser extends Component {

    state = {
        state: 'INIT',
        spinner  : (null),
        redirect: null,
        newProjectDialog: false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
         this.props.fetchProjects()
         this.setSpinner((<Spinner></Spinner>))
    }


    componentDidUpdate() {
        if ( this.props.state === 'DONE' && this.state.state !== 'DONE' )  {
            this.setSpinner((null))
            this.setState({state:'DONE'})
        } else if ( this.props.state === 'FETCH' && this.state.state !== 'FETCH' ) {
            this.setSpinner((<Spinner></Spinner>))
            this.setState({state:'FETCH'})
        } 
        
    }

    onShowProject(project) {
        this.setState({redirect: <Redirect push to={generatePath("/project/:id", {id:project.id})} />  })
    }

    setSpinner(spinner) {
        this.setState({spinner})
    }

    handleCloseModalWindow() {
        this.setState({...this.state,showProjectModal:false})
    }

    handleClickOnNewProject(e) {
        this.setState({...this.state, newProjectDialog: true})
    }

    handleNewProjectModalDialogWindowAction(event) {
        if ( event.action.event.dialog.message === 'close' ) {
            this.setState({...this.state, newProjectDialog: false})
        } else if (  event.action.event.dialog.message === 'created'  ) {
            this.setState({...this.state, newProjectDialog: false})
            this.reloadProjects()
        }
    }

    reloadProjects() {
        this.props.fetchProjects()
    }

    handleDeleteProject(project) {
        this.setSpinner((<Spinner></Spinner>))

        axios  
        .delete(`/api/project/${project.id}`)
        .then(resp =>  {
            if ( resp.status === 200 && resp.data.code === 1 ) {
                this.reloadProjects()
            }
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
            <NewProjectDialogWindow displayComponent={this.state.newProjectDialog} actionListener={e => this.handleNewProjectModalDialogWindowAction(e)}></NewProjectDialogWindow>
            <Row>
                <Col md={12} lg={12} className="mt-5">
                       <Card>
                            <Card.Header as="h5">Projects</Card.Header>
                            <Card.Body>
                                <Card.Title>Active projects</Card.Title>
                                <ListGroup>
                                 {
                                     this.props.projects.map(
                                        (e,ix) =>                     
                                                (            
                                                    (
                                                        <div key={ix} style={ { display: 'flex' } }>          
                                                            <ListGroup.Item key={e.identifier} onClick={() => this.onShowProject(e)}  style={{width:'100%'}}><ProjectItem>{e.name} ( {e.identifier})</ProjectItem></ListGroup.Item>
                                                            <Button><ProjectRemoveItem onClick={x => this.handleDeleteProject(e)}>X</ProjectRemoveItem></Button>
                                                        </div>
                                                    )
                                                )
                                    )
                                 }

                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                 <Button onClick={ (e) => this.handleClickOnNewProject(e)}>New Project</Button>
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
        projects: state.project.projects,
        state: state.project.state
    };
};

const dispatches = dispatch => {
    return {
        fetchProjects: () => dispatch( actions.initProject() )
    };
};

export default connect( states, dispatches )( UIErrorHandler( ProjectBrowser, axios ) );

