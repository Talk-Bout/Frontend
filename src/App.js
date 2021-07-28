import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';

//자유 게시판 페이지
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';

//부트캠프별 리뷰 게시판 페이지
import ReviewMain from './pages/ReviewMain';
import ReviewList from './pages/ReviewList';
import ReviewDetail from './pages/ReviewDetail';
import ReviewWrite from './pages/ReviewWrite';

//정보 게시판 페이지
import InfoList from './pages/InfoList';
import InfoDetail from './pages/InfoDetail';
import InfoWrite from './pages/InfoWrite';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/common/list" exact component={CommonList} />
        <Route path="/common/detail" exact component={CommonDetail} />
        <Route path="/common/write" exact component={CommonWrite} />
        <Route path="/info" exact component={InfoList} />
        <Route path="/info/write" exact component={InfoWrite} />
        <Route path="/info/detail" exact component={InfoDetail} />
        <Route path="/review" exact component={ReviewMain} />
        <Route path="/review/list" exact component={ReviewList} />
        <Route path="/review/detail" exact component={ReviewDetail} />
        <Route path="/review/write" exact component={ReviewWrite} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
