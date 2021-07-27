import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

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
      <Route exact path="/commonlist" component={CommonList} />
      <Route exact path="/commondetail" component={CommonDetail} />
      <Route exact path="/commonwrite" component={CommonWrite} />
      <BrowserRouter>
        <Route path="/info" exact component={InfoList} />
        <Route path="/infowrite" exact component={InfoWrite} />
        <Route path="/infodetail" exact component={InfoDetail} />
        <Route path="/Review" exact component={ReviewMain} />
        <Route path="/Review/list" exact component={ReviewList} />
        <Route path="/Review/detail" exact component={ReviewDetail} />
        <Route path="/Review/write" exact component={ReviewWrite} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
