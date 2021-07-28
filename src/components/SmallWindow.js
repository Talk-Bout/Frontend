import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Input, Text } from '../elements';

const SmallWindow = (props) => {
  const {children} = props;

  return (
    <React.Fragment>
      <Grid backgroundColor='gray' height='100vh' padding='15vh'>
        <Grid backgroundColor='#fff' width='20vw' height='65vh' margin='auto' padding='3vh 2vw'>
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

SmallWindow.defaultProps = {
  children: null,
}

export default SmallWindow;