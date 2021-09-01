import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { SmallWindow } from '../components';
import { KakaoLogin_btn, GoogleLogin_btn, Google, LogoImg } from '../image';
import { history } from '../redux/ConfigureStore';
import { baseUrl } from '../shared/api';

const Login = (props) => {

  const googleLogin = () => {
    const googleApi = `${baseUrl}/oauth/google`;
    window.location.assign(googleApi);
  };

  const kakaoLogin = () => {
    const kakaoApi = `${baseUrl}/oauth/kakao`;
    window.location.assign(kakaoApi);
  };

  return (
    <SmallWindow>
      <Grid is_center height="100%" MOBheight='fit-content'>
        <Image
          src={LogoImg}
          width="210px"
          MOBwidth='200px'
          height='80px'
          MOBheight='80px'
          margin="0 auto"
          _onClick={() => history.push('/')}
          cursor="pointer"
        />
        {/* <GoogleBtn src={GoogleLogin_btn} alt='구글 로그인' onClick={() => googleLogin()} /> */}
        <GoogleBttn onClick={() => googleLogin()}><GoogleImg src={Google}/><GoogleSpan>구글  로그인</GoogleSpan></GoogleBttn>
        <KakaoBtn src={KakaoLogin_btn} alt='카카오 로그인' onClick={() => kakaoLogin()} />
        <Text p color='#5F6368' fontSize='16px' margin='20px 0 0' MOBfontSize='12px'>구글, 카카오로 로그인하기</Text>
      </Grid>
      <Grid is_flex position='absolute' left='calc((100% - 265px) / 2)' bottom='20px' MOBbottom='5px' width='fit-content' margin='0 auto'>
        <Text fontSize='12px' color='#bdc1c6' margin='0 24px 0 0'>© 2021 Project Talk'bout</Text>
        <Text fontSize='12px' color='#bdc1c6'>All rights reserved.</Text>
      </Grid>
    </SmallWindow >
  );
};

// const GoogleBtn = styled.img`
//   margin: 50px auto 0;
//   height: 48px;
//   display: block;
//   cursor: pointer;
//   &:active {
//     opacity: 0.7;
//   }
//   @media screen and (max-width: 767px) {
//     margin: 30px auto 0;
//   }
// `;

const GoogleBttn = styled.button`
  width: 195px;
  height: 48px;
  background-color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0;
  position: relative;
  margin: 50px auto 0;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const GoogleImg = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  left: 16px;
`;

const GoogleSpan = styled.span`
  color: rgba(0,0,0,0.54);
  font-size: 14px;
  font-family: Roboto, sans-serif;
  float: left;
  margin: 0 0 0 70px;
  font-weight: 700;
`;

const KakaoBtn = styled.img`
  margin: 20px auto 0;
  height: 48px;
  display: block;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

export default Login;
