import classes from './Input.module.css';

const Input = props => {
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input}/> {/* spread operator ensures all key-value pairs in this input object which we receive on props.input are added as props to input */}
        </div>
    );
};

export default Input;