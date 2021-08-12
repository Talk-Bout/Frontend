import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import Search from '../image/search_black.png';
import { BsFillBookmarkFill, BsFillBellFill } from 'react-icons/bs';
import Profile from '../image/profile_small.png';
import CaretDown from '../image/CaretDown.png';
import { Button, Menu, MenuItem } from '@material-ui/core';

const HeaderN = (props) => {
  const dispatch = useDispatch();

  // 로컬 스토리지에 저장된 로그인 토큰을 찾는다.
  const token = localStorage.getItem('token');

  // 드롭다운 메뉴
  const [MenuLink, setMenuLink] = useState(null);
  // 펼치기
  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  };
  // 접기
  const handleClose = () => {
    setMenuLink(null);
  };

  // 로그아웃
  const logOutBtn = () => {
    dispatch(userActions.logOut());
    history.push('/');
  };

  // 로그인 토큰이 있을 때 보이는 헤더
  if (token) {
    return (
      <React.Fragment>
        <Grid
          className="header"
          width="100%"
          height="100px"
          borderBottom="1px solid #80868b"
          display="flex"
          justify_content="space-between"
        >
          {/* 검색창 */}
          <Grid
            className="search"
            height="fit-content"
            width='auto'
            margin="26px 0 0 42px"
          >
            {/* <Image src={Search} alt="검색" />
            <Input placeholder="검색어를 입력하세요." /> */}
          </Grid>
          <Grid height='fit-content' width="auto" margin='36px 50px'>
            {/* 북마크 메뉴 */}
            <Text
              color="#5F6368"
              fontSize="18px"
              vertical_align="middle"
              margin="0 8px 0 0"
              cursor="pointer"
            >
              <BsFillBookmarkFill />
            </Text>
            {/* 알림 메뉴 */}
            <Text
              color="#5F6368"
              fontSize="18px"
              vertical_align="middle"
              margin="0 8px"
              cursor="pointer"
            >
              <BsFillBellFill />
            </Text>
            {/* 프로필 이미지 */}
            <ProfileImg src={Profile} alt="프로필"/>
            {/* 드롭다운 메뉴 */}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{padding: 0, minWidth: 0, width: '24px'}}
            >
              <Text color="#5F6368" fontSize='4.6px'>
                <img src={CaretDown} alt='메뉴' />
              </Text>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={MenuLink}
              keepMounted
              open={Boolean(MenuLink)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push('/mypage')}>
                마이페이지
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  logOutBtn();
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  // 로그인 토큰이 없을 때 보이는 헤더
  return (      
    <React.Fragment>
      <Grid
        className="header"
        width="100%"
        height="100px"
        borderBottom="1px solid #5F6368"
        display="flex"
        justify_content="space-between"
      >
        {/* 검색창 */}
        <Grid
          className="search"
          height="fit-content"
          width='auto'
          margin='26px 0 0 42px'
        >
          <Image src={Search} alt="검색" />
          <Input placeholder="검색어를 입력하세요." />
        </Grid>
        {/* 로그인 버튼 */}
          <LoginBtn type='button' onClick={() => history.push('/login')}><Text fontSize="16px" color="#f8f9fa" cursor='pointer' lineHeight='24px'>
            로그인
          </Text></LoginBtn>
      </Grid>
    </React.Fragment>
  );
};

const Input = styled.input`
  border: none;
  width: 600px;
  height: 48px;
  background-color: transparent;
  color: #80868b;
  &::placeholder {
    color: #80868b;
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
`;

const ProfileImg = styled.img`
  vertical-align: middle;
  margin-left: 8px;
  cursor: pointer;
`;

const Image = styled.img`
  vertical-align: middle;
  width: 24px;
`;

const LoginBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 38px 42px 0 0;
  height: 24px;
`;

export default HeaderN;
