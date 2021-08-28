import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { Search, LogoImg, Profile_small, CaretDown, Gift } from '../image';
import { BsFillBookmarkFill, BsFillBellFill } from 'react-icons/bs';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { getCookie } from '../shared/cookie';
import { baseUrl } from '../shared/api';

const Header = (props) => {
  const { opacity, TABopacity, MOBopacity } = props;
  const dispatch = useDispatch();
  const token = getCookie('refreshToken');
  const profilePic = getCookie('profilePic');

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

  const getFeedback = () => {
    window.open('https://forms.gle/qVXAFziZKaD2jEq39', '_blank');
  }

  // 로그인 토큰이 있을 때 보이는 헤더
  if (token) {
    return (
      <React.Fragment>
        <Grid
          className="header"
          width="100%"
          height="100px"
          TABheight='72px'
          MOBheight='48px'
          display="flex"
          justifyContent="space-between"
          backgroundColor='#202124'
          MOBbackgroundColor='transparent'
          MOBborderBottom='1px solid #282A2D'
          opacity={opacity}
          TABopacity={TABopacity}
          MOBopacity={MOBopacity}
        >
          {/* 검색창 */}
          <Grid
            className="logo_search"
            height="fit-content"
            width="auto"
            MOBwidth='100%'
            margin='10px 0 0'
            TABmargin='9px 0 0'
            MOBmargin='0'
            MOBpadding='0 17px 0 18px'
            MOBdisplay='flex'
            MOBjustifyContent='space-between'
          >
            <Logo src={LogoImg} alt="토크부트 로고" onClick={() => history.push('/')} />
            {/* <Image src={Search} alt="검색" /> */}
            {/* <Input placeholder="검색어를 입력하세요." /> */}
          </Grid>
          <Grid width="auto" margin="36px 50px" TABmargin='22px 18px' MOBdisplay='none' display='flex'>
            <GiftBtn src={Gift} onClick={() => getFeedback()} />
            {/* 북마크 메뉴 */}
            <Text
              color="#7879f1"
              fontSize="32px"
              TABfontSize='18px'
              verticalAlign="middle"
              margin="-4px 16px 0 0"
              TABmargin='4px 6px 0 0'
              cursor="pointer"
              _onClick={() => history.push('/mypage/mybookmarks')}
            >
              <BsFillBookmarkFill />
            </Text>
            {/* 프로필 이미지 */}
            <Profile>
              <ProfileImg onClick={() => history.push('/mypage')} src={profilePic ? `http://fw3efsadfcv.shop${profilePic}` : Profile_small} />
            </Profile>
            {/* 드롭다운 메뉴 */}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ padding: 0, minWidth: 0, width: '24px', margin: '0 0 0 8px' }}
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
                onClick={() => { handleClose(); logout() }}
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
        MOBheight='48px'
        display="flex"
        justifyContent="space-between"
        backgroundColor='#202124'
        MOBbackgroundColor='transparent'
        MOBborderBottom='1px solid #282A2D'
        opacity={opacity}
        TABopacity={TABopacity}
        MOBopacity={MOBopacity}
      >
        {/* 검색창 */}
        <Grid
          className="search"
          height="fit-content"
          width="auto"
          MOBwidth='100%'
          margin="10px 0 0"
          TABmargin='9px 0 0'
          MOBmargin='0'
          MOBpadding='0 18px'
          MOBdisplay='flex'
          MOBjustifyContent='space-between'
        >
          <Logo src={LogoImg} alt="토크부트 로고" onClick={() => history.push('/')} />
          {/* <Image MOBdisplayNone src={Search} alt="검색" />
          <Input placeholder="검색어를 입력하세요." /> */}
        </Grid>
        {/* 로그인 버튼 */}
        <GiftBtn src={Gift} onClick={() => getFeedback()} />
        <LoginBtn type="button" onClick={() => history.push('/login')}>
          <Text
            fontSize="16px"
            TABfontSize='14px'
            MOBfontSize='12px'
            color="#f8f9fa"
            cursor="pointer"
            lineHeight="24px"
            TABlineHeight='18px'
            MOBmargin='0 17px 0 0'
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
  @media screen and (max-width: 1090px) {
    width: 326px;
    height: 40px;
    &::placeholder {
      font-size: 12px;
    }
  }
@media screen and (max-width: 767px) {
  display: none;
}
`;

const Logo = styled.img`
  height: 80px;
  width: 210px;
  margin: 0 8px;
  cursor: pointer;
  vertical-align: middle;
  @media screen and (max-width: 1090px) {
    height: 56px;
    width: 140px;
  }
  @media screen and (max-width: 767px) {
    margin: 0;
    width: auto;
    height: 48px;
  }
`;

const GiftBtn = styled.img`
  position: absolute;
  top: -10px;
  right: 200px;
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

const Image = styled.img`
  vertical-align: middle;
  width: 24px;
  @media screen and (max-width: 767px) {
    height: 24px;
    margin: 12px 0;
    ${(props) => props.MOBdisplayNone ? 'display: none' : ''};
  }
`;

const Profile = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;


const LoginBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 38px 42px 0 0;
  height: 24px;
  float: right;
  @media screen and (max-width: 1090px) {
    height: 18px;
    margin: 27px 18px 0 0;
  }
  @media screen and (max-width: 767px) {
    margin: 12px 0 0;
    height: fit-content;
    width: 60px;
  }
`;

export default Header;
