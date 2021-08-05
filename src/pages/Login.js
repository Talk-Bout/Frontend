import React from 'react';
import styled from 'styled-components';
import SmallWindow from '../components/SmallWindow';
import { Grid, Input, Text, Image } from '../elements';
import { TextField } from '@material-ui/core';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

//로고
import Logo from '../image/Logo.png';
import { FcGoogle } from 'react-icons/fc';

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPwd] = React.useState('');

  const login = () => {
    console.log(email, password);
    if (email === '' || password === '') {
      window.alert('이메일과 비밀번호를 입력해주세요');
      return;
    }
    dispatch(userActions.logInDB(email, password));
  };

  //onChange의 e.target.value안찍힐때 버튼에 콘솔로그 해보기!
  return (
    <SmallWindow>
      <Grid height="100%">
        <Grid height="25%">
          <Grid height="40%" />
          <Grid is_center height="50%">
            <Image src={Logo} width="60%" margin="auto" />
          </Grid>
        </Grid>
        <Grid height="30%">
          <form>
            <InputBox>
              <InformInput
                style={{ width: '98%' }}
                type="email"
                placeholder="이메일"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputBox>
            <InformInput
              style={{ width: '98%' }}
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
          </form>
          <Text fontSize="1.2vh" color="red">
            가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
          </Text>
        </Grid>
        <Grid height="20%">
          <Button onClick={() => login()} color="#a5a6af">
            <Text fontSize="1.5vh" color="white">
              로그인
            </Text>
          </Button>
          <Grid is_flex padding="0 10px" margin="5px 0 0">
            <HelpDiv>
              <A onClick={() => {}}>
                <Text fontSize="1.5vh" color="#555">
                  비밀번호 재설정
                </Text>
              </A>
            </HelpDiv>
            <HelpDiv>
              <A onClick={() => history.push('/signup')}>
                <Text fontSize="1.5vh" color="#555">
                  회원가입
                </Text>
              </A>
            </HelpDiv>
          </Grid>
        </Grid>
        <Grid height="25%">
          <Button style={{ backgroundColor: '#2e3134' }}>
            <FcGoogle
              size="2vh"
              style={{ marginRight: '0.3vw', verticalAlign: 'middle' }}
            />
            <Text fontSize="1.5vh" color="#ddd">
              Google로 로그인
            </Text>
          </Button>
        </Grid>
      </Grid>
    </SmallWindow>
  );
};

const A = styled.a`
  cursor: pointer;
`;
const TextBox = styled.div`
  text-align: left;
`;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 5%;
`;

const InformInput = styled.input`
  width: 44%;
  height: 5vh;
  border: 1px solid #80868b;
  border-radius: 5px;
  background-color: transparent;
  outline: none;
  caret-color: #80868b;
  color: #ffffff;
  padding: 1%;
`;
const Button = styled.button`
  width: 100%;
  height: 5vh;
  background-color: #7879f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;

const HelpDiv = styled.div`
  padding: 0 10px;
  display: inline;
`;

export default Login;
