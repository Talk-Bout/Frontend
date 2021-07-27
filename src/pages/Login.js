import React from 'react';
import styled from 'styled-components';
import SmallWindow from '../components/SmallWindow';
import {Grid, Input, Text} from '../elements';
import { TextField } from '@material-ui/core';
import { AiFillGoogleCircle } from 'react-icons/ai';

const Login = (props) => {

  return (
    <SmallWindow>
      <Grid height='100%' display='flex'>
        <Grid height='25%'>
          <Grid height='50%'/>
          <Grid is_center height='50%'><Text fontSize='3vh'>LOGO</Text></Grid>
        </Grid>
        <Grid height='30%'>
          <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="이메일" variant="outlined" fullWidth required margin='normal'/>
            <TextField id="outlined-basic" label="비밀번호" variant="outlined" fullWidth type='password' required/>
          </form>
          <Text fontSize='1.2vh' color='red'>가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.</Text>
        </Grid>
        <Grid height='20%'>
          <Button><Text fontSize='1.5vh' color='white'>로그인</Text></Button>
          <Grid is_flex padding='0 10px' margin='5px 0 0'>
            <HelpDiv><a><Text fontSize='1.3vh' color='#555'>아이디 찾기</Text></a></HelpDiv>
            <HelpDiv><a><Text fontSize='1.3vh' color='#555'>비밀번호 찾기</Text></a></HelpDiv>
            <HelpDiv><a><Text fontSize='1.3vh' color='#555'>회원가입</Text></a></HelpDiv>
          </Grid>
        </Grid>
        <Grid height='25%'>
          <Button style={{backgroundColor: '#888'}}><AiFillGoogleCircle size='2vh' style={{marginRight: '0.3vw', verticalAlign: 'middle'}}/><Text fontSize='1.5vh' color='#ddd'>Google로 로그인</Text></Button>
        </Grid>
      </Grid>
    </SmallWindow>
  )
};

const Button = styled.button`
  width: 100%;
  height: 40%;
  background-color: #444;
  border: none;
`;

const HelpDiv = styled.div`
  padding: 0 10px;
`;


export default Login;