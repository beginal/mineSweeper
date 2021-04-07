import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {}

const Header = (props: Props) => {
  const [mineCount, setMineCount] = useState(99);
  const [timeUp, setTimeUp] = useState(0);

  const changeImage = (item: number) => {
    const answer = [];
    const split = String(item).split('');
    console.log(split);
    for (let i = String(item).length; 3 > i; i++) {
      answer.push(<div className="time time0"></div>);
    }
    for (let i = 0; split.length > i; i++) {
      answer.push(<div className={`time time${split[i]}`}></div>);
    }
    return answer;
  };

  const handleSmile = () => {
    setMineCount(99);
    setTimeUp(0);
  };

  return (
    <StyleWrap>
      <div className="timeList">{changeImage(mineCount)}</div>
      <button className="smileBtn" onClick={handleSmile}></button>
      <div className="timeList">{changeImage(timeUp)}</div>
    </StyleWrap>
  );
};

export default Header;

const StyleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px;
  border: 2px solid #7b7b7b;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  .smileBtn {
    display: flex;
    justify-content: center;
    background-image: url('./sprite100.gif');
    background-position: 0 -55px;
    width: 26px;
    height: 26px;
    cursor: pointer;
    border: none;
    outline: none;
    &:active {
      background-position: -26px -55px;
    }
  }
  .timeList {
    display: flex;
    .time {
      background-image: url('./sprite100.gif');
      background-position: 0 0;
      width: 13px;
      height: 23px;
    }
    .time0 {
      background-position: 0 0;
    }
    .time1 {
      background-position: -13px 0;
    }
    .time2 {
      background-position: -26px 0;
    }
    .time3 {
      background-position: -39px 0;
    }
    .time4 {
      background-position: -52px 0;
    }
    .time5 {
      background-position: -65px 0;
    }
    .time6 {
      background-position: -78px 0;
    }
    .time7 {
      background-position: -91px 0;
    }
    .time8 {
      background-position: -104px 0;
    }
    .time9 {
      background-position: -117px 0;
    }
  }
`;
