import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import HeaderN from '../components/HeaderN';

const Body = (props) => {
  const {header, children} = props;

  return (
    <React.Fragment>
      <Grid className='whole-body' backgroundColor='#3c4043' height='100%' width='93vw'>
        {header ? <HeaderN /> : '' }
        <Grid className='body' width='100%' height='90%' padding='40px'>
            {children}
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

Body.defaultProps = {
  header: false,
  children: null,
}

export default Body;