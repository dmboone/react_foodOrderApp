import classes from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => { // forwardRef allows us to get access to Input component using refs
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/> {/* spread operator ensures all key-value pairs in this input object which we receive on props.input are added as props to input */}
        </div>
    );
});

export default Input;