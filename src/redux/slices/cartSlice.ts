import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  amount: number;
};

interface CartSliceState {
  pizzas: Pizza[];
  totalPrice: number;
  totalAmount: number;
}

const initialState: CartSliceState = {
  pizzas: [],
  totalPrice: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<Pizza>) => {
      const currentPizza = state.pizzas.find(
        (pizza) => pizza.id === action.payload.id
      );

      if (currentPizza) {
        return {
          ...state,
          totalAmount: state.totalAmount + 1,
          totalPrice: state.totalPrice + action.payload.price,
          pizzas: state.pizzas.map((pizza) =>
            pizza.id === action.payload.id
              ? { ...pizza, amount: pizza.amount + 1 }
              : pizza
          ),
        };
      }

      state.pizzas = [...state.pizzas, action.payload];
      state.totalPrice += action.payload.price;
      state.totalAmount += 1;
    },
    deletePizza: (state, action: PayloadAction<Pizza>) => {
      state.pizzas = state.pizzas.filter(
        (pizza) => pizza.id !== action.payload.id
      );
      state.totalPrice -= action.payload.price * action.payload.amount;
      state.totalAmount -= action.payload.amount;
    },
    clearCart: () => {
      return initialState;
    },
    plusPizza: (state, action: PayloadAction<Pizza>) => {
      state.pizzas = state.pizzas.map((pizza) =>
        pizza.id === action.payload.id
          ? { ...pizza, amount: pizza.amount + 1 }
          : pizza
      );
      state.totalPrice += action.payload.price;
      state.totalAmount += 1;
    },
    minusPizza: (state, action: PayloadAction<Pizza>) => {
      state.totalPrice -= action.payload.price;
      state.totalAmount = state.totalAmount - 1;

      if (action.payload.amount <= 1) {
        state.pizzas = state.pizzas.filter(
          (pizza) => pizza.id !== action.payload.id
        );

        return;
      }

      state.pizzas = state.pizzas.map((pizza) =>
        pizza.id === action.payload.id
          ? { ...pizza, amount: pizza.amount - 1 }
          : pizza
      );
    },
  },
});

export const { addPizza, deletePizza, clearCart, plusPizza, minusPizza } =
  cartSlice.actions;

export const selectPizzas = (state: RootState) => state.cart.pizzas;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;

export default cartSlice.reducer;
