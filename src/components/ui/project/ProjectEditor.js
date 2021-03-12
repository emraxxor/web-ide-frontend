import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ProjectContext } from "../../../context/ProjectContext";
import TabbedPane from "../tab/TabbedPane";
import RecursiveTree from "../tree/RecursiveTree";

/**
 * 
 * @author Attila Barna 
 */
const ProjectEditor = ( props, children ) => {
    const ctx = useContext(ProjectContext)
    return ( 
            <Row md={12} xs={4} className='mt-5'>
                <Col md={12}>
                    <Row>
                        <Col md={2}>
                            Workdir: {ctx.workdir}
                        </Col>
                        <Col md={10}>
                            #Todo Quick Navigator
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            #Todo Tree Menu
                            <RecursiveTree data={ctx.treeData}></RecursiveTree>
                        </Col>
                        <Col md={10}>
                            <TabbedPane {...props} data={ctx.tabs} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={ctx.addNewTab}>New file</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
    );
    
};


export default ProjectEditor;