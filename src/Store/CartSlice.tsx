import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cart, CartState } from "../Model/Interface/CartInterface";

const initialState: CartState = {
  cartItems: [],
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    cartAdded: {
      reducer(state, action: PayloadAction<Cart>) {
        const itemExist = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (itemExist >= 0) {
          state.cartItems[itemExist] = {
            ...state.cartItems[itemExist],
            quantity: state.cartItems[itemExist].quantity + 1,
          };
        } else {
          state.cartItems.push(action.payload);
        }
      },
      prepare(id, title, description, price, stock, images) {
        return {
          payload: {
            id, title, description, price, stock, images,
            quantity: 1,
          },
        };
      },
    },

    deleteCart(state, action: PayloadAction<number>) {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      state.cartItems = updatedCartItems;

      alert("product removed");
    },

    quantityIncreased(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((cart) => cart.id === id);

      if (existingItem) {
        existingItem.quantity++;
      }
    },
    quantityDecreased(state, action: PayloadAction<number>) {
        const id = action.payload;
        const existingItem = state.cartItems.find((cart) => cart.id === id);
      
        if (existingItem) {
          if (existingItem.quantity > 1) {
            existingItem.quantity--;
          } else {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            alert("product removed");
          }
        }
      },
  },
});

export const selectAllCarts = (state: { carts: CartState }) => state.carts.cartItems;

export const { cartAdded, deleteCart, quantityIncreased, quantityDecreased } =
  cartsSlice.actions;

export default cartsSlice.reducer;
