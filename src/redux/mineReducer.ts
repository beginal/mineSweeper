import { createAction, createReducer } from '@reduxjs/toolkit';

type typeInitialState = {
  tableData: any[];
  isStart: boolean;
  gameOver: boolean;
  mineCount: number;
};

const initialState: typeInitialState = {
  mineCount: 99,
  tableData: [],
  isStart: false,
  gameOver: false,
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
export const SetGameOver = createAction<boolean>('SET_GAME_OVER');

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
      case isState.openNormal:
        let around: any = [];
        if (tableData[rowData - 1]) {
          around = around.concat(
            tableData[rowData - 1][cellData - 1],
            tableData[rowData - 1][cellData],
            tableData[rowData - 1][cellData + 1],
          );
        }
        if (tableData[rowData + 1]) {
          around = around.concat(
            tableData[rowData + 1][cellData - 1],
            tableData[rowData + 1][cellData],
            tableData[rowData + 1][cellData + 1],
          );
        }
        around = around.concat(tableData[rowData][cellData - 1], tableData[rowData][cellData + 1]);
        const count = around.filter((v: any) => [isState.mine, isState.flagMine].includes(v))
          .length;
        if (count === 0) {
          tableData[rowData][cellData] = -1;
          // const near = [];
          // if (rowData - 1 > -1) {
          //   near.push([rowData - 1, cellData - 1]);
          //   near.push([rowData - 1, cellData]);
          //   near.push([rowData - 1, cellData + 1]);
          // }
          // near.push([rowData, cellData - 1]);
          // near.push([rowData, cellData + 1]);
          // if (rowData + 1 < tableData.length) {
          //   near.push([rowData + 1, cellData - 1]);
          //   near.push([rowData + 1, cellData]);
          //   near.push([rowData + 1, cellData + 1]);
          // }
          // console.log(near);
          // near.forEach(n => {
          //   tableData[n[0]][n[1]] = count;
          // });
        } else {
          tableData[rowData][cellData] = count;
        }
        break;
      case isState.openMine:
        state.isStart = false;
        state.gameOver = true;
        break;
    }
    if (action.payload.data !== isState.openNormal) {
      tableData[rowData][cellData] = action.payload.data;
    }

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
  [SetGameOver.type]: (state, action) => {
    state.gameOver = action.payload;
  },
});

export const actionCreator = {
  CreateTable,
  ChangeTableCell,
  MineInstall,
  SwitchStart,
  SetGameOver,
};

export default MineReducer;
