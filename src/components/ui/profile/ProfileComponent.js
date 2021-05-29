import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Row, Alert } from 'react-bootstrap';
import UIErrorHandler from '../handler/ErrorHandler';
import axios from '../../../HttpClient';
import { checkValidity } from '../../../config/config';
import { DefaultFormInput } from '../input/FormInputElement';
import Spinner from '../spinner/Spinner';
 
/**
 * Profile component is responsible for modifying user data..
 * 
 * @author Attila Barna
 */
class ProfileComponent extends Component {

    state = {
        error: {
            message: null
        },
        userData : null,
        userDataState: 'INIT',
        state : 'INIT',
        spinner  : null,
        success: null,
        password: {
            userMail: {
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
            oldPassword: {
                elementType: 'input',
                label: 'Old password',
                name: 'oldUserPassword',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Old Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
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
                    required: false,
                    minLength: 6
                },
                valid: true,
                touched: false
            },
            passwordConfirm: {
                elementType: 'input',
                label: 'Confirm password',
                name: 'confirmUserPassword',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                value: '',
                validation: {
                    required: false,
                    minLength: 6
                },
                valid: true,
                touched: false
            },
        },
        profile: {
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
            },
            address: {
                elementType: 'input',
                label: 'Address',
                name: 'address',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            city: {
                elementType: 'input',
                label: 'City',
                name: 'city',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            state: {
                elementType: 'input',
                label: 'State',
                name: 'state',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            zip: {
                elementType: 'input',
                label: 'Zip',
                name: 'zip',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            }
        }
    }


   componentDidMount() {
       this.fetchUserInfo();
   }


   componentDidUpdate(prevProps, prevState, snapshot) {
       if ( this.state.state === 'DONE' && this.state.state !== 'END')  {
           this.setSpinner(null)
           this.setState({state:'END'})
       } else if ( this.state.state === 'FETCH' ) {
           this.setSpinner((<Spinner/>))
           this.setState({state:'LOADING'});
       }

       if ( this.state.userData != null && this.state.userDataState !== 'END' ) {
           const changed = {
               profile: this.state.profile,
               password: this.state.password
           }

           Object.keys(this.state.userData).forEach( e => {
                if ( this.state.profile[e]  ) 
                    changed['profile'][e] = { 
                        ...changed['profile'][e],
                        value : this.state.userData[e],
                        valid: true,
                        touched: true
                    }

                if ( this.state.password[e]  ) {
                    changed['password'][e] = { 
                        ...changed['password'][e],
                        value : this.state.userData[e],
                        valid: true,
                        touched: true
                    }
                }
           });

           this.setState({userDataState: 'END'})
       }
   }

   fetchUserInfo() {
        this.setState({state:'FETCH'});
        axios
            .get('/api/user/info')
            .then(res => {
                this.setState({ userData: res.data, state:'DONE'})
            })
            .catch(err => console.error(err))
   }

   setSpinner(spinner) {
       this.setState({spinner});
   }

   inputChangedHandler = ( event, controlName , controls, controlsName ) => {
        const changed = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state[controlsName][controlName].validation ),
                touched: true
            }
        }

        this.setState({ ...this.state,  ...{ [controlsName]: changed } } )
    }

    handleForm = ( controls , api ) => {
        this.setSpinner((<Spinner/>))
        this.setState({success:false})

        const data = Object.keys(controls)
                           .flatMap(e => controls[e])
                           .map( (e,k) => ( { [e.name]: e['value'] } ) )
                           .reduce((acc,curr)=>  (  {...acc,...curr} )   ,{}) ;     

        axios.put(api, data)
                .then(response => {
                    if ( response.data && response.data.code === 1 ) {
                        this.setState( { ...this.state , ...{ success: true, error : {message: null} } } )
                    } else {
                        this.setState( { ...this.state , ...{ error : {message: 'Invalid data!'} } } )
                    }
                    this.setSpinner(null)
                })
                .catch(err => {
                    this.setState( { ...this.state , ...{ error : {message: 'Invalid data!'} }}); 
                    this.setSpinner(null);
                });
        
    }


    render () {
        let errorMessage = null

        const profileFormData = Object.keys( this.state.profile )
                                      .map( k => ( { id : k, config: this.state.profile[k] } ) ); 
        
        const passwordFormData = Object.keys( this.state.password )
                                       .map( k => ( { id : k, config: this.state.password[k] } ) ); 
     
        const profileForm = profileFormData.map( fm => (
            <DefaultFormInput
                label={fm.config.label}
                key={fm.id}
                elementType={fm.config.elementType}
                elementConfig={fm.config.elementConfig}
                value={fm.config.value}
                invalid={!fm.config.valid}
                shouldValidate={fm.config.validation}
                touched={fm.config.touched}
                changed={( event ) => this.inputChangedHandler( event, fm.id , this.state.profile, 'profile' )} />
        ) )

        const passwordForm = passwordFormData.map( fm => (
            <DefaultFormInput
                label={fm.config.label}
                key={fm.id}
                elementType={fm.config.elementType}
                elementConfig={fm.config.elementConfig}
                value={fm.config.value}
                invalid={!fm.config.valid}
                shouldValidate={fm.config.validation}
                touched={fm.config.touched}
                changed={( event ) => this.inputChangedHandler( event, fm.id , this.state.password, 'password' )} />
        ) )

        if (this.state.error.message) {
            errorMessage = ( 
              <Alert variant="danger" className="mt-5">
                {this.state.error.message}
              </Alert>
              )
        }


        return (
            <>
               {this.state.spinner}
                <Row>
                    <Col>{errorMessage}</Col>
                </Row>
                {  this.state.success ? (
                    <Row className="mt-5">
                        <Col>
                        <Alert variant="success">
                               Data updated successfully!
                        </Alert>
                    </Col>
                    </Row>
                ) : null  }

                <Row md={12} xs={4} className='mt-3'>
                <Col md={6}>
                    <Row md={12}>
                        <Col md={12}>
                            <Card>
                                <Card.Header as="h5">Profile</Card.Header>
                                <Card.Body>
                                    <Card.Title>Profile modification</Card.Title>
                                    {profileForm}
                                    <Button onClick={e => this.handleForm(this.state.profile, `/api/user/profile`) } disabled={profileForm.filter(e => e.props.invalid).length > 0} type="primary">UPDATE</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row md={12}>
                        <Col md={12}>
                            <Card>
                                <Card.Header as="h5">Password</Card.Header>
                                <Card.Body>
                                    <Card.Title>Password modification</Card.Title>
                                    {passwordForm}
                                    <Button onClick={e => this.handleForm(this.state.password, `/api/user/personal`) } disabled={passwordForm.filter(e => e.props.invalid).length > 0} type="primary">UPDATE</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                </Row>
            </>
        )
    }

}

const states = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect( states )( UIErrorHandler( ProfileComponent , axios ) )
