import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator } from 'redux/mineReducer';
import { RootState } from 'redux/store';

interface Props {}

const Header = (props: Props) => {
  const [timeUp, setTimeUp] = useState(0);

  const dispatch = useDispatch();
  const { isStart, mineCount } = useSelector((state: RootState) => state.MineReducer);
  const { CreateTable, SwitchStart } = actionCreator;

  let timer: any = null;
  useEffect(() => {
    if (isStart) {
      timer = setInterval(() => {
        setTimeUp(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    if (timeUp === 9) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isStart, timeUp]);

  const changeImage = (item: number) => {
    const answer = [];
    const split = String(item).split('');
    for (let i = String(item).length; 3 > i; i++) {
      answer.push(<div key={i} className="time time0"></div>);
    }
    for (let i = 0; split.length > i; i++) {
      answer.push(<div key={i} className={`time time${split[i]}`}></div>);
    }
    return answer;
  };

  const handleSmile = () => {
    setTimeUp(0);
    dispatch(SwitchStart(false));
    dispatch(
      CreateTable({
        row: 16,
        cell: 30,
      }),
    );
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
