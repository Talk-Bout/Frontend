import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Body from './Body';
import {Grid} from '../elements';

const templateN = (props) => {
  const {children} = props;

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' height='100vh'>
        <Sidebar />
        <Body header>
          {children}
        </Body>
      </Grid>
    </React.Fragment>
  )
};

templateN.defaultProps = {
  children : null,
}

export default templateN;