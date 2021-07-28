import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

<<<<<<< Updated upstream
//정보 게시판 페이지
import InfoList from './pages/InfoList';
import InfoDetail from './pages/InfoDetail';
import InfoWrite from './pages/InfoWrite';
=======
//부트캠프별 리뷰 게시판 페이지
import ReviewMain from './pages/ReviewMain';
import ReviewList from './pages/ReviewList';
import ReviewDetail from './pages/ReviewDetail';
import ReviewWrite from './pages/ReviewWrite';

//질문 게시판 페이지
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
>>>>>>> Stashed changes

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
<<<<<<< Updated upstream
        <Route path="/info" exact component={InfoList} />
        <Route path="/infoWrite" exact component={InfoWrite} />
        <Route path="/infoDetail" exact component={InfoDetail} />
=======
        <Route path="/Review" exact component={ReviewMain} />
        <Route path="/Review/list" exact component={ReviewList} />
        <Route path="/Review/detail" exact component={ReviewDetail} />
        <Route path="/Review/write" exact component={ReviewWrite} />
        <Route path="/Question" exact component={QuestionList} />
        <Route path="/Question/detail" exact component={QuestionDetail} />
>>>>>>> Stashed changes
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
