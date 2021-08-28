import React, { useEffect } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from './redux/modules/user';
import { getCookie } from './shared/cookie';

//메인 페이지
import MainN from './pages/MainN';

//로그인 페이지
import Login from './pages/Login';
import SocialLogin from './pages/SocialLogin';

//자유 게시판
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';

//부트캠프 게시판
import BootMain from './pages/BootMain';
import BootDetail from './pages/BootDetail';
import BootReviewWrite from './pages/BootReviewWrite';
import BootPost from './pages/BootPost';

//질문 게시판
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import QuestionWrite from './pages/QuestionWrite';

//마이 페이지
import Mypage from './pages/Mypage';
import MypagePic from './pages/MypagePic';
import MypageBootcamps from './pages/MypageBootcamps';
import MypagePost from './pages/MypagePost';
import MypageBookmarks from './pages/MypageBookmarks';

//로딩 스피너
import Spinner from './components/Spinner';

// NotFound 페이지
import NotFound from './shared/NotFound';

function App() {
  const dispatch = useDispatch();
  const is_loading = useSelector(state => state.status.is_loading);
  const token = getCookie('refreshToken');
  const provider = getCookie('provider');

  useEffect(() => {
    if (token && provider === 'google') {
      dispatch(userActions.googleRefresh());
      dispatch(userActions.userCheckDB());
    } else if (token && provider === 'kakao') {
      dispatch(userActions.kakaoRefresh());
      dispatch(userActions.userCheckDB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={MainN} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={SocialLogin} />
          <Route path="/common/list" exact component={CommonList} />
          <Route path="/common/detail/:id" exact component={CommonDetail} />
          <Route path="/common/write" exact component={CommonWrite} />
          <Route path="/common/write/:id" exact component={CommonWrite} />
          <Route path="/question" exact component={QuestionList} />
          <Route path="/question/write" exact component={QuestionWrite} />
          <Route path="/question/write/:id" exact component={QuestionWrite} />
          <Route path="/question/detail/:id" exact component={QuestionDetail} />
          <Route path="/boot" exact component={BootMain} />
          <Route path="/boot/:name" exact component={BootDetail} />
          <Route path="/boot/:name/review" exact component={BootReviewWrite} />
          <Route path="/boot/:name/post/:id" exact component={BootPost} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/mypage/pic" exact component={MypagePic} />
          <Route path="/mypage/mycamp" exact component={MypageBootcamps} />
          <Route path="/mypage/mypost" exact component={MypagePost} />
          <Route path="/mypage/mybookmarks" exact component={MypageBookmarks} />
          {/* <Route path="/mypage/deleteuser" exact component={DeleteUser} /> */}
          <Route render={(props) => <NotFound history={props.history} />} />
        </Switch>
      </ConnectedRouter>
      <Spinner visible={is_loading} />
    </React.Fragment>
  );
}

export default App;
