import React from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { Banner_desktop, Banner_desktop_short } from '../image';

const BannerN = (props) => {

  return (
    <React.Fragment>
      <Grid className='banner' backgroundColor='#7176E5' height='300px' TABheight='168px'>
        <ImageL src={Banner_desktop} alt='토크부트 배너'/>
        <ImageM src={Banner_desktop_short} alt='토크부트 배너'/>
      </Grid>
    </React.Fragment>
  )
};

const ImageL = styled.img`
  @media screen and (min-width: 993px) and (max-width: 1400px) {
    display: none;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 660px;
  }
`;

const ImageM = styled.img`
  @media screen and (min-width: 1401px) {
    display: none;
  }
  @media screen and (min-width: 993px) and (max-width: 1400px) {
    width: 951px;
  }
  @media screen and (max-width: 992px) {
    display: none;
  }
`;


export default BannerN;