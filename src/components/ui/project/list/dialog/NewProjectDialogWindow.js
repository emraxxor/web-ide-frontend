import { useState } from "react";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import axios from '../../../../../HttpClient';
import Spinner from "../../../spinner/Spinner";
import {DefaultFormDataGenerator, DefaultFormInput, DefaultInputChangeHandler} from "../../../input/FormInputElement";
import { DockerContainerImageOptions } from "../../../../../config/config";


/**
 * 
 * @author Attila Barna 
 */
const NewProjectDialogWindow = ({ displayComponent , actionListener }) => {

    const [controls,setControls] = useState({
            projectName: {
                elementType: 'input',
                label: 'Project name',
                name: 'name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Project name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            imageType: {
                elementType: 'select',
                label: 'Image type',
                name: 'image',
                multiple: false,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Image type',
                    options: DockerContainerImageOptions
                },
                value: 'NPM',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            exposedPort: {
                elementType: 'input',
                label: 'Exposed port',
                name: 'exposed',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Exposed port'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
    })

    const [spinner, setSpinner] = useState(null)

    const handleModalCloseEvent = e => {
        actionListener({action:{
            event: {
                dialog: {
                    message: 'close'
                }
            }
        }})
    }

    const updateForm = e => {
        const data = Object.keys(controls).flatMap(e => controls[e]).map( (e,k) => ( { [e.name]: e['value'] } ) )
        .reduce((acc,curr)=>  (  {...acc,...curr} )   ,{})

        setSpinner( (<Spinner/>)  )

        axios  
        .post(`/api/project`,{
            name: data.name
        })
        .then(resp =>  {
            if ( resp.status === 200 && resp.data.code === 1 ) {
                    setSpinner((<></>))
                    const project = resp.data.object

                    axios  
                    .post(`api/docker/container`,{
                        projectId: project.id,
                        image: data.image,
                        exposed: data.exposed
                    })
                    .then( eresp => {
                        if ( eresp.status === 200  ) {
                            setSpinner((<></>))
                            actionListener({action:{
                                event: {
                                    dialog: {
                                        message: 'created'
                                    }
                                }
                            }})
                        }
                    })
                    .catch( err => console.error(err) )
            }
        })
        .catch( err => console.error(err) )

    }

    const inputChangedHandler = ( event, controlName ) => DefaultInputChangeHandler(event,controlName, setControls , controls);
    const formData = DefaultFormDataGenerator(controls);
   
    return ( 
          <>
           {spinner}
           <Row>
                <Col>
                    <Modal show={displayComponent} size="lg" animation={true}> 
                        <Modal.Header closeButton onHide={handleModalCloseEvent}>
                            <Modal.Title>Project Settings Dialog</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form>
                                
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
                                
                                <Button variant="primary" type="button" onClick={updateForm}>
                                    Create
                                </Button>
                                <Button variant="secondary" type="button" onClick={ e => handleModalCloseEvent(e) } >
                                    Cancel
                                </Button>

                            </form>
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


export default NewProjectDialogWindow;