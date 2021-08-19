import React from 'react';
import { Grid } from '../elements';

const SmallWindow = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Grid backgroundColor="#18181A" height="100vh" padding="220px 0 0" TABpadding='180px 0 0'>
        <Grid
          backgroundColor="#212123"
          width="400px"
          height="500px"
          margin="auto"
          padding="72px 48px"
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
