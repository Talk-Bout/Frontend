import React from 'react';
import { Grid } from '../elements';
import HeaderN from '../components/HeaderN';
import Footer from '../components/Footer';

const Body = (props) => {
  const { header, children, footer, TABopacity } = props;

  return (
    <React.Fragment>
      <Grid
        className="whole-body"
        backgroundColor="#17181b"
        minHeight="100vh"
        width="100vw"
      >
        {header ? <HeaderN TABopacity={TABopacity}/> : ''}
        <Grid className="body" width="100%" padding="40px 42px 0" TABpadding='32px 18px 0'>
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
