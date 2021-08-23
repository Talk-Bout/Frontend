import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { LogoImg, Home_nav, Home_nav_white, Boot_nav, Boot_nav_white, Qna_nav, Qna_nav_white, Talk_nav, Talk_nav_white, Mypage, Mypage_white } from '../image';
import { history } from '../redux/ConfigureStore';

const Footer = (props) => {
  const url = window.location.pathname.split('/')[1];

  return (
    <React.Fragment>
      <Grid height='250px' TABheight='182px' MOBheight='168px' margin='80px 0 0' TABmargin='64px 0 0' MOBmargin='24px 0 0' backgroundColor='#0E1013' padding='24px 20px' TABpadding='24px 20px 36px' MOBpadding='6px 16px 64px'>
        <Image src={LogoImg} alt='로고' />
        <Text p fontSize='14px' fontWeight='700' color='#bdc1c6' margin='0 8px 0' TABmargin='0 4px 0' cursor='default'>토크부트를 만든 사람들 소개</Text>
        <Grid display='flex' justifyContent='space-between' width='fit-content' margin='16px 8px 0' TABmargin='12px 4px' MOBmargin='8px 4px'>
          <Text fontSize='12px' MOBfontSize='10px' color='#bdc1c6' cursor='default'>© 2021 Project Talk'bout</Text>
          <Text fontSize='12px' MOBfontSize='10px' color='#bdc1c6' margin='0 24px' cursor='default'>All rights reserved.</Text>
        </Grid>
      </Grid>
      <Navbar>
        <Menu src={url === '' ? Home_nav_white : Home_nav} onClick={() => history.push('/')} />
        <Menu src={url === 'boot' ? Boot_nav_white : Boot_nav} onClick={() => history.push('/boot')} />
        <Menu src={url === 'common' ? Talk_nav : Talk_nav} onClick={() => history.push('/common/list')} />
        <Menu src={url === 'question' ? Qna_nav_white : Qna_nav} onClick={() => history.push('/question')} />
        <Menu src={url === 'mypage' ? Mypage_white : Mypage} onClick={() => history.push('/mypage')} />
      </Navbar>
    </React.Fragment>
  )
};

const Image = styled.img`
  @media screen and (max-width: 1090px) {
    height: 56px;
    width: 140px;
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
  height: 48px;
  background-color: #202124;
  display: flex;
  justify-content: space-around;
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