import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';
import { history } from '../redux/ConfigureStore';

const SmallWindow = (props) => {
  const { children } = props;
  const url = window.location.pathname;
  if (url === '/mypage/edit') {
    // 마이페이지 정보수정 페이지일 때,
    return (
      // 로그인(회원가입)보다 면적이 큼
      <React.Fragment>
        <Grid backgroundColor="#18181A" height="93vh" padding="7vh 15vh">
          <Grid
            backgroundColor="#212123"
            width="20vw"
            height="70vh"
            margin="auto"
            padding="3vh 2vw"
          >
            {children}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid backgroundColor="#18181A" height="100vh" padding="15vh">
        <Grid
          backgroundColor="#212123"
          width="30vw"
          height="65vh"
          margin="auto"
          padding="4%"
        >
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

SmallWindow.defaultProps = {
  children: null,
};

export default SmallWindow;
