import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import BannerImg from '../image/banner.png';

const BannerN = (props) => {
  // title1: 제목 첫 줄, title2: 제목 둘째 줄, description: 설명
  // const {title1, title2, description} = props;

  return (
    <React.Fragment>
      <Grid className='banner' backgroundColor='#7176E5' height='300px'>
        {/* <Grid height='126px'></Grid>
        <TextBox>
          <Text className='banner-title-1' fontSize='32px' fontWeight='700' color='#0e1013'>{title1}</Text>
          <Text p className='banner-title-2' fontSize='32px' fontWeight='700' color='#0e1013' margin='0'>{title2}</Text>
          <Text className='banner-description' fontSize='16px' color='#5F6368'>{description}</Text>
        </TextBox> */}
        <img src={BannerImg} alt='토크부트 배너'/>
      </Grid>
    </React.Fragment>
  )
};

BannerN.defaultProps = {
  // title1: 'title1',
  // title2: 'title2',
  // description: 'description',
}

// const TextBox = styled.div`
//   padding-left: 42px;
//   height: 118px;
// `;

export default BannerN;