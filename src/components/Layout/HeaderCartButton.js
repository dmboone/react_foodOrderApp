import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    // reduce is a built in method that allows us to transform an array of data into a single value
    // takes in a function (which receives the current number, and the current item it's looking at) and a starting value (0)
    // the current number is a value carried along each execution of the function for each item in the array
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const { items } = cartCtx; // pulling out just the items from cartCtx

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`; // bump class only added if btn is highlighted

    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => { // setBtnIsHighlighted back to false after the animation runs (takes 300 ms) and therefore removes the bump class again
            setBtnIsHighlighted(false);
        }, 300);

        return () => {// clean up function to remove previous timer in case btnIsHiglighted rapidly
            clearTimeout(timer);
        };

    }, [items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;