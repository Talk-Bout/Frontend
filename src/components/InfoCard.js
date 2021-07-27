import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements';

//icons
import { BiTimeFive } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiComment } from 'react-icons/bi';

const InfoCard = (props) => {
  return (
    <React.Fragment>
      <InfoBox>
        <Text padding="3%" fontWeight="700">
          부트캠프 비교
        </Text>
        <Text padding="3%" fontSize="15px">
          Proident exercitation velit non eiusmod eiusmod nostrud amet magna
          culpa ullamco nulla officia commodo fugiat.
        </Text>
        <Text padding="3%">닉네임</Text>

        <Grid is_flex width="60%">
          <Text padding="3%" fontSize="15px">
            <BiTimeFive />
            2021.07.25
          </Text>
          <Text padding="3%" fontSize="15px">
            <BiLike />
            17
          </Text>
          <Text padding="3%" fontSize="15px">
            <BiComment />1
          </Text>
        </Grid>
      </InfoBox>
    </React.Fragment>
  );
};
//여기 다시 체크! margin과 비율
const InfoBox = styled.div`
  height: '100%';
  width: 48%;
  border: 1.5px solid #b5b5b5;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 1%;
`;

export default InfoCard;
