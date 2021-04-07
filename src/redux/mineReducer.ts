import { createAction, createReducer } from '@reduxjs/toolkit';

type typeInitialState = {
  mine: Array<any>;
};

const initialState: typeInitialState = {
  mine: [],
};

export const testAction = createAction<object>('TEST_ACTION');

const MineReducer = createReducer(initialState, builder => {
  builder.addCase(testAction, (state, action) => {
    // state.mine = action.payload
  });
});

export const actionCreator = {
  testAction,
};

export default MineReducer;
