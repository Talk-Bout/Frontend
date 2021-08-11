import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
//icons
import { BiLike } from 'react-icons/bi';
import profile_medium from '../image/profile_medium.png';

const QnaAnswerCard = (props) => {
  return (
    <React.Fragment>
      <AnswerCard>
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
                닉네임님의 답변
              </Text>
              <Text p margin="auto" color="#C4C4C4">
                2021-07-25 20:32:09 작성
              </Text>
            </Grid>
          </Grid>
          <Grid margin="3% 0%">
            <Text p color="#C4C4C4">
              {/* {question_found.content} */}
              Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
              minim ullamco dolore eiusmod velit eu fugiat excepteur. Culpa amet
              aliqua consectetur culpa consectetur ad cillum non cillum proident
              velit Lorem do id. Exercitation aliquip incididunt aute officia in
              in excepteur. Cillum in amet cillum irure ullamco. Cupidatat
              occaecat ad ex minim ullamco dolore eiusmod velit eu fugiat
              excepteur. Culpa amet aliqua consectetur culpa consectetur ad
              cillum non cillum proident velit Lorem do id. Exercitation aliquip
              incididunt aute officia in in excepteur.
            </Text>
          </Grid>

          <Grid>
            <LikeCommentBtn>
              <BiLike />
              17
            </LikeCommentBtn>
          </Grid>
        </Grid>
      </AnswerCard>
    </React.Fragment>
  );
};
const AnswerCard = styled.div`
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

export default QnaAnswerCard;
