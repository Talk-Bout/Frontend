import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SmallWindow from '../components/SmallWindow';
import { Grid, Input, Text, Image } from '../elements';
import { history } from '../redux/ConfigureStore';
import { actionCreators as userActions } from '../redux/modules/user';

//로고
import talkbout_logo_title from '../image/talkbout_logo_title.png';
import { FcGoogle } from 'react-icons/fc';

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPwd] = React.useState('');

  const login_check = useSelector((state) => state.user.is_error);

  const login = () => {
    dispatch(userActions.logInDB(email, password));
  };

  //onChange의 e.target.value안찍힐때 버튼에 콘솔로그 해보기!
  return (
    <SmallWindow>
      <Grid height="100%">
        <Grid height="25%">
          <Grid height="40%" />
          <Grid is_center height="50%">
            <Image
              src={talkbout_logo_title}
              width="60%"
              margin="auto"
              _onClick={() => history.push('/')}
              cursor="pointer"
            />
          </Grid>
        </Grid>
        <Grid height="30%">
          <form>
            {/* 이메일 입력란 */}
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
            {/* 비밀번호 입력란 */}
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
            {login_check ? (
              <Text fontSize="1.2vh" color="#ff7070">
                가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
              </Text>
            ) : null}
          </form>
        </Grid>

        <Grid height="20%">
          {/* 로그인 버튼 => 누르면 toast 나옴*/}
          <Button onClick={() => login()} color="#a5a6af">
            {/* <Button color="#a5a6af"> */}
            <Text fontSize="1.5vh" fontWeight="600" color="white">
              로그인
            </Text>
          </Button>
          <Grid is_flex padding="0 10px" margin="5px 0 0">
            {/* 비밀번호 재설정 페이지 이동 버튼 */}
            <HelpDiv>
              <A onClick={() => {}}>
                <Text fontSize="1.5vh" color="#555">
                  비밀번호 재설정
                </Text>
              </A>
            </HelpDiv>
            <HelpDiv>
              {/* 회원가입 페이지 이동 버튼 */}
              <A onClick={() => history.push('/signup')}>
                <Text fontSize="1.5vh" color="#555">
                  회원가입
                </Text>
              </A>
            </HelpDiv>
          </Grid>
        </Grid>
        <Grid height="25%">
          {/* 구글 로그인 버튼 */}
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
      <Grid></Grid>
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
  background-color: #a5a6f6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #7879f1;
  }
`;

const HelpDiv = styled.div`
  padding: 0 10px;
  display: inline;
`;

export default Login;
