import { useContext, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ProjectContext } from "../../../../context/ProjectContext";
import TabbedPane from "../../tab/TabbedPane";
import RecursiveTree from "../../tree/RecursiveTree";
import idGenerator from "react-id-generator";
import CodeEditor from "./CodeEditor";
import ProjectNavbar from "./navbar/ProjectNavbar";
import ProjectCommandDialog from "../command/ProjectCommandDialog";
import ProjectDialogWindow from "../dialog/ProjectDialogWindow";
import ProjectDialogContextProvider from "../../../../context/ProjectDialogContext";
import 'react-reflex/styles.css'
import './ProjectEditor.css';
import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from 'react-reflex'
import Browser from "../browser/ProjectBrowserComponent";
import ProjectSettingsDialogWindow from "../dialog/ProjectSettingsDialogWindow";
import ProjectCreateNewDirectory from "./ProjectCreateNewDirectory";
import ProjectRenameDirectory from "./ProjectRenameDirectory";
  
/**
 * 
 * @author Attila Barna 
 */
const ProjectEditor = ( props) => {
    const ctx = useContext(ProjectContext)
    const browser = useRef(null)

    const handleClickOnNewTab = e => {
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

    const handleClickOnNewFolder = e => {
       ctx.setDisplayNewDirectoryDialog(true)
    }

    return ( 
        <ProjectDialogContextProvider>
                {ctx.projectSpinner}

                <ProjectCreateNewDirectory/>
                <ProjectSettingsDialogWindow/>
                <ProjectCommandDialog/>
                <ProjectDialogWindow/>
                <ProjectRenameDirectory/>

                <Row md={12} xs={4} className='mt-5'>
                    <Col md={12}>
                        <Row>
                            <Col md={2}>
                                Workdir: {ctx.workdir}
                            </Col>
                            <Col md={10}>
                                <ProjectNavbar/>
                            </Col>
                        </Row>
                        <Row>

                            <Col md={2}>
                                <RecursiveTree data={ctx.treeData}/>
                                {/*<Button variant="primary" onClick={e => ctx.refreshDirectory()}>Refresh</Button>*/}
                            </Col>
                            <Col md={10}>
                                 <ReflexContainer orientation="vertical">

                                      <ReflexElement className="left-pane" minSize="300">
                                            <TabbedPane {...props} data={ctx.tabs} /> 
                                      </ReflexElement>

                                      <ReflexSplitter/>

                                      <ReflexElement className="right-pane" minSize="300">
                                         <Browser ref={browser} theme={"dark"} />
                                      </ReflexElement>

                                 </ReflexContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={handleClickOnNewTab}>New file</Button>
                                <Button onClick={handleClickOnNewFolder}>New folder</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </ProjectDialogContextProvider>
    );
    
};


export default ProjectEditor;