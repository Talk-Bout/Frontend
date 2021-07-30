import React from 'react';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/ConfigureStore';

//메인 페이지
import MainN from './pages/MainN';

//로그인 회원가입 페이지
import Login from './pages/Login';
import Signup from './pages/Signup';

//자유 게시판 페이지
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';

//부트캠프별 페이지
import BootMain from './pages/BootMain';
import BootInfo from './pages/BootInfo';
import BootPost from './pages/BootPost';
import BootWrite from './pages/BootWrite';

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
        <Route path="/" exact component={MainN} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/common/list" exact component={CommonList} />
        <Route path="/common/detail/:id" exact component={CommonDetail} />
        <Route path="/common/write" exact component={CommonWrite} />
        <Route path="/question" exact component={QuestionList} />
        <Route path="/question/write" exact component={QuestionWrite} />
        <Route path="/question/write/:id" exact component={QuestionWrite} />
        <Route path="/question/detail/:id" exact component={QuestionDetail} />
        <Route path="/boot" exact component={BootMain} />
        <Route path="/boot/info" exact component={BootInfo} />
        <Route path="/boot/post/:id" exact component={BootPost} />
        <Route path="/boot/write" exact component={BootWrite} />
        <Route path="/boot/write/:id" exact component={BootWrite} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/mypage/edit" exact component={MyPageEdit} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
