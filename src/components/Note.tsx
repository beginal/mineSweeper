import React from 'react';
import styled from 'styled-components';
interface Props {}

const Note = (props: Props) => {
  return (
    <StyledWrap>
      <h3>구현사항</h3>
      <ol>
        <li>오른쪽 마우스 클릭시 Flag Toggle</li>
        <li>Flag Toggle시마다 좌상단 Count 바뀌게 함</li>
        <li>처음 cell 클릭시 Timer 시작 & 첫 클릭후 지뢰세팅</li>
        <li>스마일 클릭시 전부 초기화 (지뢰 위치도 Reset)</li>
        <li>지뢰 클릭시 Timer 종료 & 클릭 막기 & 스마일 표정 변화</li>
        <li>칸 클릭시 해당 칸 주변의 지뢰갯수 표시 (없으면 공백칸)</li>
      </ol>
      <h3>노력했으나 구현하지 못한사항</h3>
      <ol>
        <li>빈칸 클릭시 주변칸 함께열기</li>
        <li>마우스 양쪽 클릭시 (3*3)칸 클릭</li>
      </ol>
    </StyledWrap>
  );
};

export default Note;

const StyledWrap = styled.div`
  ol {
    font-size: 14px;
  }
`;
