import { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ProjectContext } from "../../../context/ProjectContext";
import TabbedPane from "../tab/TabbedPane";
import RecursiveTree from "../tree/RecursiveTree";
import idGenerator from "react-id-generator";
import CodeEditor from "./CodeEditor";
import ProjectNavbar from "./ProjectNavbar";
import Spinner from "../spinner/Spinner";
import ProjectCommandDialog from "./command/ProjectCommandDialog";
import ProjectDialogWindow from "./dialog/ProjectDialogWindow";
import ProjectDialogContextProvider from "../../../context/ProjectDialogContext";

/**
 * 
 * @author Attila Barna 
 */
const ProjectEditor = ( props, children ) => {
    const ctx = useContext(ProjectContext)

    const addNewTab = e => {
        ctx.addNewTab({
            type: 'component',
            title: 'New file',
            saved: false,
            componentId: idGenerator(),
            item: {
                saved: false
            },
            eventKey: 'editor',
            component: ( <CodeEditor {...props} item={ {saved: false} } value='' /> )
        })
    }



    return ( 
        <ProjectDialogContextProvider>
                {ctx.projectSpinner}
                <ProjectCommandDialog></ProjectCommandDialog>
                <ProjectDialogWindow></ProjectDialogWindow>
                <Row md={12} xs={4} className='mt-5'>
                    <Col md={12}>
                        <Row>
                            <Col md={2}>
                                Workdir: {ctx.workdir}
                            </Col>
                            <Col md={10}>
                                <ProjectNavbar></ProjectNavbar>
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
                                <Button onClick={addNewTab}>New file</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </ProjectDialogContextProvider>
    );
    
};


export default ProjectEditor;