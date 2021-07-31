import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { history } from '../redux/ConfigureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import Search from '../image/search_black.png';

const HeaderN = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const logOutBtn = () => {
    dispatch(userActions.logOut());
    history.push('/');
  };

  if (is_login) {
    return (
      <React.Fragment>
        <Grid className='header' width='100%' height='80px' borderBottom='1px solid #80868b' display='flex' justify_content='space-between' padding='1vh 40px 1vh 40px'>
          <Grid className='search' height='100%' width='90%' padding='10px 0 0' margin='5px 0 0'>
            <img src={Search} style={{verticalAlign: 'middle'}} alt='검색'/><Input placeholder='검색어를 입력하세요.'></Input>
          </Grid>
          <Grid className="login" height="100%" width="50px">
            <TextBox
              onClick={() => {
                logOutBtn();
              }}
            >
              <Text p color="#f8f9fa" text_align="center">
                로그아웃
              </Text>
            </TextBox>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid className='header' width='100%' height='80px' borderBottom='1px solid #5F6368' display='flex' justify_content='space-between' padding='1vh 40px 1vh 40px'>
        <Grid className='search' height='100%' width='90%' padding='10px 0 0' margin='5px 0 0'>
          <img src={Search} style={{verticalAlign: 'middle'}} alt='검색'/><Input placeholder='검색어를 입력하세요.'></Input>
        </Grid>
        <Grid className='login' height='100%' width='50px'>
          <TextBox onClick={() => history.push('/login')}><Text p fontSize='1.7vh' color='#f8f9fa' text_align='center'>로그인</Text></TextBox>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Input = styled.input`
  border: none;
  width: 30%;
  background-color: #17181b;
  color: #80868b;
  &::placeholder {
    color: #80868b;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const TextBox = styled.div`
  cursor: pointer;
  height: 25px;
`;

export default HeaderN;
