import React from 'react';
import Td from './Td';

interface Props {}

const Tr = ({ tableData, trData, row }: any) => {
  return (
    <div>
      {trData.map((td: any, i: number) => (
        <Td key={i} tableData={tableData} row={row} cell={i} />
      ))}
    </div>
  );
};

export default Tr;
