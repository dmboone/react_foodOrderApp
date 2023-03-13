import React from 'react';

const CartContext = React.createContext({ 
    items: [], // this is all default data that won't actually be used, but it will give us better auto-completion
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});

export default CartContext;