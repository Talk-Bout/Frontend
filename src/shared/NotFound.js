import React from 'react';
import styled from 'styled-components';

import { Grid, Text, Button, Image } from '../elements/index';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import notfound_logo from '../image/notfound_logo.png';

const NotFound = (props) => {
  return (
    <Grid display="flex" height="100vh">
      <Sidebar />
      <Body header>
        <Wrapper>
          <Grid>
            <Image
              width="35%"
              src={notfound_logo}
              height="18vh"
              margin="auto"
            />
          </Grid>
          <Grid margin="5% auto 2% auto">
            <Text fontWeight="700" fontSize="32px" color="#E9EAED">
              죄송합니다. 찾을 수 없는 페이지입니다 :(
            </Text>
          </Grid>
          <Grid>
            <Text fontSize="16px" color="#E9EAED">
              존재하지 않는 소스를 입력하셨거나
            </Text>
            <Text p fontSize="16px" margin="auto" color="#E9EAED">
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </Text>
          </Grid>
        </Wrapper>
      </Body>
    </Grid>
  );
};

const Wrapper = styled.div`
  padding: 5em;
  text-align: center;
  height: 100%;
  margin: 3% auto;
`;

export default NotFound;
