import React from 'react';
import { Grid } from '../elements';

const SmallWindow = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Grid backgroundColor="#18181A" MOBbackgroundColor='#212123' height="100vh" padding="220px 0 0" TABpadding='180px 0 0' MOBpadding='0'>
        <Grid
          backgroundColor="#212123"
          MOBbackgroundColor='transparent'
          width="400px"
          height="500px"
          MOBheight='auto'
          margin="auto"
          padding="72px 48px"
          MOBpadding='88px 0 0'
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
