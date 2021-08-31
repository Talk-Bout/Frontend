import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { PointImg, Home, Home_white, Boot, Boot_white, Qna, Qna_white, Talk, Talk_white } from '../image';
import { history } from '../redux/ConfigureStore';

const Sidebar = (props) => {
  const url = window.location.pathname.split('/')[1];

  return (
    <React.Fragment>
      <Grid className="sidebar" backgroundColor="#202124" width="100px" minHeight='100vh' TABwidth='72px' MOBdisplay='none'>
          <FixNav>
            <Point
              src={PointImg} alt='디자인' />
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
    </React.Fragment>
  );
};

const FixNav = styled.div`
  position: fixed;
  width: 100px;
  top: 0;
  @media screen and (max-width: 1150px) {
    width: 72px;
    top: 0;
  }
`;

const Point = styled.img`
  width: 100px;
  @media screen and (max-width: 1150px) {
    width: 72px;
  }
`;

const Image = styled.img`
  width: 100px;
  cursor: pointer;
  @media screen and (max-width: 1150px) {
    width: 72px;
  }
`;

export default Sidebar;
