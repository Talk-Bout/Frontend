import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { SmallWindow } from '../components';
import { KakaoLogin_btn, GoogleLogin_btn, LogoImg } from '../image';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';


const Login = (props) => {
  const dispatch = useDispatch();
  // const [email, setEmail] = React.useState('');
  // const [password, setPwd] = React.useState('');

  // const login_check = useSelector((state) => state.user.is_error);

  // const login = () => {
  //   dispatch(userActions.logInDB(email, password));
  // };

  const kakaoLogin = () => {
    const kakaoApi = 'http://13.209.12.149/oauth/kakao';
    window.location.assign(kakaoApi);
  }

  const googleLogin = () => {
    const googleApi = 'http://fw3efsadfcv.shop/oauth/google';
    window.location.assign(googleApi);
  }

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
        {/* <form> */}
        {/* 이메일 입력란 */}
          {/* <InformInput
            type="email"
            placeholder="이메일"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> */}
          {/* 비밀번호 입력란 */}
          {/* <InformInput
            type="password"
            placeholder="비밀번호"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
          />
          {login_check ? (
            <Text fontSize="14px" color="#ff7070">
              가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
            </Text>
          ) : null}
          </form> */}
          {/* 로그인 버튼 => 누르면 toast 나옴*/}
          {/* <Button onClick={() => login()} color="#a5a6af"> */}
            {/* <Button color="#a5a6af"> */}
            {/* <Text fontSize="14px" fontWeight="700" color="white">
              로그인
            </Text>
          </Button>
          <Grid is_flex margin="16px 0 60px"> */}
            {/* 비밀번호 재설정 페이지 이동 버튼 */}
            {/* <Text fontSize="14px" color="#80868b" margin='0 24px 0 0'>
              비밀번호 재설정
            </Text> */}
            {/* 회원가입 페이지 이동 버튼 */}
            {/* <Text fontSize="14px" color="#80868b" _onClick={() => history.push('/signup')}>
              회원가입
            </Text>
          </Grid> */}
          {/* 구글 로그인 버튼 */}
          {/* <Button style={{ backgroundColor: '#2e3134', width: '200px', display: 'block', margin: 'auto' }}>
            <FcGoogle
              size="24px"
              style={{ marginRight: '25px', verticalAlign: 'middle' }}
            />
            <Text fontSize="14px" color="#f8f9fa" margin='0 30px 0 0'>
              Google 로그인
            </Text>
          </Button> */}
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
`;

const KakaoBtn = styled.img`
  margin: 20px auto 0;
  height: 48px;
  display: block;
`;

export default Login;
