import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/auth/actions';
import {DefaultFormGenerator, DefaultInputChangeHandler} from '../input/FormInputElement';
import { Button, Card, Col, Form, Row, Alert } from 'react-bootstrap';
import UIErrorHandler from '../handler/ErrorHandler';
import axios from '../../../HttpClient';

/**
 * Default authentication component
 * 
 * @author Attila Barna
 */
class Auth extends Component {

    form = React.createRef()

    state = {
        controls: {
            email: {
                elementType: 'input',
                label: 'E-mail',
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
            }
        }
    }

    componentDidMount() {

    }
    
    submitHandler = ( event ) => {
        event.preventDefault()
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value )
    }

    updateInputControlState = ( changed ) => {
        this.setState({ ...this.state,  ...{ controls: changed } } )
    }

    render () {
        let errorMessage = null
        const inputChangedHandler = ( event, controlName ) => DefaultInputChangeHandler(event,controlName, this.updateInputControlState , this.state.controls );
        const { form } = DefaultFormGenerator(this.state.controls, inputChangedHandler );

        if (this.props.error) {
            errorMessage = ( 
              <Alert variant="danger">
                {this.props.error.message}
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
                <Row md={12}>
                    <Col md={12}>
                        <Card>
                            <Card.Header as="h5">Authentication</Card.Header>
                            <Card.Body>
                                <Card.Title>Sign in</Card.Title>

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
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const dispatches = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch(actions.auth( email, password ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect( states, dispatches )( UIErrorHandler( Auth, axios ) )
