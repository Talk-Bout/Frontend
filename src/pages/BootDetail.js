import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body, BootRoot, BootOthers, BootInfo, BootReview } from '../components';
import { useSelector } from 'react-redux';

const BootDetail = (props) => {
  // 현재 탭을 useState로 관리한다. 초깃값은 정보 탭.
  const [tab, setTab] = useState('info');
  // 현재 캠프 이름을 주소창에서 가져온다.
  const bootcampName = props.match.params.name;
  // 리덕스에 저장된 camp_list에서 bootcampName과 같은 이름을 가진 캠프 정보를 가져온다.
  const camp_list = useSelector(state => state.bootcamp.camp_list);
  const camp = camp_list.find((c) => c.bootcampName === bootcampName);

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
          <BootRoot camp={camp} tab_now={tab} />
          {/* 정보, 리뷰, 커뮤니티 탭 */}
          {/* 현재 탭에 따라 메뉴 CSS 달라지게 함 */}
          <Grid className='nav-box' height='54px' margin='40px 0 0' borderBottom='2px solid #5F6368'>
            <Menu url={tab === 'info' && 'white'}>
              <Text fontSize='24px' color={tab === 'info' ? '#e8eaed' : '#5f6368'} _onClick={() => setTab('info')}>
                정보</Text>
            </Menu>
            <Menu url={tab === 'review' && 'white'}>
              <Text fontSize='24px' color={tab === 'review' ? '#e8eaed' : '#5f6368'} _onClick={() => setTab('review')}>
                리뷰</Text>
            </Menu>
          </Grid>
          <Grid className='contents-box' padding='24px 0' display='flex' justifyContent='space-between'>
            {tab === 'info' ?
              <BootInfo camp={camp} />
              :
              <BootReview camp={camp} />
            }
            {/* 다른 부트캠프 목록 */}
            <BootOthers />
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  )
};

const Menu = styled.div`
  display: inline-block;
  margin-right: 48px;
  cursor: pointer;
  padding-bottom: 16px;
  ${(props) => props.url === 'white' && 'border-bottom: 4px solid #e8eaed'};
`;

export default BootDetail;