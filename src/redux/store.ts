import { configureStore, combineReducers } from '@reduxjs/toolkit';
import MineReducer from './mineReducer';

const rootReducer = combineReducers({
  MineReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;

export type RootState = ReturnType<typeof rootReducer>;
