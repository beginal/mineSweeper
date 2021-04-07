import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Table from 'components/Table';
import { Helmet } from 'react-helmet';
import Note from 'components/Note';

function App() {
  return (
    <>
      <Helmet>
        <title>Minesweeper - React</title>
      </Helmet>
      <StyledWrap>
        <div>
          <Header />
          <Table />
        </div>
      </StyledWrap>
      <Note />
    </>
  );
}

export default App;

const StyledWrap = styled.div`
  display: flex;
  justify-content: center;
  > div {
    padding: 6px;
    border: 2px solid white;
    border-right: 2px solid #7b7b7b;
    border-bottom: 2px solid #7b7b7b;
    width: 484px;
    background: #c0c0c0;
    user-select: none;
  }
`;
