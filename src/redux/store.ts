import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filertReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzasReducer from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filertReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
