import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ACTION } from "../../../../config/config";
import { ProjectContext } from "../../../../context/ProjectContext";
import Spinner from "../../spinner/Spinner";


/**
 * 
 * @author Attila Barna 
 */
const ProjectCreateNewDirectory = () => {
    const fileName = useRef()
    const projectContext = useContext(ProjectContext)

    function handleModalSaveEvent(e) {
        const name = fileName.current.value 
        projectContext.setProjectSpinner( (<Spinner></Spinner>) )
        projectContext.createProjectDirectory(name)
        .then( e => {
            projectContext.setProjectSpinner(null)
            projectContext.setDisplayNewDirectoryDialog(false)
        })
        .catch(err => projectContext.setProjectSpinner(null))
    }

    function handleModalCloseEvent(e) {
        projectContext.setDisplayNewDirectoryDialog(false)
    }

    return ( 
           <Row>
                <Col>
                    <Modal show={projectContext.displayNewDirectoryDialog} size="lg" animation={true}> 
                        <Modal.Header closeButton>
                            <Modal.Title>New file</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                                
                                <Form.Group>
                                        <Form.Label>Directory name:</Form.Label>
                                        <Form.Control ref={fileName} type="text" placeholder="Directory name" />
                                </Form.Group>


                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleModalSaveEvent}>Save</Button>
                            <Button variant="secondary" onClick={handleModalCloseEvent}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
    );
    
};


export default ProjectCreateNewDirectory;