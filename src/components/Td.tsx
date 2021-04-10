import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'redux/mineReducer';
import { RootState } from 'redux/store';
import { IndexType } from 'typescript';

interface Props {
  tableData: number[][];
  row: number;
  cell: number;
}

const Td = ({ tableData, row, cell }: Props) => {
  const dispatch = useDispatch();
  const { isStart, gameOver } = useSelector((state: RootState) => state.MineReducer);
  const { SwitchStart, MineInstall, ChangeTableCell, SetGameOver } = actionCreator;
  const isState = {
    normal: 0,
    openNormal: -1,
    flag: -2,
    flagMine: -3,
    openMine: -4,
    mine: -5,
  };

  const handleClick = () => {
    if (!gameOver) {
      if (!isStart) {
        dispatch(
          MineInstall({
            row,
            cell,
            mineInstall: isState.mine,
          }),
        );
        dispatch(SwitchStart(true));
      }
      switch (tableData[row][cell]) {
        case isState.openNormal:
        case isState.flag:
        case isState.flagMine:
          return;
        case isState.normal:
          dispatch(ChangeTableCell({ row, cell, data: isState.openNormal }));
          return;
        case isState.mine:
          dispatch(ChangeTableCell({ row, cell, data: isState.openMine }));
          dispatch(SetGameOver(true));
          return;
        default:
          return;
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    switch (tableData[row][cell]) {
      case isState.flag:
        dispatch(ChangeTableCell({ row, cell, data: isState.normal }));
        return;
      case isState.flagMine:
        dispatch(ChangeTableCell({ row, cell, data: isState.mine }));
        return;
      case isState.normal:
        dispatch(ChangeTableCell({ row, cell, data: isState.flag }));
        return;
      case isState.mine:
        dispatch(ChangeTableCell({ row, cell, data: isState.flagMine }));
        return;
      default:
        return;
    }
  };

  return (
    <StyledTd
      currentCell={tableData[row][cell]}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {tableData[row][cell]}
    </StyledTd>
  );
};

export default Td;

interface StyleProps {
  currentCell: number;
}

const StyledTd = styled.div<StyleProps>`
  background-image: url('./sprite100.gif');
  background-position: ${({ currentCell }) => {
    switch (currentCell) {
      case 0:
        return '0 -39px';
      case -5:
        return '50px -39px';
      case -1:
        return '0 -23px';
      case -2:
      case -3:
        return '-16px -39px';
      case -4:
        return '-64px -39px';
      case 1:
        return '-16px -23px';
      case 2:
        return '-32px -23px';
      case 3:
        return '-48px -23px';
      case 4:
        return '-64px -23px';
      case 5:
        return '-80px -23px';
      case 6:
        return '-96px -23px';
      case 7:
        return '-112px -23px';
      case 8:
        return '-128px -23px';
    }
  }};
  text-indent: -9999px; // text 숨기기
  width: 16px;
  height: 16px;
`;
