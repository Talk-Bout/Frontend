import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Contact } from '.';
import { LogoNew, Home_nav, Home_nav_white, Boot_nav, Boot_nav_white, Qna_nav, Qna_nav_white, Talk_nav, Talk_nav_white, Mypage, Mypage_white } from '../image';
import { history } from '../redux/ConfigureStore';
import { useSelector } from 'react-redux';

const Footer = (props) => {
  const url = window.location.pathname.split('/')[1];
  const is_login = useSelector(state => state.user.is_login);

  return (
    <React.Fragment>
      <Grid height='250px' TABheight='fit-content' MOBheight='168px' margin='0 0 0' TABmargin='64px 0 0' MOBmargin='24px 0 0' backgroundColor='#0E1013' padding='24px 20px' TABpadding='24px 20px 36px' MOBpadding='6px 16px 64px' MOBdisplay='none' display='flex' position='relative' bottom='0'>
        <Grid width='30%'>
          <Image src={LogoNew} alt='로고' />
          <Grid display='flex' justifyContent='space-between' width='300px' TABwidth='250px' margin='56px 0 0 40px' TABmargin='40px 0 0 20px' MOBmargin='8px 4px'>
            <Text fontSize='12px' TABfontSize='4px' color='#bdc1c6' cursor='default'>© 2021 Project Talk'bout</Text>
            <Text fontSize='12px' TABfontSize='4px' color='#bdc1c6' margin='0 28px' TABmargin='0 24px' cursor='default'>All rights reserved.</Text>
          </Grid>
        </Grid>
        <Grid width='60%' height='100%'>
          <Contact />
        </Grid>
      </Grid>
      <Navbar>
        <Menu src={url === '' ? Home_nav_white : Home_nav} onClick={() => history.push('/')} />
        <Menu src={url === 'boot' ? Boot_nav_white : Boot_nav} onClick={() => history.push('/boot')} />
        <Menu src={url === 'question' ? Qna_nav_white : Qna_nav} onClick={() => history.push('/question')} />
        <Menu src={url === 'common' ? Talk_nav_white : Talk_nav} onClick={() => history.push('/common/list')} />
        {/* 마이페이지 메뉴는 로그인 상태에서만 보이기 */}
        {is_login &&
          <Menu src={url === 'mypage' ? Mypage_white : Mypage} onClick={() => history.push('/mypage')} />}
      </Navbar>
    </React.Fragment>
  )
};

const Image = styled.img`
  margin: 0 0 0 20px;
  @media screen and (max-width: 1150px) {
    width: 300px;
    margin: 0;
  }
  @media screen and (max-width: 767px) {
    height: 48px;
    width: auto;
  }
`;

const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 53px;
  background-color: #202124;
  display: flex;
  justify-content: space-around;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 0 5px;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #4e4e4e;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.img`
  @media screen and (max-width: 767px) {
    height: 48px;
    width: auto;
    cursor: pointer;
  }
`;

export default Footer;