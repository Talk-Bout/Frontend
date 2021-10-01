import React from 'react';
import { Grid } from '../elements';

const SmallWindow = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Grid backgroundColor="#18181A" MOBbackgroundColor='#212123' height="100vh" padding="150px 0 0" TABpadding='160px 0 0' MOBpadding='0'>
        <Grid
          backgroundColor="#202124"
          MOBbackgroundColor='transparent'
          width="408px"
          height="600px"
          TABheight='638px'
          MOBwidth='100%'
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
