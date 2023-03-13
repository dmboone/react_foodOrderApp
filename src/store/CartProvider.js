import CartContext from "./cart-context";
import { useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedItems = state.items.concat(action.item); // concat returns a brand new array with our new item added, rather than editing the current array which is what push would do (we don't want to do that)
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    else{

    }

    return defaultCartState;
};

// manages the cart context with useState or useReducer (choose which one you want to use to manage state) 
// so that we can update the context and as a result update parts of the application
const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return(
        <CartContext.Provider value={cartContext}> {/* wrapper for any components that should get access to the CartContext */}
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;