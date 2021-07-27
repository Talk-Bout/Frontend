import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

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
        <Route path="/info" exact component={InfoList} />
        <Route path="/infowrite" exact component={InfoWrite} />
        <Route path="/infodetail" exact component={InfoDetail} />
        <Route path="/Review" exact component={ReviewMain} />
        <Route path="/Review/list" exact component={ReviewList} />
        <Route path="/Review/detail" exact component={ReviewDetail} />
        <Route path="/Review/write" exact component={ReviewWrite} />
      </BrowserRouter>
      <Login></Login>
    </React.Fragment>
  );
}

export default App;
