import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const logOutBtn = () => {
    dispatch(userActions.logOut());
    history.push('/');
  };

  if (is_login) {
    return (
      <React.Fragment>
        <Grid display='flex' justify_content='space-evenly' height='7vh' padding='0 10vw'>
            <LeftMenu>
              <A onClick={() => history.push('/')}><Text fontSize='2vh' margin='0 1vw 0 0'>LOGO</Text></A>
              <A onClick={() => history.push('/')}><Text fontSize='1.5vh' margin='0 1vw 0'>홈</Text></A>
              <A onClick={() => history.push('/boot')}><Text fontSize='1.5vh' margin='0 1vw 0'>부트캠프</Text></A>
              <A onClick={() => history.push('/common/list')}><Text fontSize='1.5vh' margin='0 1vw 0'>자유게시판</Text></A>
              <A onClick={() => history.push('/question')}><Text fontSize='1.5vh' margin='0 1vw 0'>질문/답변 게시판</Text></A>
            </LeftMenu>
            <RightMenu>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vw 0'>알림</Text></A>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vw 0'>북마크</Text></A>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vw 0'>마이페이지</Text></A>
              <A onClick={() => {}}><Text fontSize='1.5vh' margin='0 1vw 0'>로그아웃</Text></A>
            </RightMenu>
          </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid display='flex' justify_content='space-evenly' height='7vh' padding='0 10vw'>
          <LeftMenu>
            <A onClick={() => history.push('/')}><Text fontSize='2vh' margin='0 1vw 0 0'>LOGO</Text></A>
            <A onClick={() => history.push('/')}><Text fontSize='1.5vh' margin='0 1vw 0'>홈</Text></A>
            <A onClick={() => history.push('/boot')}><Text fontSize='1.5vh' margin='0 1vw 0'>부트캠프</Text></A>
            <A onClick={() => history.push('/common/list')}><Text fontSize='1.5vh' margin='0 1vw 0'>자유게시판</Text></A>
            <A onClick={() => history.push('/question')}><Text fontSize='1.5vh' margin='0 1vw 0'>질문/답변 게시판</Text></A>
          </LeftMenu>
          <RightMenu>
            <A onClick={() => {}}>
              <Text fontSize="1.5vh" margin="0 1vw 0">
                알림
              </Text>
            </A>
            <A onClick={() => {}}>
              <Text fontSize="1.5vh" margin="0 1vw 0">
                북마크
              </Text>
            </A>
            <A onClick={() => {}}>
              <Text fontSize="1.5vh" margin="0 1vw 0">
                마이페이지
              </Text>
            </A>
            <A onClick={logOutBtn}>
              <Text fontSize="1.5vh" margin="0 1vw 0">
                로그아웃
              </Text>
            </A>
          </RightMenu>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid
        display="flex"
        justify_content="space-evenly"
        height="7vh"
        padding="0 10vw"
      >
        <LeftMenu>
          <A onClick={() => history.push('/')}>
            <Text fontSize="2vh" margin="0 1vw 0 0">
              LOGO
            </Text>
          </A>
          <A onClick={() => history.push('/')}>
            <Text fontSize="1.5vh" margin="0 1vw 0">
              홈
            </Text>
          </A>
          <A onClick={() => history.push('/review')}>
            <Text fontSize="1.5vh" margin="0 1vw 0">
              부트캠프
            </Text>
          </A>
          <A onClick={() => history.push('/common/list')}>
            <Text fontSize="1.5vh" margin="0 1vw 0">
              자유게시판
            </Text>
          </A>
          <A onClick={() => history.push('/question')}>
            <Text fontSize="1.5vh" margin="0 1vw 0">
              질문/답변 게시판
            </Text>
          </A>
        </LeftMenu>
        <RightMenu>
          <A onClick={() => history.push('/login')}>
            <Text fontSize="1.5vh" margin="0 1vw 0">
              로그인
            </Text>
          </A>
          <A onClick={() => history.push('/signup')}>
            <Text fontSize="1.5vh" margin="0 1vw 0">
              회원가입
            </Text>
          </A>
        </RightMenu>
      </Grid>
    </React.Fragment>
  );
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
