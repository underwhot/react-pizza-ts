import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState {
  category: string;
  sort: string;
  searchRequest: string;
}

const initialState: FilterSliceState = {
  category: 'Все',
  sort: 'популярности',
  searchRequest: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSearchRequest: (state, action: PayloadAction<string>) => {
      state.searchRequest = action.payload;
    },
  },
});

export const { setCategory, setSort, setSearchRequest } = filterSlice.actions;

export const selectCategory = (state: RootState) => state.filter.category;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectSearchRequest = (state: RootState) =>
  state.filter.searchRequest;

export default filterSlice.reducer;
