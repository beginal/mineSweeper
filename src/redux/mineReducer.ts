import { createAction, createReducer } from '@reduxjs/toolkit';

type typeInitialState = {
  tableData: any[];
  isStart: boolean;
  mineCount: number;
};

const initialState: typeInitialState = {
  mineCount: 99,
  tableData: [],
  isStart: false,
};

const isState = {
  normal: 0,
  openNormal: -1,
  flag: -2,
  flagMine: -3,
  openMine: -4,
  mine: -5,
};

export const CreateTable = createAction<any>('CREATE_TABLE');
export const ChangeTableCell = createAction<any>('CHANGE_TABLE_CELL');
export const MineInstall = createAction<any>('MINE_INSTALL');
export const SwitchStart = createAction<boolean>('SWITCH_START');

const MineReducer = createReducer(initialState, {
  [CreateTable.type]: (state, action) => {
    const rowData = action.payload.row;
    const cellData = action.payload.cell;
    const tableData: any[] = [];
    for (let i = 0; cellData > i; i++) {
      tableData.push([]);
      for (let j = 0; rowData > j; j++) {
        tableData[i].push(0);
      }
    }
    state.tableData = tableData;
  },
  [ChangeTableCell.type]: (state, action) => {
    const tableData = state.tableData;
    const rowData = action.payload.row;
    const cellData = action.payload.cell;
    switch (action.payload.data) {
      case isState.flag:
      case isState.flagMine:
        state.mineCount = state.mineCount - 1;
        break;
      case isState.normal:
      case isState.mine:
        state.mineCount = state.mineCount + 1;
        break;
    }
    tableData[rowData][cellData] = action.payload.data;

    state.tableData = tableData;
  },
  [MineInstall.type]: (state, action) => {
    const tableData = state.tableData;
    for (let i = 0; state.mineCount > i; i++) {
      const rowMine = Math.floor(Math.random() * 30);
      const cellMine = Math.floor(Math.random() * 16);
      if (action.payload.row === rowMine && action.payload.cell === cellMine) {
        i = i - 1;
        continue;
      }
      tableData[rowMine][cellMine] = action.payload.mineInstall;
    }
    state.tableData = tableData;
  },
  [SwitchStart.type]: (state, action) => {
    state.isStart = action.payload;
    if (!state.isStart) {
      state.mineCount = 99;
    }
  },
});

export const actionCreator = {
  CreateTable,
  ChangeTableCell,
  MineInstall,
  SwitchStart,
};

export default MineReducer;
