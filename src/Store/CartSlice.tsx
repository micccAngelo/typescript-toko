import { createSlice } from '@reduxjs/toolkit';

interface CartSlice {
    cartItems: any[]
}

const initialState: CartSlice = {
    cartItems: [],
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            console.log(item)
            const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
            console.log(existingItem)
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push({ ...item, quantity: 1});
                console.log(state.cartItems)
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const cartItem = state.cartItems.find((cartItem) => cartItem.id === id);
            if (cartItem) {
              cartItem.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const cartItem = state.cartItems.find((cartItem) => cartItem.id === id);
            if (cartItem) {
              cartItem.quantity--;
              if (cartItem.quantity === 0) {
                state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
              }
            }
        },
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = CartSlice.actions;

export default CartSlice.reducer;