import React from 'react';
import {Text, Grid} from '../elements';

const Banner = (props) => {                   // 메인 상단 배너
  const {title, description} = props;         // title: 굵은 글씨 문구, description: 일반 굵기 문구

  return (
    <Grid is_center backgroundColor="#e5e5e5" height="25vh" padding="9vh 0">
      <Text fontSize="3vh" fontWeight="700">
        {title}
      </Text>
      <Text p fontSize="1.5vh" margin="5px">
        {description}
      </Text>
    </Grid>
  )
};

export default Banner;