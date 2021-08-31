import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { Banner_desktop, Banner_desktop_short, Banner_tablet, Banner_mobile } from '../image';
import { history } from '../redux/ConfigureStore';

const BannerN = (props) => {

  return (
    <React.Fragment>
      <Grid className='banner' backgroundColor='#7176E5' height='300px' TABheight='168px' MOBheight='96px'>
        <ImageDT src={Banner_desktop} alt='토크부트 배너' onClick={() => history.push('/boot')} />
        <ImageDTS src={Banner_desktop_short} alt='토크부트 배너' onClick={() => history.push('/boot')} />
        <ImageTAB src={Banner_tablet} alt='토크부트 배너' onClick={() => history.push('/boot')} />
        <ImageMOB src={Banner_mobile} alt='토크부트 배너' onClick={() => history.push('/boot')} />
      </Grid>
    </React.Fragment>
  )
};

const ImageDT = styled.img`
  cursor: pointer;
  @media screen and (max-width: 1460px) {
    display: none;
  }
`;

const ImageDTS = styled.img`
  cursor: pointer;
  @media screen and (min-width: 1461px) {
    display: none;
  }
  @media screen and (max-width: 1150px) {
    display: none;
  }
`;

const ImageTAB = styled.img`
  cursor: pointer;
  @media screen and (min-width: 1150px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ImageMOB = styled.img`
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;


export default BannerN;