import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Logo from '../image/Logo.png';

const Footer = (props) => {

  return (
    <React.Fragment>
      <Grid height='250px' TABheight='182px' margin='80px 0 0' TABmargin='64px 0 0' backgroundColor='#0E1013' padding='24px 20px' TABpadding='24px 20px 36px'>
        <Image src={Logo} alt='로고'/>
        <Text p fontSize='14px' fontWeight='700' color='#bdc1c6' margin='0 8px 0' TABmargin='0 4px 0'>토크부트를 만든 사람들 소개</Text>
        <Grid display='flex' justify_content='space-between' width='fit-content' margin='16px 8px 0' TABmargin='12px 4px'>
          <Text fontSize='12px' color='#bdc1c6'>© 2021 Project Talk'bout</Text>
          <Text fontSize='12px' color='#bdc1c6' margin='0 24px'>All rights reserved.</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
};

const Image = styled.img`
  @media screen and (max-width: 768px) {
    height: 56px;
    width: 140px;
  }
`;

export default Footer;