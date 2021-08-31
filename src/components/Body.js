import React, { useEffect } from 'react';
import { Grid } from '../elements';
import { Header, Footer } from '../components';

const Body = (props) => {
  const { header, children, footer, opacity, TABopacity, MOBopacity, MOBnopadding } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Grid
        className="whole-body"
        backgroundColor="#17181b"
        minHeight="100vh"
        width="100vw"
      >
        {header ? <Header opacity={opacity} TABopacity={TABopacity} MOBopacity={MOBopacity} /> : ''}
        <Grid className="body" width="100%" padding="40px 42px 0" TABpadding='18px 18px 0' MOBpadding={MOBnopadding ? '0' : '6px 17px 50px 18px'} minHeight='calc(100vh - 350px)' TABminHeight='calc(100vh - 276px)' MOBminHeight='calc(100vh - 50px)'>
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
