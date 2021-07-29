import React from 'react';
import {Text, Grid} from '../elements';

const Banner = (props) => {
  const {title, description} = props;

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