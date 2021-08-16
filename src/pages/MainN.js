import React, { useEffect } from 'react';
import { Grid } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import BannerN from '../components/BannerN';
import MainBoot from '../components/MainBoot';
import MainQna from '../components/MainQna';
// import MainNews from '../components/MainNews';
import MainTalk from '../components/MainTalk';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';

const MainN = (props) => {


  return (
    <React.Fragment>
      <Grid className="background" display='flex'>
        <Sidebar />
        {/* 헤더가 필요하면 바디 안에 header넣기, 아니면 body만 */}
        <Body header footer>
          <Grid className="body-inner" height="100%">
            <BannerN
              title1="수강생들의"
              title2="100% 리얼 후기!"
              description="실제 수강생들이 평가하는 부트캠프는 어떤지 확인해보세요."
            />
            <MainBoot />
            <MainTalk />
            {/* <MainNews /> */}
            <MainQna />
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

export default MainN;
