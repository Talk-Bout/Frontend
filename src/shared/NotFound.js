import React from 'react';
import styled from 'styled-components';

import { Grid, Text, Image } from '../elements/index';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import notfound_logo from '../image/notfound_logo.png';

const NotFound = (props) => {
  return (
    <Grid display="flex" height="100vh" TABheight='1024px'>
      <Sidebar />
      <Body header>
        <Wrapper>
          <Grid>
            <Image
              width="407px"
              TABwidth='322px'
              src={notfound_logo}
              height="149px"
              TABheight='118px'
              margin="120px auto 0"
              TABmargin='98px auto 0'
            />
          </Grid>
          <Grid margin="64px auto 24px auto" TABmargin='48px auto 16px'>
            <Text fontWeight="700" fontSize="32px" TABfontSize='20px' color="#E9EAED">
              죄송합니다. 찾을 수 없는 페이지입니다 :(
            </Text>
          </Grid>
          <Grid>
            <Text fontSize="16px" color="#E9EAED" TABfontSize='12px'>
              존재하지 않는 소스를 입력하셨거나
            </Text>
            <Text p fontSize="16px" margin="auto" color="#E9EAED" TABfontSize='12px'>
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
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
