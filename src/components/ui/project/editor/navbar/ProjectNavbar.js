import { useContext, useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ProjectContext } from "../../../../../context/ProjectContext";
import { ProjectDialogContext } from "../../../../../context/ProjectDialogContext";
import Spinner from "../../../spinner/Spinner";
import JSONPretty from 'react-json-prettify';
import './ProjectNavbar.css'
import axios from '../../../../../HttpClient';
import { useSelector } from "react-redux";
import {store} from "../../../../../store/store"
import { actionInitProject, actionRenewProject } from "../../../../../store/project/actions";

/**
 * 
 * @author Attila Barna 
 */
const ProjectNavbar = ( {  }) => {
    
    const ptx = useContext(ProjectContext)
    const ctx = useContext(ProjectDialogContext)
    const [navbarInit, setNavbarInit] = useState(false)
    const [projectInspectedData, setProjectInspectedData] = useState({})
    const currentProject = useSelector(state => state.project.currentProject )
    const browserData = ptx.browserData

    const onClickProjectProperties = (e) => {
        ptx.setProjectSpinner( (<Spinner></Spinner>) )
        axios   
        .get(`/api/project/container/${ptx.projectId}`)
        .then(resp =>  {
            if ( resp.status === 200 ) {
                if ( resp.data.code === 1 ) {
                    ptx.setProjectSpinner((<></>))
                    ctx.setTitle('Project properties')
                    ctx.setContent((<JSONPretty json={resp.data.object}/>) )
                    ctx.setDisplay(true)
                }
            }
        })
        .catch( err => console.error(err) )
    }

    const onClickProjectCommandExplorer = (e) => {
        ptx.setDisplayProjectCommandDialog(true)
    }

    const onClickProjectLog = (e) => {
        ptx.setProjectSpinner( (<Spinner></Spinner>) )
        axios   
        .get(`/api/project/log/${ptx.projectId}`)
        .then(resp =>  {
            if ( resp.status === 200 ) {
                if ( resp.data.code === 1 ) {
                    ptx.setProjectSpinner((<></>))
                    ctx.setTitle('Project log')
                    ctx.setContent((<JSONPretty json={resp.data.object}/>) )
                    ctx.setDisplay(true)
                }
            }
        })
        .catch( err => console.error(err) )
    }


    const onClickProjectSettings = (e) => {
        ptx.setProjectSettingsDialogWindow(true)
    }

    const onClickProjectInspector = (e) => {
        ptx.setProjectSpinner( (<Spinner></Spinner>) )
        axios   
        .get(`/api/project/inspect/${ptx.projectId}`)
        .then(resp =>  {
            if ( resp.status === 200 ) {
                if ( resp.data.code === 1 ) {
                    ptx.setProjectSpinner((<></>))
                    ctx.setTitle('Project inspector')
                    ctx.setContent((<JSONPretty json={resp.data.object}/>) )
                    ctx.setDisplay(true)
                }
            }
        })
        .catch( err => console.error(err) )

    }

    const onClickProjectStart = (e) => {
        ptx.setProjectSpinner( (<Spinner></Spinner>) )
        ptx.startProject().then(e => ptx.setProjectSpinner(<></>) )
    }

    const onClickProjectRestart = e => {
        ptx.setProjectSpinner( (<Spinner></Spinner>) )
        axios   
        .get(`/api/project/restart/${ptx.projectId}`)
        .then(resp =>  {
            if ( resp.status === 200 && resp.data.code === 1 ) {
                ptx.setProjectSpinner( (<></>) )
            }
        }) 
        .catch( err => console.error(err))       
    }

    const onClickProjectStop = e => {
        ptx.setProjectSpinner( (<Spinner></Spinner>) )
        axios   
        .get(`/api/project/stop/${ptx.projectId}`)
        .then(resp =>  {
            if ( resp.status === 200 && resp.data.code === 1 ) {
                ptx.setProjectSpinner( (<></>) )
            }
        }) 
        .catch( err => console.error(err))       
    }

    const onClickProjectRefresh = e => {
        store.dispatch(actionRenewProject(ptx.projectId));
    }

    const openProjectInBrowser = (e) => {
        if ( currentProject && currentProject.project && currentProject.project.containerElement ) {
            ptx.setBrowserData(null)
            ptx.setProjectSpinner( (<Spinner></Spinner>) )
            axios   
            .get(`/api/project/inspect/${ptx.projectId}`)
            .then(resp =>  {
                if ( resp.status === 200 ) {
                    if ( resp.data.code === 1 ) {
                        ptx.setProjectSpinner( (<></>) )
                        setProjectInspectedData(resp.data.object)
                    }
                }
            })        
        }
    }

    const onClickBrowserRun = (e) => {
        openProjectInBrowser(e)
    }

    useEffect( () => {
        if ( currentProject && currentProject.project && currentProject.project.containerElement ) {
            if ( !navbarInit ) {
                ptx.setProjectSpinner( (<Spinner></Spinner>) )
                axios   
                .get(`/api/project/inspect/${ptx.projectId}`)
                .then(resp =>  {
                    if ( resp.status === 200 ) {
                        if ( resp.data.code === 1 ) {
                            ptx.setProjectSpinner( (<></>) )
                            setProjectInspectedData(resp.data.object)
                        }
                    }
                })        

                setNavbarInit(true)
            }

        }

        if ( currentProject && currentProject.project  ) {
            const element = document.createElement("div")
            element.setAttribute("id","project-init")
            element.setAttribute("project", JSON.stringify(currentProject) )

            if ( ! document.querySelector("#project-init") ) {
                document.body.appendChild(element)
            } else {
                document.querySelector("#project-init").setAttribute("project", JSON.stringify(currentProject))
            }
        }

    },  [currentProject, browserData, navbarInit] )






    setTimeout( () => {
            if ( !document.querySelector("#project-init") ) {
                store.dispatch(actionRenewProject(ptx.projectId));
            } else {
                const element = document.querySelector("#project-init")
                const data = JSON.parse(element.getAttribute("project"))
                if ( !data.project || !data.project.name ) {
                    store.dispatch(actionRenewProject(ptx.projectId));
                }
            }
    } , 300 )

    useEffect( () => {
        if ( projectInspectedData && projectInspectedData.State && projectInspectedData.State.Status === 'running' ) {
            ptx.setBrowserData(projectInspectedData)
        }
    }, [projectInspectedData] )


    return ( 
                    <Navbar id="navbar" bg="dark" variant="dark" className="project-navbar">
                        <Nav className="mr-auto">
                             <NavDropdown title="Project" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={onClickProjectStart}>Start</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectRefresh}>Refresh</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectRestart}>Restart</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectStop}>Stop</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectProperties}>Properties</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onClickProjectSettings}>Project Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectLog}>Project log</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectInspector}>Project inspector</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectCommandExplorer}>Command explorer</NavDropdown.Item>
                             </NavDropdown>
                             <NavDropdown title="Browser" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={onClickBrowserRun}>Run</NavDropdown.Item>
                             </NavDropdown>
                        </Nav>
                    </Navbar>
    );
    
};


export default ProjectNavbar;