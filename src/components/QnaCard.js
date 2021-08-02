import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Image } from '../elements';

//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { Group } from '../image/Group.png';

const QnaCard = () => {
  return (
    <React.Fragment>
      <QnaListCard>
        {/* 질문 내용 */}
        <QuestionSection>
          <Grid display="flex">
            <Grid width="1.5vw">
              <Text fontSize="2vh" fontWeight="600" color="#F8F9FA">
                Q
              </Text>
            </Grid>
            <Grid>
              <Text fontSize="2vh" fontWeight="600" color="#F8F9FA">
                질문 타이틀
              </Text>
            </Grid>
          </Grid>

          <Text p fontSize="1.7vh" color="#9AA0A6">
            Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex minim
            ullamco dolore eiusmod velit eu fugiat excepteur. Culpa amet aliqua
            consectetur culpa consectetur ad cillum non cillum proident velit
            Lorem do id. Exercitation aliquip incididunt aute officia in in
            excepteur.
          </Text>

          <Grid display="flex" margin="8% 0">
            <div style={{ display: 'flex', margin: '0 3% 0 0' }}>
              <Image size="20"></Image>
              <Text fontSize="1.6vh" color="#C4C4C4" fontSize="1.6vh">
                질문자 닉네임
              </Text>
            </div>

            <Text fontSize="1.6vh" color="#C4C4C4" fontSize="1.6vh">
              <BiTimeFive />
              작성시간
            </Text>
          </Grid>
        </QuestionSection>
        <hr width="100%" />

        {/* 답변 내용 */}
        <AnswerSection>
          <div>
            <Text fontSize="1.6vh" color="#C4C4C4" margin="0% 3% 0 0">
              <BiLike />
              추천 갯수
            </Text>

            <Text fontSize="1.6vh" color="#C4C4C4">
              <BiComment /> 답변 1
            </Text>
          </div>

          <div style={{ margin: '3% 3% 0 0' }}>
            <div style={{ display: 'flex' }}>
              <Image size="30" width="10%" margin="0 1% 0 0"></Image>
              <div>
                <Text
                  fontSize="1.6vh"
                  color="#9AA0A6"
                  fontSize="1.6vh"
                  fontWeight="700"
                >
                  답변자 닉네임
                </Text>
                <Text p fontSize="1.7vh" color="#9AA0A6">
                  Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
                  minim ullamco dolore eiusmod velit eu fugiat excepteur.
                </Text>
              </div>
            </div>
          </div>
        </AnswerSection>
      </QnaListCard>
    </React.Fragment>
  );
};

const QnaListCard = styled.div`
  width: 33%;
  height: 50%;
  background-color: #202124;
  border-radius: 3%;
  box-sizing: border-box;
  padding: 3vh 2vw 0;
  margin: 0 0 2%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const QuestionSection = styled.div`
  height: 60%;
`;

const AnswerSection = styled.div`
  height: 30%;
`;
export default QnaCard;
