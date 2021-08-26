import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { LogoImg, Home_nav, Home_nav_white, Boot_nav, Boot_nav_white, Qna_nav, Qna_nav_white, Talk_nav, Talk_nav_white, Mypage, Mypage_white, Little_home, Little_behance, Little_github } from '../image';
import { history } from '../redux/ConfigureStore';

const Footer = (props) => {
  const url = window.location.pathname.split('/')[1];

  return (
    <React.Fragment>
      <Grid height='250px' TABheight='182px' MOBheight='168px' margin='80px 0 0' TABmargin='64px 0 0' MOBmargin='24px 0 0' backgroundColor='#0E1013' padding='24px 20px' TABpadding='24px 20px 36px' MOBpadding='6px 16px 64px' MOBdisplay='none' display='flex'>
        <Grid width='30%'>
          <Image src={LogoImg} alt='로고' />
          <Text p fontSize='12px' margin='-20px 0 0 115px' MOBfontSize='10px' color='#A5A6F6' cursor='default'>부트캠퍼들의 속시원한 이야기</Text>
          <Grid display='flex' justifyContent='space-between' width='fit-content' margin='56px 40px 0' TABmargin='12px 4px' MOBmargin='8px 4px'>
            <Text fontSize='12px' MOBfontSize='10px' color='#bdc1c6' cursor='default'>© 2021 Project Talk'bout</Text>
            <Text fontSize='12px' MOBfontSize='10px' color='#bdc1c6' margin='0 24px' cursor='default'>All rights reserved.</Text>
          </Grid>
        </Grid>
        <Grid width='70%' height='100%'>
          <Contact>
            {/* <InfoImg src={footer_info} /> */}
            <Column>
              <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Design</Text></div>
              <div><Text color='#A5A6F6' fontSize='12px'>윤영미 <Icon src={Little_home} /></Text></div>
              <div></div>
              <div><Text color='#A5A6F6' fontSize='12px'>양서문 <Icon src={Little_behance} /></Text></div>
            </Column>
            <Column>
              <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Front-end</Text></div>
              <div><Text color='#A5A6F6' fontSize='12px'>이동민 <Icon src={Little_github} onClick={() => window.open('https://github.com/leedmeen', '_blank')} /></Text><Text color='#80868b' fontSize='12px'>Tel. +82 10-3204-0232</Text></div>
              <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Back-end</Text></div>
              <div><Text color='#A5A6F6' fontSize='12px'>정창길 <Icon src={Little_github} onClick={() => window.open('https://github.com/ombreman', '_blank')} /></Text><Text color='#80868b' fontSize='12px'>Tel. +44 79-0426-6484</Text></div>
              <div></div>
              <div><Text color='#A5A6F6' fontSize='12px'>방민수 <Icon src={Little_github} onClick={() => window.open('https://github.com/skylermbang', '_blank')} /></Text><Text color='#80868b' fontSize='12px'>Tel. +82 10-9422-0170</Text></div>
              <div></div>
              <div><Text color='#A5A6F6' fontSize='12px'>송하영 <Icon src={Little_github} onClick={() => window.open('https://github.com/hayasha', '_blank')} /></Text><Text color='#80868b' fontSize='12px'>Tel. +82 10-5069-0825</Text></div>
            </Column><Column>
              <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Team</Text></div>
              <div><Text color='#A5A6F6' fontSize='12px' cursor='pointer' _onClick={() => window.open('https://github.com/Talk-Bout', '_blank')}>https://github.com/Talk-Bout</Text></div>
              <div><Text color='#BDC1C6' fontSize='12px' fontWeight='700'>Repository</Text></div>
            </Column>
          </Contact>
        </Grid>
      </Grid>
      <Navbar>
        <Menu src={url === '' ? Home_nav_white : Home_nav} onClick={() => history.push('/')} />
        <Menu src={url === 'boot' ? Boot_nav_white : Boot_nav} onClick={() => history.push('/boot')} />
        <Menu src={url === 'common' ? Talk_nav : Talk_nav} onClick={() => history.push('/common/list')} />
        <Menu src={url === 'question' ? Qna_nav_white : Qna_nav} onClick={() => history.push('/question')} />
        <Menu src={url === 'common' ? Talk_nav_white : Talk_nav} onClick={() => history.push('/common/list')} />
        <Menu src={url === 'mypage' ? Mypage_white : Mypage} onClick={() => history.push('/mypage')} />
      </Navbar>
    </React.Fragment>
  )
};

const Image = styled.img`
  margin: 0 0 0 30px;
  @media screen and (max-width: 1090px) {
    height: 56px;
    width: 140px;
  }
  @media screen and (max-width: 767px) {
    height: 48px;
    width: auto;
  }
`;

const Contact = styled.div`
  background-color: #17181B;
  display: grid;
  grid-template-columns: 1fr 2.5fr 2fr;
  column-gap: 40px;
  padding: 28px 23px;
  width: max-content;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  width: max-content;
  & > div {
    vertical-align: middle;
  }
`;

const Icon = styled.img`
  width: 16px;
  vertical-align: text-top;
  margin: 0 8px;
  cursor: pointer;
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
  overflow-x: auto;
  overflow-y: hidden;
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