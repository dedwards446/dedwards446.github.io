// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './redux/charactersSlice';

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
