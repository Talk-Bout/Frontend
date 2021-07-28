import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';

const Header = (props) => {

  return (
    <React.Fragment>
      <Grid is_center height='7vh'>
          <LeftMenu>
            <a><Text fontSize='2vh' margin='0 1vh 0 0'>LOGO</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>홈</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>부트캠프</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>자유게시판</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>질문/답변 게시판</Text></a>
          </LeftMenu>
          <RightMenu>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>알림</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>북마크</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>마이페이지</Text></a>
            <a><Text fontSize='1.5vh' margin='0 1vh 0'>로그아웃</Text></a>
          </RightMenu>
        </Grid>
    </React.Fragment>
  )
};

const LeftMenu = styled.span`
  line-height: 7vh;
  margin-right: 20%;
`;

const RightMenu = styled.span`
  line-height: 7vh;
`;

export default Header;