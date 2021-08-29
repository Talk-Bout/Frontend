import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements/index';
import { Sidebar, Body } from '../components';
import notfound_logo from '../image/notfound_logo.png';
import { history } from '../redux/ConfigureStore';

const NotFound = (props) => {
  return (
    <Grid display="flex">
      <Sidebar />
      <Body header>
        <Wrapper>
          <Grid>
            <Image
              width="407px"
              TABwidth='322px'
              MOBwidth='164px'
              src={notfound_logo}
              height="149px"
              TABheight='118px'
              MOBheight='60px'
              margin="120px auto 0"
              TABmargin='98px auto 0'
              MOBmargin='120px auto 0'
            />
          </Grid>
          <Grid margin="64px auto 24px auto" TABmargin='48px auto 16px' MOBmargin='24px auto 8px'>
            <Text fontWeight="700" fontSize="32px" TABfontSize='20px' MOBfontSize='14px' color="#E9EAED">
              죄송합니다. 찾을 수 없는 페이지입니다 :(
            </Text>
          </Grid>
          <Grid>
            <Text fontSize="16px" color="#E9EAED" TABfontSize='12px' MOBfontSize='10px'>
              존재하지 않는 소스를 입력하셨거나
            </Text>
            <Text p fontSize="16px" margin="auto" color="#E9EAED" TABfontSize='12px' MOBfontSize='10px'>
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </Text>
            <Text p fontSize="20px" margin="16px auto" color="#7879f1" TABfontSize='12px' MOBfontSize='10px' cursor='pointer' hover='opacity: 0.7' _onClick={() => history.goBack()}>
              뒤로 가기
            </Text>
          </Grid>
        </Wrapper>
      </Body>
    </Grid>
  );
};

const Wrapper = styled.div`
  text-align: center;
  height: 100%;
`;

export default NotFound;
