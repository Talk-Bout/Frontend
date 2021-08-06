import React from 'react';
import styled from 'styled-components';
import {Grid, Text, Image} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { history } from '../redux/ConfigureStore';

const BootInfo = (props) => {
  const camp_name = props.match.params.name;

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        <Sidebar />
        <Body header>
          <Grid clasName='logo-box' height='20%'>
            <LogoBox><TextBox><Text lineHeight='15vh' fontSize='3vh' color='#5F6368'>LOGO</Text></TextBox></LogoBox>
          </Grid>
          <Grid className='info-button' height='15%' padding='40px 0'>
            <InfoBtn>
              <Text fontSize='3.5vh' color='#F8F9FA' fontWeight='700'>{camp_name}</Text>
              <Button><Text fontSize='1.6vh' color='#DADCE0' fontWeight='700'>홈페이지 바로가기</Text></Button>
            </InfoBtn>
            <Text fontSize='1.6vh' color='#80868B'>★ 2.2 (164개 리뷰)</Text>
          </Grid>
          <Grid className='nav-box' height='80px' margin='20px 0 0' borderBottom='2px solid #5F6368'>
            <Menu style={{borderBottom: '4px solid #e8eaed'}}><Text fontSize='2.5vh' color='#e8eaed'>정보</Text></Menu>
            <Menu><Text fontSize='2.5vh' color='#5F6368' _onClick={() => history.push(`/boot/review/${camp_name}`)}>리뷰</Text></Menu>
            <Menu><Text fontSize='2.5vh' color='#5F6368' _onClick={() => history.push(`/boot/community/${camp_name}`)}>커뮤니티</Text></Menu>
          </Grid>
          <Grid className='contents-box' height='55%' padding='40px 0' display='flex' justify_content='space-between' position='relative'>
            <Grid className='contents-postlist' backgroundColor='#202124' width='64%' height='100%' padding='40px'>
              <PostList>
                <div><Text fontSize='1.7vh' color='#9AA0A6'>코스</Text></div>
                <div><Text fontSize='1.7vh' color='#DADCE0'>14주</Text></div>
                <div><Text fontSize='1.7vh' color='#9AA0A6'>모집기간</Text></div>
                <div><Text fontSize='1.7vh' color='#DADCE0'>2021.09.03(금)까지</Text></div>
                <div><Text fontSize='1.7vh' color='#9AA0A6'>가격</Text></div>
                <div><Text fontSize='1.7vh' color='#DADCE0'>선불 400만원(신청 시 결제)<br/>혼합 500만원(신청 시 200만원 + 취업 후 300만원)<br/>*연봉 3,000만원 이상 취업 시에만 납부</Text></div>
                <div><Text fontSize='1.7vh' color='#9AA0A6'>커리큘럼</Text></div>
                <Schedule>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>0주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>사전준비</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>1주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>풀스택 미니프로젝트</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>2-3주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>기본/심화</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>4주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>미니프로젝트</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>5주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>클론코딩</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>6-11주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>실전 프로젝트</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>12주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>코딩테스트1</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>13-14주</Text></div>
                  <div><Text fontSize='1.7vh' color='#DADCE0'>지원하기&코딩테스트2</Text></div>
                  </Schedule>
              </PostList>
            </Grid>
            <Grid className='contents-bootcamp' backgroundColor='#202124' width='34%' height='450px' position='absolute'>
              <Text className='other-camps' p fontSize='2vh' fontWeight='700' color='#e2e2e2' margin='20px 20px 0'>다른 부트캠프</Text>
              {[1, 2, 3, 4].map((c, idx) => {
                return (
                  <Camp key={idx} onClick={() => history.push('/boot/info')}>
                    <ImgBox><Image size='4.5' margin='10px' src='https://images.unsplash.com/photo-1534950947221-dcaca2836ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'></Image></ImgBox>
                    <CampBox>
                      <Text className='camp-name' p fontSize='2vh' fontWeight='700' color='#f1f3f4' margin='20px 0 0'>부트캠프명</Text>
                      <Text className='camp-star' p fontSize='1.5vh' color='#a5a5a5' margin='0' >★★☆☆☆ 2.2</Text>
                    </CampBox>
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
  height: 100%;
  width: 15vw;
  min-width: 150px;
  border: 1px solid #5F6368;
  align-items: center;
`;

const TextBox = styled.div`
  text-align: center;
  height: 100%;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0 40px;
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
  margin-right: 60px;
  padding-top: 20px;
  cursor: pointer;
  height: 70%;
`;

const PostList = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  & > div {
    margin-bottom: 10px;
    line-height: 35px;
  }
`;

const Schedule = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 15% 85%;
`;

const Camp = styled.div`
  height: 100px;
  display: flex;
  border-bottom: 1px solid #8f9091;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ImgBox = styled.div`
  height: 100%;
  width: 100px;
  overflow: hidden;
`;

const CampBox = styled.div`
  width: 80%;
`;

export default BootInfo;