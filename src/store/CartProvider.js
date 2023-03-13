import CartContext from "./cart-context";

// manages the cart context with useState or useReducer so that we can update the 
// context and as a result update parts of the application
const CartProvider = props => {
    const addItemToCartHandler = item => {};

    const removeItemFromCartHandler = id => {};

    const cartContext = {
        items: [],
        totalAmount: 0,
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