import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/ConfigureStore';

//메인 페이지
import Main from './pages/Main';

//로그인 회원가입 페이지
import Login from './pages/Login';
import Signup from './pages/Signup';

//자유 게시판 페이지
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';

//부트캠프별 리뷰 게시판 페이지
import ReviewMain from './pages/ReviewMain';
import ReviewList from './pages/ReviewList';
import ReviewDetail from './pages/ReviewDetail';
import ReviewWrite from './pages/ReviewWrite';

//질문 게시판 페이지
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import QuestionWrite from './pages/QuestionWrite';

//마이 페이지
import Mypage from './pages/Mypage';
import MyPageEdit from './pages/MyPageEdit';

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/common/list" exact component={CommonList} />
        <Route path="/common/detail" exact component={CommonDetail} />
        <Route path="/common/write" exact component={CommonWrite} />
        <Route path="/question" exact component={QuestionList} />
        <Route path="/question/write" exact component={QuestionWrite} />
        <Route path="/question/detail/:id" exact component={QuestionDetail} />
        <Route path="/review" exact component={ReviewMain} />
        <Route path="/review/list" exact component={ReviewList} />
        <Route path="/review/detail/:id" exact component={ReviewDetail} />
        <Route path="/review/write" exact component={ReviewWrite} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/mypage/edit" exact component={MyPageEdit} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
