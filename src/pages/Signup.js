import React, { useRef } from 'react';
import SmallWindow from '../components/SmallWindow';
import { Grid, Text } from '../elements';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [password, setPwd] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [confirm_password, setConfirmPwd] = React.useState('');

  //select 값 가져오기
  const selectMail = useRef(null);

  const signup = () => {
    const user_mail = String(id + '@' + selectMail.current.value);

    const new_user = {
      user_mail,
      password,
      nickname,
      confirm_password,
    };
    dispatch(userActions.signUpDB(new_user));
  };

  return (
    <SmallWindow>
      <Grid height="100%">
        <Grid height="15%">
          <Grid height="30%" />
          <Grid is_center height="50%">
            <Text fontSize="3vh">LOGO</Text>
          </Grid>
        </Grid>
        <Grid height="10%">
          <TextBox>
            <Text lineHeight="6vh" fontSize="2vh" fontWeight="700">
              회원가입
            </Text>
          </TextBox>
        </Grid>
        <Grid height="15%">
          {/* 회원가입 작성 폼 */}
          <form>
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700">
                  이메일
                </Text>
              </label>
            </TextBox>
            <InputBox>
              <Input
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
              <Text margin="0 5px">@</Text>
              <Select ref={selectMail}>
                <option value="">선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
              </Select>
            </InputBox>
          </form>
          <Text fontSize="1.2vh" color="red">
            이미 사용중인 이메일입니다.
          </Text>
        </Grid>
        <Grid height="15%">
          <form>
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700">
                  비밀번호
                </Text>
              </label>
            </TextBox>
            <TextBox>
              <Text fontSize="1.2vh">8자 이상 입력해주세요</Text>
            </TextBox>
            <InputBox>
              <Input
                style={{ width: '98%' }}
                type="password"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
            </InputBox>
          </form>
        </Grid>
        <Grid height="15%">
          <form>
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700">
                  비밀번호 확인
                </Text>
              </label>
            </TextBox>
            <InputBox>
              <Input
                style={{ width: '98%' }}
                type="password"
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
              />
            </InputBox>
          </form>
          <Text fontSize="1.2vh" color="red">
            비밀번호가 일치하지 않습니다.
          </Text>
        </Grid>
        <Grid height="15%">
          <form>
            <TextBox>
              <label>
                <Text fontSize="1.5vh" fontWeight="700">
                  닉네임
                </Text>
              </label>
            </TextBox>
            <InputBox>
              <Input
                style={{ width: '98%' }}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
            </InputBox>
          </form>
          <Text fontSize="1.2vh" color="red">
            이미 사용중인 닉네임입니다.
          </Text>
        </Grid>
        <Grid height="15%">
          <Button onClick={() => signup()}>
            <Text fontSize="1.5vh" color="white">
              회원가입 완료
            </Text>
          </Button>
        </Grid>
      </Grid>
    </SmallWindow>
  );
};

const TextBox = styled.div`
  text-align: left;
`;

const InputBox = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 44.5%;
  height: 3vh;
  border: 1px solid #ccc;
  outline: none;
`;

const Select = styled.select`
  width: 45%;
  height: 3.5vh;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  height: 60%;
  background-color: #444;
  border: none;
`;

export default Signup;
