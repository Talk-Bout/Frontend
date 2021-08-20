import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { SmallWindow } from '../components';
import { KakaoLogin_btn, GoogleLogin_btn, LogoImg } from '../image';
import { history } from '../redux/ConfigureStore';

const Login = (props) => {

  const googleLogin = () => {
    const googleApi = 'http://fw3efsadfcv.shop/oauth/google';
    window.location.assign(googleApi);
  };
  
  const kakaoLogin = () => {
    const kakaoApi = 'http://13.209.12.149/oauth/kakao';
    window.location.assign(kakaoApi);
  };

  //onChange의 e.target.value안찍힐때 버튼에 콘솔로그 해보기!
  return (
    <SmallWindow>
      <Grid height="100%">
        <Image
          src={LogoImg}
          width="210px"
          height='80px'
          margin="0 auto 16px"
          _onClick={() => history.push('/')}
          cursor="pointer"
        />
        <GoogleBtn src={GoogleLogin_btn} alt='구글 로그인' onClick={() => googleLogin()}/>
        <KakaoBtn src={KakaoLogin_btn} alt='카카오 로그인' onClick={() => kakaoLogin()}/>
      </Grid>
      <Grid is_flex margin='330px 0 0'>
        <Text fontSize='12px' color='#bdc1c6'>© 2021 Project Talk'bout</Text>
        <Text fontSize='12px' color='#bdc1c6' margin='0 24px'>All rights reserved.</Text>
      </Grid>
    </SmallWindow>
  );
};

const GoogleBtn = styled.img`
  margin: 100px auto 0;
  height: 48px;
  display: block;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
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
