import { useContext,  useState } from "react";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { ProjectContext } from "../../../../context/ProjectContext";

import axios from '../../../../HttpClient';
import Spinner from "../../spinner/Spinner";
import {DefaultFormDataGenerator, DefaultFormInput, DefaultInputChangeHandler} from "../../input/FormInputElement";
import { checkValidity } from "../../../../config/config";
import { useSelector } from "react-redux";


/**
 * 
 * @author Attila Barna 
 */
const ProjectSettingsDialogWindow = ({ displayComponent , actionListener }) => {
    const ctx = useContext(ProjectContext)
    const currentProject = useSelector( state => state.project.currentProject )

    const [controls,setControls] = useState({
            name: {
                elementType: 'input',
                label: 'Project name',
                name: 'name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Project name'
                },
                value: currentProject.project.name,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
    })

    const handleModalCloseEvent = e => {
        ctx.setProjectSettingsDialogWindow(false)
    }

    const updateForm = e => {
        const data = Object
                        .keys(controls)
                        .flatMap(e => controls[e])
                        .map( (e,k) => ( { [e.name]: e['value'] } ) )
                        .reduce((acc,curr)=>  (  {...acc,...curr} )   ,{})

        ctx.setProjectSpinner( (<Spinner/>) )

        axios  
        .put(`/api/project/rename/${ctx.projectId}`,data)
        .then(resp =>  {
            if ( resp.status === 200 && resp.data.code === 1 ) {
                    ctx.setProjectSpinner((<></>))
                    ctx.setProjectSettingsDialogWindow(false)
            }
        })
        .catch( err => console.error(err) )
    }


    const inputChangedHandler = ( event, controlName ) => DefaultInputChangeHandler(event,controlName, setControls, controls);
    const formData = DefaultFormDataGenerator(controls);

    return ( 
          <>
           <Row>
                <Col>
                    <Modal show={ctx.projectSettingsDialogWindow} size="lg" animation={true}> 
                        <Modal.Header closeButton onHide={handleModalCloseEvent}>
                            <Modal.Title>Project Settings Dialog</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                                
                                {
                                    formData.map( fm => (
                                        <DefaultFormInput
                                            label={fm.config.label}
                                            key={fm.id}
                                            elementType={fm.config.elementType}
                                            elementConfig={fm.config.elementConfig}
                                            value={fm.config.value}
                                            invalid={!fm.config.valid}
                                            shouldValidate={fm.config.validation}
                                            touched={fm.config.touched}
                                            changed={( event ) => inputChangedHandler( event, fm.id )} />
                                    ) )
                                }
                                
                                <Button variant="primary" type="submit" onClick={ e => updateForm(e)}>
                                    Save
                                </Button>
                                <Button variant="secondary" type="button" onClick={ e => handleModalCloseEvent(e) } >
                                    Cancel
                                </Button>

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


export default ProjectSettingsDialogWindow;