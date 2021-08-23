import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';

const BootInfo = (props) => {
  const { camp } = props;

  return (
    <Grid className='contents-info' backgroundColor='#202124' width='64%' TABwidth='100%' padding='40px' MOBpadding='18px'>
      <InfoList>
        <div><TextKey>코스</TextKey></div>
        <div><TextValue>14주</TextValue></div>
        <div><TextKey>모집기간</TextKey></div>
        <div><TextValue>2021.09.03(금)까지</TextValue></div>
        <div><TextKey>가격</TextKey></div>
        <div><TextValue>선불 400만원(신청 시 결제)<br />혼합 500만원(신청 시 200만원 + 취업 후 300만원)<br />*연봉 3,000만원 이상 취업 시에만 납부</TextValue></div>
        <div><TextKey>커리큘럼</TextKey></div>
        <Schedule>
          <div><TextValue>0주</TextValue></div>
          <div><TextValue>사전준비</TextValue></div>
          <div><TextValue>1주</TextValue></div>
          <div><TextValue>풀스택 미니프로젝트</TextValue></div>
          <div><TextValue>2-3주</TextValue></div>
          <div><TextValue>기본/심화</TextValue></div>
          <div><TextValue>4주</TextValue></div>
          <div><TextValue>미니프로젝트</TextValue></div>
          <div><TextValue>5주</TextValue></div>
          <div><TextValue>클론코딩</TextValue></div>
          <div><TextValue>6-11주</TextValue></div>
          <div><TextValue>실전 프로젝트</TextValue></div>
          <div><TextValue>12주</TextValue></div>
          <div><TextValue>코딩테스트1</TextValue></div>
          <div><TextValue>13-14주</TextValue></div>
          <div><TextValue>지원하기&코딩테스트2</TextValue></div>
        </Schedule>
      </InfoList>
    </Grid>
  )
};

const InfoList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  & > div {
    margin-bottom: 16px;
    line-height: 30px;
    @media screen and (max-width: 1090px) {
      line-height: 24px;
    }
  }
`;

const Schedule = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 15% 85%;
  @media screen and (max-width: 767px) {
    grid-template-columns: 20% 80%;
  }
`;

const TextKey = styled.span`
  font-size: 16px;
  color: #9aa0a6;
  cursor: default;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const TextValue = styled.span`
  font-size: 16px;
  color: #DADCE0;
  cursor: default;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

export default BootInfo;