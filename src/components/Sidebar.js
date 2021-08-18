import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import PointImg from '../image/point.png';
import Home from '../image/Home.png';
import Home_white from '../image/Home_white.png';
import Boot from '../image/Bootcamp.png';
import Boot_white from '../image/Bootcamp_white.png';
import Qna from '../image/Qna.png';
import Qna_white from '../image/qna_white.png';
// import News from '../image/News.png';
// import News_white from '../image/News_white.png';
import Talk from '../image/Board.png';
import Talk_white from '../image/Board_white.png';
import { history } from '../redux/ConfigureStore';

const Sidebar = (props) => {
  const {TABopacity} = props;
  const url = window.location.pathname.split('/')[1];

  return (
    <React.Fragment>
      <Grid className="sidebar" backgroundColor="#202124" width="100px" TABwidth='72px' TABopacity={TABopacity}>
        <Grid className="sidebar-inner" is_center>
          <Point
            src={PointImg} alt='디자인'/>
          <Image
            src={url === '' ? Home_white : Home}
            onClick={() => history.push('/')}
          />
          <Image
            src={url === 'boot' ? Boot_white : Boot}
            onClick={() => history.push('/boot')}
          />

          {/* <Image
            src={url === 'news' ? News_white : News}
            onClick={() => history.push('/news/list')}
          /> */}
          <Image
            src={url === 'common' ? Talk_white : Talk}
            onClick={() => history.push('/common/list')}
          />
          <Image
            src={url === 'question' ? Qna_white : Qna}
            onClick={() => history.push('/question')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Point = styled.img`
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 72px;
  }
`;

const Image = styled.img`
  width: 100px;
  cursor: pointer;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 72px;
  }
`;

export default Sidebar;
