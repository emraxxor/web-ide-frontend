import React, { Component } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';


/**
 * Default error handler for ui components
 * 
 * @param {*} WComponent 
 * @param {*} axios
 * 
 * 
 * @author Attila Barna 
 */
const UIErrorHandler = ( WComponent, axios ) => {

    return class extends Component {
        state = {
            error: null
        }

        componentDidUpdate () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <Row>
                    <Col>
                        <Modal show={this.state.error??false} modalClosed={this.errorConfirmedHandler} >
                            <Modal.Header closeButton>
                                <Modal.Title>Error</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p> {this.state.error ? this.state.error.message : null} </p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="primary" onClick={this.errorConfirmedHandler}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <WComponent {...this.props} />
                    </Col>
                </Row>
            );
        }
    }
}

export default UIErrorHandler;