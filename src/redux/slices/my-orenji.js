import {createSlice} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';

export const counterSlice = createSlice({
  name: 'book',
  initialState: {
    created: [],
    saved: [],
    liked: [],
  },
  reducers: {
    addCreatedByApi: (state, action) => {
      state.created = action.payload;
    },
    addSavedByApi: (state, action) => {
      state.saved = action.payload;
    },
    extraReducers: builder => {
      builder.addCase(PURGE, state => {
        builder.removeAll(state);
      });
    },
  },
});

export const {addCreatedByApi, addSavedByApi} = counterSlice.actions;
export default counterSlice.reducer;
