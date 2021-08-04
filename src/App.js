import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/ConfigureStore';

// NotFound 페이지
import NotFound from './shared/NotFound';

//템플릿 페이지
import templateN from './components/templateN';

//메인 페이지
import MainN from './pages/MainN';

//로그인 회원가입 페이지
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChangeInfo from './pages/ChangeInfo';

//자유 게시판 페이지
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';

//부트캠프별 페이지
import BootMain from './pages/BootMain';
import BootInfo from './pages/BootInfo';
import BootReview from './pages/BootReview';
import BootCommu from './pages/BootCommu';
import BootPost from './pages/BootPost';
import BootReviewWrite from './pages/BootReviewWrite';
import BootCommuWrite from './pages/BootCommuWrite';

//질문 게시판 페이지
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import QuestionWrite from './pages/QuestionWrite';

//뉴스 게시판 페이지
import NewsList from './pages/NewsList';

//마이 페이지
import Mypage from './pages/Mypage';
import MyPageEdit from './pages/MyPageEdit';

function App() {
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
          <Route path="/question" exact component={QuestionList} />
          <Route path="/question/write" exact component={QuestionWrite} />
          <Route path="/question/write/:id" exact component={QuestionWrite} />
          <Route path="/question/detail/:id" exact component={QuestionDetail} />
          <Route path="/boot" exact component={BootMain} />
          <Route path="/boot/info" exact component={BootInfo} />
          <Route path="/boot/review" exact component={BootReview} />
          <Route path="/boot/community" exact component={BootCommu} />
          <Route path="/boot/post/:id" exact component={BootPost} />
          <Route path="/boot/review/write" exact component={BootReviewWrite} />
          <Route
            path="/boot/review/write/:id"
            exact
            component={BootReviewWrite}
          />

          <Route
            path="/boot/review/write/:id"
            exact
            component={BootReviewWrite}
          />
          <Route
            path="/boot/community/write"
            exact
            component={BootCommuWrite}
          />
          <Route
            path="/boot/community/write/:id"
            exact
            component={BootCommuWrite}
          />
          <Route path="/news/list" exact component={NewsList} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/mypage/edit" exact component={MyPageEdit} />
          <Route render={(props) => <NotFound history={props.history} />} />
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
