import React from 'react';
import styled from 'styled-components';
import SmallWindow from '../components/SmallWindow';
import { Grid, Input, Text, Image,Button} from '../elements';
import { TextField } from '@material-ui/core';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

//로고
import Logo from '../image/Logo.png';
import google_logo from '../image/google_logo.png';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const Login = (props) => {

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' >
        <Sidebar />
        <Body header>
        <Grid backgroundColor="#18181A" height="100vh" padding="7vh">
          <Grid backgroundColor="#212123" width="25vw" height="65vh"
          margin="auto" padding="3vh 2.5vw">
            <Grid height="100%" >
              <Grid height="25%" padding="9% 0%">
                <Text p margin="0" fontSize="3.4vh" color="#F8F9FA">
                  비밀번호 재설정
                </Text>
                <Text p margin="2.5% 0 0 0" fontSize="2vh" color="#F8F9FA">
                  가입 시 입력한 이메일을 입력해주세요.
                </Text>
              </Grid>
              <Grid height="30%" padding="9% 0%">
                <Text color="#80868B"  margin="3% 0%">이메일</Text>
                <Grid display="flex" margin="5% 0" width="100%">
                  <Input border="1px solid #80868B" color="#F8F9FA" border_radius="1vh" width="31%" font_size="2vh" placeholder="이메일"
                  bg="transparent" outline="none" padding="0 3%" margin="0 1.5% 0 0"></Input>
                  <Text fontSize="3.2vh" height="7vh" color="#80868B">@</Text>
                  <Select>
                  <Option value="">선택해주세요</Option>
                  <Option value="gmail.com">gmail.com</Option>
                  <Option value="naver.com">naver.com</Option>
                  <Option value="hanmail.net">hanmail.net</Option>
                  </Select>
                </Grid>     
              </Grid>
              <Grid height="20%" padding="3% 0">
                <Text p margin="0" color="#FF7070" fontSize="1.8vh">입력한 정보와 일치하는 회원이 없습니다.</Text>
                <Text p margin="0" color="#FF7070" fontSize="1.8vh">이메일을 다시 확인하시거나 회원가입을 진행해 주세요.</Text>
              </Grid>
              <Grid height="25%">
                <Button height="55%" font_size="2.3vh" bg="#7879F1" border="none" color="#F8F9FA" border_radius="2vh">이메일로 비밀번호 찾기</Button>
              </Grid>
            </Grid>
        </Grid>
        </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Select = styled.select`
border-radius: 1vh;
color: #3C4043;
font-size: 2vh;
width: 50%;
background-color: transparent;
outline: none;
padding: 0 3%;
margin: 0 0 0 1.5%;
`;

const Option = styled.option`
background-color: #18181A;
color: #F8F9FA;
`;

export default Login;
