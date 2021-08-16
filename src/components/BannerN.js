import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import BannerImg from '../image/banner.png';

const BannerN = (props) => {

  return (
    <React.Fragment>
      <Grid className='banner' backgroundColor='#7176E5' height='300px' TABheight='168px'>
        <Image src={BannerImg} alt='토크부트 배너'/>
      </Grid>
    </React.Fragment>
  )
};

const Image = styled.img`
  @media screen and (max-width: 768px) {
    width: 660px;
  }
`;


export default BannerN;