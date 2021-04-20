import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ACTION } from "../../../../config/config";


/**
 * 
 * @author Attila Barna 
 */
const ProjectRenameDirectory = ( { displayComponent , actionListener, item } ) => {
    const fileName = useRef(null)

    function handleModalSaveEvent(e) {
        const name = fileName.current.value 
        actionListener({type: ACTION.SAVE, data: { file : { name }}})
    }

    function handleModalCloseEvent(e) {
        actionListener({type: ACTION.CANCEL})
    }

    useEffect( () => {
        if ( displayComponent && fileName && fileName.current ) 
            fileName.current.value = item.name

    } , [fileName,item,displayComponent] )

    return ( 
           <Row>
                <Col>
                    <Modal show={displayComponent} size="lg" animation={true}> 
                        <Modal.Header closeButton>
                            <Modal.Title>Rename directory</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                                
                                <Form.Group>
                                        <Form.Label>Rename directory</Form.Label>
                                        <Form.Control ref={fileName}  type="text" placeholder="Directory name" />
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


export default ProjectRenameDirectory;