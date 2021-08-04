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
import { RiEditCircleFill } from 'react-icons/ri';

const QuestionDetail = (props) => {
  const dispatch = useDispatch();

  const question_id = window.location.pathname.split('/question/detail/')[1];
  const question_list = useSelector((state) => state.post.list);
  const question_found = question_list.find(
    (post) => post.postId == question_id
  );
  console.log(question_found);
  console.log(question_id);

  useEffect(() => {
    dispatch(questionActions.setOnePostDB(question_id));
  }, []);

  const editBtn = () => {
    history.push(`/question/write/${question_id}`);
  };

  if (!question_found) {
    return <></>;
  }
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
                    {question_found.title}
                  </Text>
                </Grid>
                <Grid width="20%" display="flex" margin="0 0 0 auto">
                  <Button _onClick={editBtn}>수정하기</Button>
                  <Button>삭제하기</Button>
                </Grid>
              </Grid>

              <Grid display="flex" margin="3% 0">
                <Grid width="3vw">
                  <Image size="5"></Image>
                </Grid>

                <Grid width="40%">
                  <Text p margin="auto 4%" fontWeight="600" color="#ffffff">
                    {question_found.nickname}
                  </Text>
                  <Text p margin="auto 4%" color="#C4C4C4">
                    {question_found.createdAt}
                  </Text>
                </Grid>
              </Grid>

              {/* 콘텐츠마다 달라지는 위치값 고정하기 */}
              <Text p margin="5% 0%" color="#C4C4C4">
                {question_found.content}
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
            {[1, 2, 3].map((q, idx) => {
              return <QnaAnswerCard />;
            })}
            ;
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
