import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Form, Row, Alert } from 'react-bootstrap';
import UIErrorHandler from '../handler/ErrorHandler';
import axios from '../../../HttpClient';
import { Redirect } from 'react-router-dom';
import {DefaultFormGenerator, DefaultInputChangeHandler} from '../input/FormInputElement';
 
/**
 * Registration component is responsible for the registration.
 * 
 * @author Attila Barna
 */
class RegistrationComponent extends Component {

    state = {
        error: {
            message: null
        },
        success: null,
        controls: {
            neptun: {
                elementType: 'input',
                label: 'Neptun identifier',
                name: 'neptunId',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Neptun id'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                label: 'E-mail',
                name: 'userMail',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                label: 'Password',
                name: 'userPassword',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            passwordConfirm: {
                elementType: 'input',
                label: 'Confirm password',
                name: 'confirmPassword',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            firstName: {
                elementType: 'input',
                label: 'First name',
                name: 'firstName',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                label: 'Last name',
                name: 'lastName',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        }
    }

    submitHandler = ( event ) => {
        event.preventDefault()
        const data = Object.keys(this.state.controls).flatMap(e => this.state.controls[e]).map( (e,k) => ( { [e.name]: e['value'] } ) )
                    .reduce((acc,curr)=>  (  {...acc,...curr} )   ,{})

        if ( data.userPassword !== data.confirmPassword || !this.state.controls.password.valid    ) {
            this.setState( { ...this.state , ...{ error : {message: 'Invalid password!'} } } )
            return
        }

        axios.post(`/users`, data)
            .then(response => {
                this.setState( { ...this.state , ...{  success: true, error : {message: null} } } )
            })
            .catch(err => {
                this.setState( { ...this.state , ...{ error : {message: 'Username or email is already in use!'} } } )
        });
    }

    updateInputControlState = ( changed ) => {
        this.setState({ ...this.state,  ...{ controls: changed } } )
    }

    render () {
        let errorMessage = null
        const inputChangedHandler = ( event, controlName ) => DefaultInputChangeHandler(event,controlName, this.updateInputControlState , this.state.controls );
        const { form } = DefaultFormGenerator(this.state.controls, inputChangedHandler);

        if (this.state.error.message) {
            errorMessage = ( 
              <Alert variant="danger">
                {this.state.error.message}
              </Alert>
              )
        }

        let authRedirect = null

        if (this.props.isAuthenticated) 
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        
        return (
            <Row md={12} xs={4} className='mt-5'>
              <Col md={12}>
                <Row>
                    <Col>{errorMessage}</Col>
                </Row>
                {  this.state.success ? (
                    <Row>
                        <Col>
                        <Alert variant="success">
                                Registration is completed successfully!
                        </Alert>
                    </Col>
                    </Row>
                ) : null  }
                <Row md={12}>
                    <Col md={12}>
                        <Card>
                            <Card.Header as="h5">Registration</Card.Header>
                            <Card.Body>
                                <Card.Title>Registration</Card.Title>

                                    <Form ref={this.form} onSubmit={this.submitHandler}>
                                        {form}
                                        <Button disabled={form.filter(e => e.props.value === '').length > 0} type="submit">SUBMIT</Button>
                                    </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
              </Col>
              {authRedirect}
            </Row>
        )
    }
}

const states = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath
    }
}


export default connect( states )( UIErrorHandler( RegistrationComponent, axios ) )
