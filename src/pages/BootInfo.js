import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import BootRoot from '../components/BootRoot';
import Stars from '../components/Stars';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import BootOthers from '../components/BootOthers';

const BootInfo = (props) => {
  const dispatch = useDispatch();
  // 부트캠프 정보를 props로 받는다.
  const bootcampName = props.location.pathname.split('/')[2];
  const url_word = props.location.pathname.split('/')[3];

  useEffect(() => {
    dispatch(campActions.setCampsDB(1));
  }, []);

  const camp_list = useSelector(state => state.bootcamp.camp_list);
  const this_camp = camp_list.find((camp) => camp.bootcampName === bootcampName);

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
          <BootRoot camp={this_camp} url_word={url_word}/>
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
            <BootOthers />
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

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