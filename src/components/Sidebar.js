import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { PointImg, Home, Home_white, Boot, Boot_white, Qna, Qna_white, Talk, Talk_white } from '../image';
import { history } from '../redux/ConfigureStore';

const Sidebar = (props) => {
  const { opacity, TABopacity } = props;
  const url = window.location.pathname.split('/')[1];

  return (
    <React.Fragment>
      <Grid className="sidebar" backgroundColor="#202124" width="100px" minHeight='100vh' TABwidth='72px' opacity={opacity} TABopacity={TABopacity} MOBdisplay='none'>
        <Grid className="sidebar-inner">
          <Point
            src={PointImg} alt='디자인' />
          <FixNav>
            <Image
              src={url === '' ? Home_white : Home}
              onClick={() => history.push('/')}
            />
            <Image
              src={url === 'boot' ? Boot_white : Boot}
              onClick={() => history.push('/boot')}
            />
            <Image
              src={url === 'common' ? Talk_white : Talk}
              onClick={() => history.push('/common/list')}
            />
            <Image
              src={url === 'question' ? Qna_white : Qna}
              onClick={() => history.push('/question')}
            />
          </FixNav>
        </Grid>
      </Grid>
      <Grid className='mobile-navbar' backgroundColor='#202124' MOBheight='48px' display='none' TABdisplay='none' MOBdisplay='none'>
      </Grid>
    </React.Fragment>
  );
};

const FixNav = styled.div`
  position: fixed;
  width: 100px;
  top: 100px;
  @media screen and (max-width: 1090px) {
    width: 72px;
    top: 72px;
  }
`;

const Point = styled.img`
  width: 100px;
  @media screen and (max-width: 1090px) {
    width: 72px;
  }
`;

const Image = styled.img`
  width: 100px;
  cursor: pointer;
  @media screen and (max-width: 1090px) {
    width: 72px;
  }
`;

export default Sidebar;
