import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Input, Image } from '../elements';
//icons
import { BiTimeFive, BiLike, BiComment, BiNoEntry } from 'react-icons/bi';
import profile_medium from '../image/profile_medium.png';

const AnswerCard = (props) => {
  console.log(props);

  return (
    <React.Fragment>
      <AnswerBox>
        <Grid padding="3%">
          <Grid display="flex">
            <Text fontSize="3vh" fontWeight="600" color="#ffffff">
              A
            </Text>
            <Grid width="4vw" height="4vh" margin="auto 0% auto 2%">
              <Image src={profile_medium} size="5"></Image>
            </Grid>

            <Grid width="40%">
              <Text p margin="auto" fontWeight="600" color="#C4C4C4">
                {props.nickname}님의 답변
              </Text>
              <Text p margin="auto" color="#C4C4C4">
                {props.created}
              </Text>
            </Grid>
          </Grid>
          <Grid margin="3% 0%">
            <Text p color="#C4C4C4">
              {props.content}
            </Text>
          </Grid>

          <Grid>
            <LikeCommentBtn>
              <BiLike />
              17
            </LikeCommentBtn>
          </Grid>
        </Grid>
      </AnswerBox>
    </React.Fragment>
  );
};
const AnswerBox = styled.div`
  width: 70vw;
  margin: 3% auto;
  background-color: #202124;
  border-radius: 12px;
`;

const LikeCommentBtn = styled.button`
  background-color: #2e3134;
  color: #bdc1cb;
  font-weight: 700;
  border: 0;
  outline: 0;
  border-radius: 7px;
  width: 7%;
  padding: 1%;
  margin-right: 1%;
`;

export default AnswerCard;
