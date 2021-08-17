import React, { useEffect } from 'react';
import { Grid } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import BannerN from '../components/BannerN';
import MainBoot from '../components/MainBoot';
import MainQna from '../components/MainQna';
// import MainNews from '../components/MainNews';
import MainTalk from '../components/MainTalk';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const MainN = (props) => {
  // const dispatch = useDispatch();                 // 카카오 소셜로그인 시험 중

  // useEffect(() => {
  //   dispatch(userActions.authKakaoDB());
  // }, []);
  

  return (
    <React.Fragment>
      <Grid className="background" display='flex'>
        <Sidebar />
        {/* 헤더가 필요하면 바디 안에 header넣기, 아니면 body만 */}
        <Body header footer>
          <Grid className="body-inner" height="100%">
            <BannerN />
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
