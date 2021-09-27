import React, { useEffect } from 'react';
import { Grid } from '../elements';
import { Header, Footer } from '../components';

const Body = (props) => {
  const { header, children, footer, MOBnopadding } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Grid
        className="whole-body"
        backgroundColor="#17181b"
        minHeight="100vh"
      >
        {header ? <Header /> : ''}
        <Grid className="body" width="100%" padding="140px 42px 0" TABpadding='90px 18px 0' MOBpadding={MOBnopadding ? '0' : '54px 17px 50px 18px'} minHeight='calc(100vh - 350px)' TABminHeight='calc(100vh - 276px)' MOBminHeight='calc(100vh - 50px)'>
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
