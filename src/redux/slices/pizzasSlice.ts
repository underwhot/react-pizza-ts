import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type fetchPizzasParams = Record<string, string>;

type Pizza = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  type: string;
  size: number;
  amount?: number;
};

interface PizzaSliceState {
  pizzas: Pizza[];
  isLoadingViaAPI: Boolean;
}

const initialState: PizzaSliceState = {
  pizzas: [],
  isLoadingViaAPI: false,
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params: fetchPizzasParams, thunkAPI) => {
    try {
      const { category, sort, order, searchRequest } = params;
      const res = await axios.get<Pizza[]>(
        `https://654fb2ee358230d8f0cda05a.mockapi.io/pizzaData?${category}&${sort}&${order}&search=${searchRequest}`
      );
      return res.data as Pizza[];
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // getPizzas: (state, action) => {
    //   state.pizzas = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
    });
  },
});

// export const { getPizzas } = pizzasSlice.actions;

export const selectPizzas = (state: RootState) => state.pizzas.pizzas;
export const selectIsLoadingViaAPI = (state: RootState) =>
  state.pizzas.isLoadingViaAPI;

export default pizzasSlice.reducer;
