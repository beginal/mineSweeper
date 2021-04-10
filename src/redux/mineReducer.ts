import { createAction, createReducer } from '@reduxjs/toolkit';

type typeInitialState = {
  tableData: number[][];
  openCount: number;
  isStart: boolean;
  gameOver: boolean;
  mineCount: number;
  victory: boolean;
};

const initialState: typeInitialState = {
  mineCount: 25,
  openCount: 0,
  tableData: [],
  isStart: false,
  gameOver: false,
  victory: false,
};

const isState = {
  normal: 0,
  openNormal: -1,
  flag: -2,
  flagMine: -3,
  openMine: -4,
  mine: -5,
};

export const CreateTable = createAction<object>('CREATE_TABLE');
export const ChangeTableCell = createAction<object>('CHANGE_TABLE_CELL');
export const MineInstall = createAction<object>('MINE_INSTALL');
export const SwitchStart = createAction<boolean>('SWITCH_START');
export const SetGameOver = createAction<boolean>('SET_GAME_OVER');

const MineReducer = createReducer(initialState, {
  [CreateTable.type]: (state, action) => {
    const rowData = action.payload.row;
    const cellData = action.payload.cell;
    state.victory = false;
    const tableData: number[][] = [];
    for (let i = 0; cellData > i; i++) {
      tableData.push([]);
      for (let j = 0; rowData > j; j++) {
        tableData[i].push(0);
      }
    }
    state.tableData = tableData;
  },
  [ChangeTableCell.type]: (state, action) => {
    const tableData = [...state.tableData];
    tableData.forEach((row, i) => {
      tableData[i] = [...state.tableData[i]];
    });
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
        const checked: any = [];
        function openCell(rowData: number, cellData: number) {
          if (checked.includes(rowData + ',' + cellData)) {
            // 이미 검사한 칸이면
            return;
          } else {
            // 아니면 checked 배열에 넣어주기
            checked.push(rowData + ',' + cellData);
          }
          let around: number[] = [];
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
          around = around.concat(
            tableData[rowData][cellData - 1],
            tableData[rowData][cellData + 1],
          );
          const count = around.filter((v: number) => [isState.mine, isState.flagMine].includes(v))
            .length;
          console.log(count);
          if (count === 0) {
            const openList = [];
            if (rowData - 1 > -1) {
              openList.push([rowData - 1, cellData - 1]);
              openList.push([rowData - 1, cellData]);
              openList.push([rowData - 1, cellData + 1]);
            }
            if (tableData.length > rowData + 1) {
              openList.push([rowData + 1, cellData - 1]);
              openList.push([rowData + 1, cellData]);
              openList.push([rowData + 1, cellData + 1]);
            }
            openList.push([rowData, cellData - 1]);
            openList.push([rowData, cellData + 1]);
            console.log('openList', openList);
            tableData[rowData][cellData] = -1;
            openList.forEach(v => {
              if (tableData[v[0]][v[1]] === isState.normal) openCell(v[0], v[1]);
            });
          } else {
            tableData[rowData][cellData] = count;
          }
          state.openCount = state.openCount + 1;
          console.log(rowData * cellData - state.mineCount);
          if (state.openCount - 1 === tableData.length * tableData[0].length - state.mineCount) {
            state.victory = true;
          }
        }
        openCell(rowData, cellData);
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
