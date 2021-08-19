import React from 'react';
import { Grid } from '../elements';

const SmallWindow = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Grid backgroundColor="#18181A" height="100vh" padding="194px 0 0" TABpadding='160px 0 0'>
        <Grid
          backgroundColor="#212123"
          width="408px"
          height="638px"
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
