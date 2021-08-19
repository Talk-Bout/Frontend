import React from 'react';
import { Grid } from '../elements';
import { Sidebar, Body, Banner, MainBoot, MainQna, MainTalk } from '../components';

const MainN = (props) => {
  
  return (
    <React.Fragment>
      <Grid className="background" display='flex'>
        <Sidebar />
        <Body header footer>
          <Grid className="body-inner" height="100%">
            <Banner />
            <MainBoot />
            <MainTalk />
            <MainQna />
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

export default MainN;
