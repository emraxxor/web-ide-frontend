import { useContext} from "react";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { ProjectContext } from "../../../../context/ProjectContext";
import { ProjectDialogContext } from "../../../../context/ProjectDialogContext";

/**
 * 
 * @author Attila Barna 
 */
const ProjectDialogWindow = () => {
    useContext(ProjectContext);
    const ctx = useContext(ProjectDialogContext)

    function handleModalCloseEvent(e) {
        ctx.setDisplay(false)
    }

    return ( 
          <>
           <Row>
                <Col>
                    <Modal show={ctx.display} size="lg" animation={true}> 
                        <Modal.Header closeButton onHide={ e => ctx.setDisplay(false) }>
                            <Modal.Title>{ctx.title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {ctx.content}
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


export default ProjectDialogWindow;