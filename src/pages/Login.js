import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { SmallWindow } from '../components';
import { KakaoLogin_btn, GoogleLogin_btn, LogoImg } from '../image';
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
          MOBwidth='140px'
          height='80px'
          MOBheight='56px'
          margin="0 auto"
          _onClick={() => history.push('/')}
          cursor="pointer"
        />
        <GoogleBtn src={GoogleLogin_btn} alt='구글 로그인' onClick={() => googleLogin()} />
        <KakaoBtn src={KakaoLogin_btn} alt='카카오 로그인' onClick={() => kakaoLogin()} />
      </Grid>
      <Grid is_flex position='absolute' left='calc((100% - 265px) / 2)' top='774px' TABtop='960px' MOBtop='627px' width='fit-content' margin='0 auto'>
        <Text fontSize='12px' color='#bdc1c6' margin='0 24px 0 0'>© 2021 Project Talk'bout</Text>
        <Text fontSize='12px' color='#bdc1c6'>All rights reserved.</Text>
      </Grid>
    </SmallWindow>
  );
};

const GoogleBtn = styled.img`
  margin: 136px auto 0;
  height: 48px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
  @media screen and (max-width: 1150px) {
    margin: 144px auto 0;
  }
  @media screen and (max-width: 767px) {
    margin: 128px auto 0;
    width: 300px;
  }
`;

const KakaoBtn = styled.img`
  margin: 16px auto 0;
  display: block;
  cursor: pointer;
  height: 48px;
  &:active {
    opacity: 0.7;
  }
  @media screen and (max-width: 767px) {
    width: 300px;
  }
`;

export default Login;
