import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

//정보 게시판 페이지
import InfoList from './pages/InfoList';
import InfoDetail from './pages/InfoDetail';
import InfoWrite from './pages/InfoWrite';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/info" exact component={InfoList} />
        <Route path="/infoWrite" exact component={InfoWrite} />
        <Route path="/infoDetail" exact component={InfoDetail} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
