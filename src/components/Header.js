import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { Search, LogoImg, Profile_small, CaretDown } from '../image';
import { BsFillBookmarkFill, BsFillBellFill } from 'react-icons/bs';
import { Button, Menu, MenuItem } from '@material-ui/core';

const HeaderN = (props) => {
  const {opacity, TABopacity} = props;
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('refreshToken');

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

  const logout = () => {
    dispatch(userActions.logOut());
  };

  // 로그인 토큰이 있을 때 보이는 헤더
  if (token) {
    return (
      <React.Fragment>
        <Grid
          className="header"
          width="100%"
          height="100px"
          TABheight='72px'
          display="flex"
          justifyContent="space-between"
          backgroundColor='#202124'
          opacity={opacity}
          TABopacity={TABopacity}
        >
          {/* 검색창 */}
          <Grid
            className="logo_search"
            height="fit-content"
            width="auto"
            margin='10px 0 0'
            TABmargin='9px 0 0'
          >
            <Logo src={LogoImg} alt="토크부트 로고" onClick={() => history.push('/')}/>
            <Image src={Search} alt="검색" />
            <Input placeholder="검색어를 입력하세요." />
          </Grid>
          <Grid height="fit-content" width="auto" margin="36px 50px" TABmargin='22px 18px'>
            {/* 북마크 메뉴 */}
            <Text
              color="#5F6368"
              fontSize="24px"
              TABfontSize='18px'
              verticalAlign="middle"
              margin="5px 8px 0 0"
              TABmargin='4px 6px 0 0'
              cursor="pointer"
              _onClick={() => history.push('/mypage/mybookmarks')}
            >
              <BsFillBookmarkFill />
            </Text>
            {/* 알림 메뉴 */}
            <Text
              color="#5F6368"
              fontSize="24px"
              TABfontSize='18px'
              verticalAlign="middle"
              margin="0 8px"
              TABmargin='4px 8px'
              cursor="pointer"
            >
              <BsFillBellFill />
            </Text>
            {/* 프로필 이미지 */}
            <ProfileImg src={Profile_small} alt="프로필" />
            {/* 드롭다운 메뉴 */}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ padding: 0, minWidth: 0, width: '24px' }}
            >
              <Text color="#5F6368" fontSize="4.6px">
                <img src={CaretDown} alt="메뉴" />
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
                onClick={() => {handleClose(); logout()}}
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
        TABheight='72px'
        display="flex"
        justifyContent="space-between"
        backgroundColor='#202124'
        opacity={opacity}
        TABopacity={TABopacity}
      >
        {/* 검색창 */}
        <Grid
          className="search"
          height="fit-content"
          width="auto"
          margin="10px 0 0"
          TABmargin='9px 0 0'
        >
          <Logo src={LogoImg} alt="토크부트 로고" onClick={() => history.push('/')}/>
          <Image src={Search} alt="검색" />
          <Input placeholder="검색어를 입력하세요." />
        </Grid>
        {/* 로그인 버튼 */}
        <LoginBtn type="button" onClick={() => history.push('/login')}>
          <Text
            fontSize="16px"
            TABfontSize='14px'
            color="#f8f9fa"
            cursor="pointer"
            lineHeight="24px"
            TABlineHeight='18px'
          >
            로그인
          </Text>
        </LoginBtn>
      </Grid>
    </React.Fragment>
  );
};

const Input = styled.input`
  border: none;
  width: 400px;
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
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 326px;
    height: 40px;
    &::placeholder {
      font-size: 12px;
    }
  }
`;

const Logo = styled.img`
  height: 80px;
  width: 210px;
  margin: 0 8px;
  cursor: pointer;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 56px;
    width: 140px;
  }
`;

const Image = styled.img`
  vertical-align: middle;
  width: 24px;
`;

const ProfileImg = styled.img`
  vertical-align: middle;
  margin-left: 8px;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 38px 42px 0 0;
  height: 24px;
  float: right;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 18px;
    margin: 27px 18px 0 0;
  }
`;

export default HeaderN;
