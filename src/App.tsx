import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Table from 'components/Table';

function App() {
  return (
    <StyledWrap>
      <Header />
      <Table />
    </StyledWrap>
  );
}

export default App;

const StyledWrap = styled.div`
  padding: 6px;
  border-right: 2px solid #7b7b7b;
  width: 500px;
  background: #c0c0c0;
`;
