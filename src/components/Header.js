import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
// import { Search } from '../image';
import { LogoNew, Profile_small, CaretDown, Gift } from '../image';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Button, Grow, Paper, Popper, MenuList, MenuItem, ClickAwayListener } from '@material-ui/core';
import { getCookie } from '../shared/cookie';

const Header = (props) => {
  const { opacity, TABopacity, MOBopacity } = props;
  const dispatch = useDispatch();
  const token = getCookie('refreshToken');
  const profilePic = useSelector(state => state.user.user.profilePic);

  // 드롭다운 메뉴
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  // 펼치기
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // 접기
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
            <Logo src={LogoNew} alt="토크부트 로고" onClick={() => history.push('/')} />
          </Grid>
          {/* 피드백 버튼 */}
          <GiftBtn src={Gift} onClick={() => getFeedback()} />
          <Grid width="auto" margin="36px 50px" TABmargin='22px 18px' MOBdisplay='none' display='flex'>
            {/* 북마크 메뉴 */}
            <Text
              color="#7879f1"
              fontSize="32px"
              TABfontSize='24px'
              verticalAlign="middle"
              margin="-4px 16px 0 0"
              TABmargin='0 6px 0 0'
              cursor="pointer"
              _onClick={() => history.push('/mypage/mybookmarks')}
            >
              <BsFillBookmarkFill />
            </Text>
            {/* 프로필 이미지 */}
            <Profile>
              <ProfileImg onClick={() => history.push('/mypage')} src={profilePic ? `https://fw3efsadfcv.shop${profilePic}` : Profile_small} />
            </Profile>
            {/* 드롭다운 메뉴 */}
            <DropDown>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={{ padding: 0, minWidth: 0, width: '24px', margin: '0 0 0 8px' }}
              >
                <Text color="#5F6368" fontSize="4.6px" TABmargin='0 0 0 -10px'>
                  <img src={CaretDown} alt="메뉴" />
                </Text>
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList className='MenuList' autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={(e) => {handleClose(e); history.push('/mypage')}}>마이페이지</MenuItem>
                          <MenuItem onClick={(e) => {handleClose(e); logout()}}>로그아웃</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </DropDown>
            </Grid>
          {/* 모바일 버전에서만 보이는 로그아웃 버튼 */}
          <LogoutBtn type="button" onClick={() => logout()}>
            <Text
              MOBfontSize='12px'
              color="#f8f9fa"
              cursor="pointer"
              TABlineHeight='18px'
              MOBmargin='0'
            >
              로그아웃
            </Text>
          </LogoutBtn>
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
          MOBpadding='0 0 0 18px'
          MOBdisplay='flex'
          MOBjustifyContent='space-between'
        >
          <Logo src={LogoNew} alt="토크부트 로고" onClick={() => history.push('/')} />
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

const Logo = styled.img`
  height: 84px;
  width: auto;
  margin: 0 8px;
  cursor: pointer;
  vertical-align: middle;
  @media screen and (max-width: 1150px) {
    height: 56px;
    width: auto;
  }
  @media screen and (max-width: 767px) {
    margin: 0 0 0 -10px;
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
  @media screen and (max-width: 1150px) {
    width: 100px;
    height: 100px;
    right: 120px;
  }
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 60px;
    top: 3px;
    right: 80px;
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

const DropDown = styled.div`
  .MuiList-root {
    position: absolute;
    top: 20px;
    right: 0px;
    background-color: #2E3134;
    color: #f1f3f4;
    opacity: 0.8;
    border-radius: 8px;
  }
`;

const LoginBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 38px 42px 0 0;
  height: 24px;
  float: right;
  @media screen and (max-width: 1150px) {
    height: 18px;
    margin: 27px 18px 0 0;
  }
  @media screen and (max-width: 767px) {
    margin: 14px 0 0;
    height: fit-content;
    min-width: 60px;
  }
`;

const LogoutBtn = styled.button`
  @media screen and (min-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    background-color: transparent;
    border: none;
    padding: 0;
    float: right;
    margin: 14px 17px 0 0;
    height: fit-content;
    width: 70px;
  }
`;

export default Header;
