import React, { useEffect } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from './redux/modules/user';

// NotFound 페이지
import NotFound from './shared/NotFound';

//메인 페이지
import MainN from './pages/MainN';

//로그인 회원가입 페이지
import Login from './pages/Login';
// import Signup from './pages/SignUpOrigin';
import Signup from './pages/Signup';
import ChangeInfo from './pages/ChangeInfo';

//자유 게시판 페이지
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';

//부트캠프별 페이지
import BootMain from './pages/BootMain';
import BootDetail from './pages/BootDetail';
import BootReviewWrite from './pages/BootReviewWrite';
import BootCommuWrite from './pages/BootCommuWrite';
import BootPost from './pages/BootPost';

//질문 게시판 페이지
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import QuestionWrite from './pages/QuestionWrite';

//뉴스 게시판 페이지
import NewsList from './pages/NewsList';

//마이 페이지
import Mypage from './pages/Mypage';
import MypagePost from './pages/MypagePost';
// import MyPageEdit from './pages/MyPageEdit';
import DeleteUser from './pages/DeleteUser';
import PageEdit from './pages/PageEdit';
import MypageBookmarks from './pages/MypageBookmarks';

//로딩 스피너
import Spinner from './components/Spinner';

function App() {
  const dispatch = useDispatch();
  const is_loading = useSelector(state => state.status.is_loading);

  useEffect(() => {
    dispatch(userActions.stayLogInDB());
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={MainN} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/changeInfo" exact component={ChangeInfo} />
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
          <Route path="/boot/:name/community" exact component={BootCommuWrite} />
          <Route path="/boot/:name/community/:id" exact component={BootCommuWrite} />
          <Route path="/boot/:name/post/:id" exact component={BootPost} />
          <Route path="/news/list" exact component={NewsList} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/mypage/mypost" exact component={MypagePost} />
          <Route path="/mypage/mybookmarks" exact component={MypageBookmarks} />
          <Route path="/mypage/deleteuser" exact component={DeleteUser} />
          <Route path="/mypage/edit" exact component={PageEdit} />
          <Route render={(props) => <NotFound history={props.history} />} />
        </Switch>
      </ConnectedRouter>
      <Spinner visible={is_loading} />
    </React.Fragment>
  );
}

export default App;
