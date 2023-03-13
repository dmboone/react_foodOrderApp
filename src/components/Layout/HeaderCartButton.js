import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);

    // reduce is a built in method that allows us to transform an array of data into a single value
    // takes in a function (which receives the current number, and the current item it's looking at) and a starting value (0)
    // the current number is a value carried along each execution of the function for each item in the array
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0); 

    return(
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;