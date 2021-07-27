import React from 'react';
import { Route } from 'react-router-dom';
import CommonBoardDetail from './pages/CommonBoardDetail';
import CommonBoardList from './pages/CommonBoardList';
import CommonBoardWrite from './pages/CommonBoardWrite';


function App() {
  return (
    <React.Fragment>
      <Route exact path="/commonlist" component={CommonBoardList} />
      <Route exact path="/commondetail" component={CommonBoardDetail} />
      <Route exact path="/commonwrite" component={CommonBoardWrite} />
    </React.Fragment>
  );
}

export default App;
