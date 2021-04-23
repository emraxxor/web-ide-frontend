import React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import {checkValidity} from "../../../config/config";


export const DefaultInputChangeHandler = (event, controlName, updateEventListener, controls) => {
    const changed = {
        ...controls,
        [controlName]: {
            ...controls[controlName],
            value: event.target.value,
            valid: checkValidity( event.target.value, controls[controlName].validation ),
            touched: true
        }
    }

    updateEventListener( changed );
}

export const DefaultFormDataGenerator = (controls) => {
    return Object.keys( controls ).map( k => ( { id : k, config: controls[k] } ) );
}

export const DefaultFormGenerator = (controls) => {
    let fma = DefaultFormDataGenerator(controls)
    return {
        form : fma.map( fm => (
            <DefaultFormInput
                label={fm.config.label}
                key={fm.id}
                elementType={fm.config.elementType}
                elementConfig={fm.config.elementConfig}
                value={fm.config.value}
                invalid={!fm.config.valid}
                shouldValidate={fm.config.validation}
                touched={fm.config.touched}
                changed={( event ) => this.inputChangedHandler( event, fm.id )} />
        ) ),
        extractedControls: fma
    }
}

/**
 * @author Attila Barna
 * @param {*} props 
 */
export const DefaultFormInput = ( props ) => {
    let element
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
                value={props.value ?? ''}
                isInvalid={invalid}
                onChange={props.changed} />;
            break;
        case ( 'password' ):
                element = <FormControl
                    type="password"
                    className={currclasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value ?? ''}
                    isInvalid={invalid}
                    onChange={props.changed} />;
                break;
        case ( 'textarea' ):
            element = <FormControl
                as="textarea"
                rows={props.rows ?? 3}
                className={currclasses.join(' ')}
                {...props.elementConfig}
                value={props.value ?? ''}
                isInvalid={invalid}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            element = 
                <FormControl
                    as="select" 
                    multiple={props.multiple}
                    className={currclasses.join(' ')}
                    value={props.value ?? ''}
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
                value={props.value ?? ''}
                isInvalid={invalid}
                onChange={props.changed} />;
    }

    return (
        <FormGroup  {...props.groupConfig ?? null}>
            <FormLabel>{props.label}:</FormLabel>
            {element}        
        </FormGroup>
    );

};

