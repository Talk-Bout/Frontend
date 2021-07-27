import React from 'react';
import { Route } from 'react-router-dom';
import CommonDetail from './pages/CommonDetail';
import CommonList from './pages/CommonList';
import CommonWrite from './pages/CommonWrite';


function App() {
  return (
    <React.Fragment>
      <Route exact path="/commonlist" component={CommonList} />
      <Route exact path="/commondetail" component={CommonDetail} />
      <Route exact path="/commonwrite" component={CommonWrite} />
    </React.Fragment>
  );
}

export default App;
