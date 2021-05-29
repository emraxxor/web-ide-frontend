import React, { Component } from 'react';

/**
 * 
 * @param {*} eComponent
 * 
 * @author Attila Barna 
 */
const AsyncComponent = (eComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            eComponent().then(cmp => this.setState({component: cmp.default}));
        }
        
        render () {
            const Comp = this.state.component;
            return Comp ? <Comp {...this.props} /> : null;
        }
    }
}

export default AsyncComponent;