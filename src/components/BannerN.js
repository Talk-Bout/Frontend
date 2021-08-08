import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';

const BannerN = (props) => {
  // title1: 제목 첫 줄, title2: 제목 둘째 줄, description: 설명
  const {title1, title2, description} = props;
  return (
    <React.Fragment>
      <Grid className='banner' backgroundColor='#e5e5e5' height='300px' margin='42px 0 0'>
        <Grid height='60%'></Grid>
        <TextBox>
          <Text p className='banner-title-1' fontSize='3vh' fontWeight='700' color='#0e1013' margin='0'>{title1}</Text>
          <Text p className='banner-title-2' fontSize='3vh' fontWeight='700' color='#0e1013' margin='0'>{title2}</Text>
          <Text p className='banner-description' fontSize='1.8vh' color='#5F6368' margin='0'>{description}</Text>
        </TextBox>
      </Grid>
    </React.Fragment>
  )
};

BannerN.defaultProps = {
  title1: 'title1',
  title2: 'title2',
  description: 'description',
}

const TextBox = styled.div`
  padding-left: 40px;
`;

export default BannerN;