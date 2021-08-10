import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Stars from '../components/Stars';
import { history } from '../redux/ConfigureStore';

const BootInfo = (props) => {
  // 부트캠프 정보를 props로 받는다.
  const {bootcampName, desc, review} = props.location.state.camp;

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header>
          {/* 부트캠프 로고 */}
          <LogoBox>로고</LogoBox>
          <Grid className='info-button' padding='24px 0'>
            <InfoBtn>
              <div>
              {/* 부트캠프 이름 */}
              <Text fontSize='32px' color='#F8F9FA' fontWeight='700'>{bootcampName}</Text>
              <Text p fontSize='14px' color='#dadce0' margin='0 0 17px'>{desc}</Text>
              </div>
              {/* 홈페이지 바로가기 버튼 */}
              <Button><Text fontSize='14px' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></Button>
            </InfoBtn>
            {/* 부트캠프 평점, 리뷰 개수 */}
            <Text fontSize='14px' color='#dadce0'>★<span style={{margin: '0 8px'}}>{review[0].stars}</span>(164개 리뷰)</Text>
          </Grid>
          {/* 정보, 리뷰, 커뮤니티 탭 */}
          <Grid className='nav-box' height='54px' margin='40px 0 0' borderBottom='2px solid #5F6368'>
            <Menu style={{borderBottom: '4px solid #e8eaed'}}><Text fontSize='24px' color='#e8eaed'>정보</Text></Menu>
            <Menu><Text fontSize='24px' color='#5F6368' _onClick={() => history.push({pathname: `/boot/${bootcampName}/review`, state: {camp: props.location.state.camp}})}>리뷰</Text></Menu>
            <Menu><Text fontSize='24px' color='#5F6368' _onClick={() => history.push({pathname: `/boot/${bootcampName}/community`, state: {camp: props.location.state.camp}})}>커뮤니티</Text></Menu>
          </Grid>
          <Grid className='contents-box' padding='24px 0' display='flex' justify_content='space-between'>
            {/* 부트캠프 정보 */}
            <Grid className='contents-info' backgroundColor='#202124' width='64%' padding='40px'>
              <InfoList>
                <div><Text fontSize='16px' color='#9AA0A6'>코스</Text></div>
                <div><Text fontSize='16px' color='#DADCE0'>14주</Text></div>
                <div><Text fontSize='16px' color='#9AA0A6'>모집기간</Text></div>
                <div><Text fontSize='16px' color='#DADCE0'>2021.09.03(금)까지</Text></div>
                <div><Text fontSize='16px' color='#9AA0A6'>가격</Text></div>
                <div><Text fontSize='16px' color='#DADCE0'>선불 400만원(신청 시 결제)<br/>혼합 500만원(신청 시 200만원 + 취업 후 300만원)<br/>*연봉 3,000만원 이상 취업 시에만 납부</Text></div>
                <div><Text fontSize='16px' color='#9AA0A6'>커리큘럼</Text></div>
                <Schedule>
                  <div><Text fontSize='16px' color='#DADCE0'>0주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>사전준비</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>1주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>풀스택 미니프로젝트</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>2-3주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>기본/심화</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>4주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>미니프로젝트</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>5주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>클론코딩</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>6-11주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>실전 프로젝트</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>12주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>코딩테스트1</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>13-14주</Text></div>
                  <div><Text fontSize='16px' color='#DADCE0'>지원하기&코딩테스트2</Text></div>
                  </Schedule>
              </InfoList>
            </Grid>
            {/* 다른 부트캠프 목록 */}
            <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='491px' padding='24px'>
              <Text fontSize='18px' fontWeight='700' color='#e8eaed'>다른 부트캠프</Text>
              {[1, 2, 3, 4].map((c, idx) => {
                return (
                  <Camp key={idx} onClick={() => history.push(`/boot/${bootcampName}/info`)}>
                    {/* 다른 부트캠프 로고 */}
                    <ImageDiv style={{backgroundImage: `url('https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')`}}/>
                    <div style={{padding: '29px 16px'}}>
                      {/* 다른 부트캠프 이름 */}
                      <Text p className='camp-name' fontSize='18px' fontWeight='700' color='#f1f3f4' margin='0 0 4px'>부트캠프명</Text>
                      {/* 다른 부트캠프 별점 */}
                      <Stars score='2.2' size='16px' marginRight='4px' withScore/>
                    </div>
                  </Camp>
                )
              })}
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const LogoBox = styled.div`
  height: 112px;
  width: 190px;
  border: 1px solid whitesmoke; // 로고 있으면 없애기
  align-items: center;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 204px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #2E3134;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const Menu = styled.div`
  display: inline-block;
  margin-right: 48px;
  cursor: pointer;
  padding-bottom: 16px;
`;

const InfoList = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  & > div {
    margin-bottom: 16px;
    line-height: 30px;
  }
`;

const Schedule = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 15% 85%;
`;

const Camp = styled.div`
  height: 104px;
  display: flex;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageDiv = styled.div`
  height: 72px;
  width: 72px;
  border-radius: 36px;
  margin-top: 16px;
  background-size: cover;
`;

export default BootInfo;