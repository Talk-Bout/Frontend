import React, { useEffect } from 'react';
import { Grid } from '../elements';
import { Sidebar, Body, Banner, MainBoot, MainQna, MainTalk } from '../components';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { getCookie } from '../shared/cookie';

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
