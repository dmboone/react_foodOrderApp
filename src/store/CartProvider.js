import CartContext from "./cart-context";

// This file will manage cart context data and provide that context to all components that need access to it
const CartProvider = props => {
    const addItemToCartHandler = item => {
         
    };

    const removeItemFromCartHandler = id => {

    };
    
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler, 
    };
    
    return(
        // this will be like a wrapper around any component that needs access to the cart context
        <CartProvider value={cartContext}>
            {props.children}
        </CartProvider>
    );
};

export default CartProvider;


