import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';

const InfoWrite = (props) => {
  return (
    <React.Fragment>
      <Grid
        padding="10%"
        height="100%"
        backgroundColor="#E5E5E5"
        position="relative"
      >
        <WriteBox>
          <Text> 글쓰기 </Text>
        </WriteBox>
      </Grid>
    </React.Fragment>
  );
};

const WriteBox = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
`;

export default InfoWrite;
