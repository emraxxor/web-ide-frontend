import { useContext, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ProjectContext } from "../../../../context/ProjectContext";
import JSONPretty from 'react-json-prettify';
import axios from '../../../../HttpClient';
import Spinner from "../../spinner/Spinner";


/**
 * 
 * @author Attila Barna 
 */
const ProjectCommandDialog = () => {
    const ctx = useContext(ProjectContext)
    const [output, setOutput] = useState(<></>)
    const command = useRef()

    function handleModalCloseEvent(e) {
        ctx.setDisplayProjectCommandDialog(false)
    }

    function onClickRunButton(e) {
        ctx.setProjectSpinner( (<Spinner/>) )
        axios   
        .post(`/api/docker/container/exec`,{
            id : ctx.projectId,
            command : command.current.value
        })
        .then(resp =>  {
            if ( resp.status === 200 ) {
                if ( resp.data.code === 1 ) {
                    ctx.setProjectSpinner((<></>))
                    setOutput( (<JSONPretty json={resp.data.object}/>) )
                    command.current.value = ''
                }
            }
        })
        .catch( err => console.error(err) )
    }
   
    return ( 
          <>
           <Row>
                <Col>
                    <Modal show={ctx.displayProjectCommandDialog} size="lg" animation={true}> 
                        <Modal.Header closeButton onHide={handleModalCloseEvent}>
                            <Modal.Title>Project command dialog</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                                                                
                                <Form.Group>
                                        <Form.Label>Command</Form.Label>
                                        <Form.Control onKeyPress={ e => e.key === 'Enter' ? onClickRunButton(e) : () => {} } ref={command} type="text" placeholder="Command" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={onClickRunButton}>
                                    Run
                                </Button>

                                {output}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleModalCloseEvent}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            </>
    );
    
};


export default ProjectCommandDialog;