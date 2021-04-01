import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormControl, Modal, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { ACTION } from "../../../config/config";
import { ProjectContext } from "../../../context/ProjectContext";
import { ProjectDialogContext } from "../../../context/ProjectDialogContext";
import Spinner from "../spinner/Spinner";
import JSONPretty from 'react-json-prettify';
import './ProjectNavbar.css'
import axios from '../../../HttpClient';

/**
 * 
 * @author Attila Barna 
 */
const ProjectNavbar = ( {  }) => {
    const ptx = useContext(ProjectContext)
    const ctx = useContext(ProjectDialogContext)

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
        ctx.setDisplayProjectCommandDialog(true)
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
        ctx.setProjectSpinner( (<Spinner></Spinner>) )
        ctx.startProject().then(e => ctx.setProjectSpinner(<></>) )
    }

    return ( 
                    <Navbar bg="dark" variant="dark" className="project-navbar">
                        <Nav className="mr-auto">
                              <NavDropdown title="Project" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={onClickProjectStart}>Start</NavDropdown.Item>
                                <NavDropdown.Item >Stop</NavDropdown.Item>
                                <NavDropdown.Item >Restart</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectProperties}>Properties</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onClickProjectLog}>Project log</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectInspector}>Project inspector</NavDropdown.Item>
                                <NavDropdown.Item onClick={onClickProjectCommandExplorer}>Command explorer</NavDropdown.Item>
                             </NavDropdown>
                        </Nav>
                    </Navbar>
    );
    
};


export default ProjectNavbar;