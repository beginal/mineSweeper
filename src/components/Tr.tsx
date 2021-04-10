import React from 'react';
import Td from './Td';

interface Props {
  tableData: number[][];
  trData: number[];
  row: number;
}

const Tr = ({ tableData, trData, row }: Props) => {
  return (
    <div>
      {trData.map((td: number, i: number) => (
        <Td key={i} tableData={tableData} row={row} cell={i} />
      ))}
    </div>
  );
};

export default Tr;
