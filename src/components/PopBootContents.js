import React from 'react';
import styled from "styled-components";
import {Text, Button, Grid, Input} from "../elements/index";


const PopBootContents = () => {

return(
  <React.Fragment>
    <Grid  width="100%" height="55%" >
      <Grid padding="7% 4%" width="90%" height="auto%" backgroundColor="#202124">
        <Text padding="0 4%" color="#E8EAED" fontSize="2vh" fontWeight="bold">
          인기 부트톡톡 <br/>
        </Text>
      <Grid>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p, index) => {
            return (
          <BootContents> ● &nbsp; 부트캠프 질문드립니다! </BootContents>
          )
      })}
      </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
  )
};

const BootContents = styled.div`
padding: 2% 4%;
margin: 2% 0;
border: none;
font-size: 1.4vh;
color: #DADCE0;
`;

export default PopBootContents;