import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Input, Image } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';
import { history } from '../redux/ConfigureStore';

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import QnaAnswerCard from '../components/QnaAnswerCard';
//icons
import { BiTimeFive, BiLike, BiComment, BiNoEntry } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { BsEye } from 'react-icons/bs';
import ThumbUp from '../image/ThumbUp.png';
import View from '../image/View.png';

const QuestionDetail = (props) => {
  return (
    <React.Fragment>
      <Grid display="flex">
        <Sidebar />
        <Body header>
          <Grid height="50%">
            {/* 질문 카드 */}
            <Grid width="70vw" height="100%" margin="auto">
              <Grid display="flex">
                <Grid width="40%">
                  <Text fontSize="3vh" fontWeight="600" color="#ffffff">
                    Q
                  </Text>
                  <Text
                    fontSize="3vh"
                    fontWeight="600"
                    margin="auto 2%"
                    color="#ffffff"
                  >
                    {/* {question_found.title} */} 질문타이틀
                  </Text>
                </Grid>
                <Grid width="20%" display="flex" margin="0 0 0 auto">
                  <Button>수정하기</Button>
                  <Button>삭제하기</Button>
                </Grid>
              </Grid>

              <Grid display="flex" margin="3% 0">
                <Grid width="3vw">
                  <Image size="45px"></Image>
                </Grid>

                <Grid width="40%">
                  <Text p margin="auto 4%" fontWeight="600" color="#ffffff">
                    닉네임님의 답변
                  </Text>
                  <Text p margin="auto 4%" color="#C4C4C4">
                    2021-07-25 20:32:09
                  </Text>
                </Grid>
              </Grid>

              <Text p margin="5% 0%" color="#C4C4C4">
                {/* {question_found.content} */}
                Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex
                minim ullamco dolore eiusmod velit eu fugiat excepteur. Culpa
                amet aliqua consectetur culpa consectetur ad cillum non cillum
                proident velit Lorem do id. Exercitation aliquip incididunt aute
                officia in in excepteur. Cillum in amet cillum irure ullamco.
                Cupidatat occaecat ad ex minim ullamco dolore eiusmod velit eu
                fugiat excepteur. Culpa amet aliqua consectetur culpa
                consectetur ad cillum non cillum proident velit Lorem do id.
                Exercitation aliquip incididunt aute officia in in excepteur.
              </Text>

              <Grid display="flex" margin="3% 0%" vertical-align="center">
                <LikeCommentBtn>
                  <BiLike />
                  17
                </LikeCommentBtn>

                <Text color="#C4C4C4" margin="auto 1%">
                  <BiComment /> 3
                </Text>

                <Text color="#C4C4C4" margin="auto 1%">
                  <BsEye />
                  254
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <AnswerBox>
            {/* 답변 등록 input */}
            <AddAnswerSection>
              <Text p fontWeight="600" color="#E2E2E3">
                답변 3
              </Text>
              <ACommentBox>
                <AInput rows="5" placeholder="댓글을 남겨주세요" />
                <AnswerSaveButton>답변 추가하기</AnswerSaveButton>
              </ACommentBox>
            </AddAnswerSection>

            {/* 새롭게 작성되는 답변 내용  */}
            <QnaAnswerCard />
          </AnswerBox>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

//Answer Section
const AnswerBox = styled.div`
  height: 100%;
  /* transform: translateX(-40px); */
  margin: 0 -40px 0 -40px;
  background-color: #282a2d;
`;

const AddAnswerSection = styled.div`
  width: 70vw;
  margin: 3% auto;
  padding-top: 1%;
`;

const ACommentBox = styled.div`
  /* color: #5d6065;
  background-color: #212123; */
  border-radius: 5px;
  border: 1px solid #9aa0a6;
  width: 100%;
`;

const AInput = styled.textarea`
  border: none;
  border-radius: 5px;
  background-color: transparent;
  resize: none;
  padding: 1%;
  width: 98%;
  :focus {
    outline: none;
  }
`;

const AnswerSaveButton = styled.button`
  border-radius: 5px;
  border: 0;
  outline: 0;
  color: #121212;
  font-weight: 700;
  padding: 1.2% 5%;
  margin-left: 80%;
  margin-bottom: 1%;
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
export default QuestionDetail;
