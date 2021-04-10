import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'redux/mineReducer';
import { RootState } from 'redux/store';
import Tr from './Tr';

interface Props {
  timer: any;
}

const Table = ({ timer }: Props) => {
  const dispatch = useDispatch();
  const { tableData, victory } = useSelector((state: RootState) => state.MineReducer);
  const { CreateTable } = actionCreator;

  useEffect(() => {
    dispatch(
      CreateTable({
        row: 16,
        cell: 30,
      }),
    );
  }, []);

  useEffect(() => {
    if (victory) {
      alert('승리하셨습니다!');
    }
  }, [victory]);

  return (
    <StyledWrap>
      {tableData.map((tr: number[], i: number) => (
        <Tr key={i} tableData={tableData} trData={tr} row={i} />
      ))}
    </StyledWrap>
  );
};

export default Table;

const StyledWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  border: 2px solid #7b7b7b;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  .normal {
  }
  .flag {
    background-position: -16px -39px;
  }
`;
