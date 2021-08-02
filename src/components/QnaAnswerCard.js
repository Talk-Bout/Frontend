import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text, Button, Input, Image } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/post';
//icons
import { BiTimeFive, BiLike, BiComment, BiNoEntry } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { BsEye } from 'react-icons/bs';
import ThumbUp from '../image/ThumbUp.png';
import View from '../image/View.png';
const QnaAnswerCard = (props) => {
  return (
    <React.Fragment>
      <AnswerCard>
        <Grid padding="3%">
          <Grid display="flex">
            <Text fontSize="3vh" fontWeight="600" color="#ffffff">
              A
            </Text>
            <Image size="45px" margin="0 1% 0 2%" border_radius="3px"></Image>
            <Grid width="40%">
              <Text p margin="auto" fontWeight="600" color="#C4C4C4">
                닉네임님의 답변
              </Text>
              <Text p margin="auto" color="#C4C4C4">
                2021-07-25 20:32:09 작성
              </Text>
            </Grid>

            <Grid
              width="20%"
              display="flex"
              margin="0 0 0 auto"
              backgroundColor="yellow"
            >
              <Button>수정하기</Button>
              <Button>삭제하기</Button>
            </Grid>
          </Grid>
          <Text p margin="5% 0%" color="#C4C4C4">
            {/* {question_found.content} */}
            Cillum in amet cillum irure ullamco. Cupidatat occaecat ad ex minim
            ullamco dolore eiusmod velit eu fugiat excepteur. Culpa amet aliqua
            consectetur culpa consectetur ad cillum non cillum proident velit
            Lorem do id. Exercitation aliquip incididunt aute officia in in
            excepteur. Cillum in amet cillum irure ullamco. Cupidatat occaecat
            ad ex minim ullamco dolore eiusmod velit eu fugiat excepteur. Culpa
            amet aliqua consectetur culpa consectetur ad cillum non cillum
            proident velit Lorem do id. Exercitation aliquip incididunt aute
            officia in in excepteur.
          </Text>
          <Grid display="flex" width="100%" margin="3% 0%">
            <LikeCommentBtn>
              <BiLike />
              17
            </LikeCommentBtn>

            <LikeCommentBtn>
              <BiComment /> 3
            </LikeCommentBtn>
          </Grid>
          <hr style={{ color: '#2e3134' }} />
          <Grid>
            <Text p fontWeight="600" margin="2% 0%" color="#E2E2E3">
              댓글 5
            </Text>
            <Grid display="flex">
              <AddCommentInput placeholder={'댓글을 남겨주세요'} />
              <AnswerSaveBtn>등록하기</AnswerSaveBtn>
            </Grid>

            <SeeAllCommentBtn>댓글 모두 보기</SeeAllCommentBtn>
          </Grid>
        </Grid>
      </AnswerCard>
    </React.Fragment>
  );
};
const AnswerCard = styled.div`
  width: 70vw;
  margin: 1% auto;
  background-color: #202124;
  border-radius: 5px;
`;

const AnswerSaveBtn = styled.button`
  width: 15%;
  color: #121212;
  font-weight: 700;
  margin-left: 1%;
  border-radius: 5px;
  border: 0;
  outline: 0;
`;

const SeeAllCommentBtn = styled.button`
  color: #ffffff;
  background-color: #282a2d;
  font-weight: 700;
  width: 100%;
  margin-top: 3%;
  padding: 2%;
  border-radius: 5px;
  border: 0;
  outline: 0;
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

const AddCommentInput = styled.input`
  width: 100%;
  border: 1px solid #9aa0a6;
  background-color: transparent;
  padding: 1.3%;
  border-radius: 3px;
  :focus {
    outline: none;
  }
`;
export default QnaAnswerCard;
