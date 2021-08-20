import React from 'react';
import { Grid } from '../elements';
import { Header, Footer } from '../components';

const Body = (props) => {
  const { header, children, footer, opacity, TABopacity } = props;

  return (
    <React.Fragment>
      <Grid
        className="whole-body"
        backgroundColor="#17181b"
        minHeight="100vh"
        width="100vw"
      >
        {header ? <Header opacity={opacity} TABopacity={TABopacity} /> : ''}
        <Grid className="body" width="100%" padding="40px 42px 0" TABpadding='32px 18px 0' minHeight='100vh'>
          {children}
        </Grid>
        {footer ? <Footer /> : ''}
      </Grid>
    </React.Fragment>
  );
};

Body.defaultProps = {
  header: false,
  children: null,
  footer: false,
};

export default Body;
