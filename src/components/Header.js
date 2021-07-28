import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';

const Header = (props) => {
  const [is_login, setIsLogin] = useState(false);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_center height='7vh'>
            <LeftMenu>
              <A onClick={() => history.push('/')}><Text fontSize='2vh' margin='0 1vh 0 0'>LOGO</Text></A>
              <A onClick={() => history.push('/')}><Text fontSize='1.5vh' margin='0 1vh 0'>홈</Text></A>
              <A onClick={() => history.push('/review')}><Text fontSize='1.5vh' margin='0 1vh 0'>부트캠프</Text></A>
              <A onClick={() => history.push('/common/list')}><Text fontSize='1.5vh' margin='0 1vh 0'>자유게시판</Text></A>
              <A onClick={() => history.push('/question')}><Text fontSize='1.5vh' margin='0 1vh 0'>질문/답변 게시판</Text></A>
            </LeftMenu>
            <RightMenu>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vh 0'>알림</Text></A>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vh 0'>북마크</Text></A>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vh 0'>마이페이지</Text></A>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vh 0'>로그아웃</Text></A>
            </RightMenu>
          </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid is_center height='7vh'>
          <LeftMenu>
            <A onClick={() => history.push('/')}><Text fontSize='2vh' margin='0 1vh 0 0'>LOGO</Text></A>
            <A onClick={() => history.push('/')}><Text fontSize='1.5vh' margin='0 1vh 0'>홈</Text></A>
            <A onClick={() => history.push('/review')}><Text fontSize='1.5vh' margin='0 1vh 0'>부트캠프</Text></A>
            <A onClick={() => history.push('/common/list')}><Text fontSize='1.5vh' margin='0 1vh 0'>자유게시판</Text></A>
            <A onClick={() => history.push('/question')}><Text fontSize='1.5vh' margin='0 1vh 0'>질문/답변 게시판</Text></A>
          </LeftMenu>
          <RightMenu>
            <A onClick={() => history.push('/login')}><Text fontSize='1.5vh' margin='0 1vh 0'>로그인</Text></A>
            <A onClick={() => history.push('/signup')}><Text fontSize='1.5vh' margin='0 1vh 0'>회원가입</Text></A>
          </RightMenu>
        </Grid>
    </React.Fragment>
  )
};

const A = styled.a`
  cursor: pointer;
`;

const LeftMenu = styled.span`
  line-height: 7vh;
  margin-right: 20%;
`;

const RightMenu = styled.span`
  line-height: 7vh;
`;

export default Header;