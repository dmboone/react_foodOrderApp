import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // logic for making sure that if we add more of an already existing item it adds to previous instead of being it's own separate addition
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // seeing if the item exists already in the cart and at what index

    const existingCartItem = state.items[existingCartItemIndex]; // this will be null if the item does not already exist in cart, otherwise it will be the actual item

    let updatedItems;

    if (existingCartItem) { // if item already exists (aka this isn't null)
      const updatedItem = {
        // create new item with updated amount
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      // create new array of items in cart that includes the updated item data
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // else item is brand new and is being added for the first time
      updatedItems = state.items.concat(action.item); // concat returns a brand new array with our new item added, rather than editing the current array which is what push would do (we don't want to do that)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // seeing if the item exists already in the cart and at what index

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1){ // checks if this is the last item of that type
      updatedItems = state.items.filter(item => item.id != action.id); // filters out the item with the matching id from the array
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type === 'CLEAR'){
      return defaultCartState;
  }

  return defaultCartState;
};

// manages the cart context with useState or useReducer (choose which one you want to use to manage state)
// so that we can update the context and as a result update parts of the application
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = (id) => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {" "}
      {/* wrapper for any components that should get access to the CartContext */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
