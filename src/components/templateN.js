import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Body from './Body';
import {Grid} from '../elements';

const templateN = (props) => {

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' height='100vh'>
        <Sidebar />
        <Body header>
          
        </Body>
      </Grid>
    </React.Fragment>
  )
};

export default templateN;