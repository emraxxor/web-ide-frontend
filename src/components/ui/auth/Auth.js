import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/auth/actions';
import Input from '../input/FormInputElement';
import { Button, Card, Col, Form, Row, Alert } from 'react-bootstrap';
import UIErrorHandler from '../handler/ErrorHandler';
import axios from '../../../HttpClient';
import { checkValidity } from '../../../config/config';

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
    
    inputChangedHandler = ( event, controlName ) => {
        const changed = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        }
        this.setState( { controls: changed } )
    }

    submitHandler = ( event ) => {
        event.preventDefault()
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value )
    }


    render () {
        let errorMessage = null
        const fma = Object.keys( this.state.controls ).map( k => ( { id : k, config: this.state.controls[k] } ) ) 

        let form = fma.map( fm => (
            <Input
                label={fm.config.label}
                key={fm.id}
                elementType={fm.config.elementType}
                elementConfig={fm.config.elementConfig}
                value={fm.config.value}
                invalid={!fm.config.valid}
                shouldValidate={fm.config.validation}
                touched={fm.config.touched}
                changed={( event ) => this.inputChangedHandler( event, fm.id )} />
        ) )

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
