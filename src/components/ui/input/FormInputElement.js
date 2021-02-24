import React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

/**
 * @author Attila Barna
 * @param {*} props 
 */
const input = ( props ) => {
    let element = null
    let currclasses = props.classes ?? []
    let invalid = false

    if (props.invalid && props.shouldValidate && props.touched) 
        invalid = true
    

    switch ( props.elementType ) {
        case ( 'input' ):
            element = <FormControl
                type="text"
                className={currclasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                isInvalid={invalid}
                onChange={props.changed} />;
            break;
        case ( 'password' ):
                element = <FormControl
                    type="password"
                    className={currclasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    isInvalid={invalid}
                    onChange={props.changed} />;
                break;
        case ( 'textarea' ):
            element = <FormControl
                as="textarea"
                rows={props.rows ?? 3}
                className={currclasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                isInvalid={invalid}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            element = 
                <FormControl
                    as="select" 
                    multiple
                    className={currclasses.join(' ')}
                    value={props.value}
                    isInvalid={invalid}
                    onChange={props.changed}
                >
                        { props.elementConfig.options.map( e => (
                             <option key={e.value} value={e.value}>
                                {e.displayValue}
                             </option>
                         )) }
                </FormControl>
            break;
        default:
            element = <FormControl
                type="text"
                className={currclasses.join(' ')}
                error={invalid}
                {...props.elementConfig}
                value={props.value}
                isInvalid={invalid}
                onChange={props.changed} />;
    }

    return (
        <FormGroup  {...props.groupConfig}>
            <FormLabel>{props.label}:</FormLabel>
            {element}        
        </FormGroup>
    );

};

export default input;