import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { BiLike } from 'react-icons/bi';
import { profile_medium } from '../image';

const AnswerCard = (props) => {
  const dispatch = useDispatch();

  const answer_id = parseInt(props.answerId);
  const user_name = useSelector((state) => state.user.user.nickname);

  // 전체 답변 리스트
  const answer_list = useSelector((state) => state.question.answer_list);

  //답변별 목록
  const one_answer = answer_list.find((answer) => answer.answerId == answer_id);

  // 답변의 좋아요
  const answer_like = one_answer.answerLike;

  // 내가 닉네임이 좋아요 한 답변
  const my_answer_like = answer_like
    ? answer_like.find((answer) => answer.nickname == user_name)
    : [];
  // console.log(my_answer_like);

  // 좋아요 버튼
  const likeAnswer = () => {
    dispatch(questionActions.likeAnswerDB(answer_id, user_name));
  };
  // 좋아요 취소 버튼
  const unlikeAnswer = (answerLikeId) => {
    dispatch(questionActions.unlikeAnswerDB(answer_id, answerLikeId));
  };

  return (
    <React.Fragment>
      <AnswerBox>
        <AnswerContent>
          <Grid display="flex">
            <Text fontSize="32px" fontWeight="700" color="#ffffff">
              A
            </Text>
            <Grid width="40px" height="40px" margin="auto 15px">
              <Image src={profile_medium} size="5"></Image>
            </Grid>

            <Grid width="480px">
              {props.nickname === null ? (
                <Text
                  p
                  margin="auto"
                  fontSize="14px"
                  fontWeight="600"
                  color="#F1F3F4"
                >
                  탈퇴한 회원입니다.
                </Text>
              ) : (
                <Text
                  p
                  margin="auto"
                  fontSize="14px"
                  fontWeight="600"
                  color="#F1F3F4"
                >
                  {props.nickname}님의 답변
                </Text>
              )}

              <Text p margin="auto" fontSize="12px" color="#BDC1C6">
                {props.createdAt}
              </Text>
            </Grid>
          </Grid>

          <Grid margin="30px 0 50px 0">
            <Text p fontSize="16px" color="#C4C4C4">
              {props.content}
            </Text>
          </Grid>

          {my_answer_like ? (
            <span
              style={{
                backgroundColor: '#282A2D',
                padding: '8px 16px',
                borderRadius: '12px',
              }}
            >
              <Text
                color="#7879F1"
                fontSize="14px"
                fontWeight="700"
                lineHeight="18px"
                cursor="pointer"
                _onClick={() => unlikeAnswer(my_answer_like.answerLikeId)}
              >
                <span
                  style={{
                    fontSize: '24px',
                    margin: '0 8px 0 0',
                    verticalAlign: 'middle',
                    lineHeight: '30px',
                  }}
                >
                  <BiLike />
                </span>
                {/* 좋아요 개수 */}
                {answer_like ? answer_like.length : 0}
              </Text>
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#2E3134',
                padding: '8px 16px',
                borderRadius: '12px',
              }}
            >
              <Text
                color="#BDC1C6"
                fontSize="14px"
                fontWeight="700"
                lineHeight="18px"
                cursor="pointer"
                _onClick={() => likeAnswer()}
              >
                <span
                  style={{
                    fontSize: '24px',
                    margin: '0 8px 0 0',
                    verticalAlign: 'middle',
                    lineHeight: '30px',
                  }}
                >
                  <BiLike />
                </span>
                {/* 좋아요 개수 */}
                {answer_like.length}
              </Text>
            </span>
          )}
        </AnswerContent>
      </AnswerBox>
    </React.Fragment>
  );
};
const AnswerBox = styled.div`
  width: 1044px;
  margin: 30px auto 0;
  background-color: #202124;
  border-radius: 12px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 660px;
    /* margin: 30px; */
  }
`;

const AnswerContent = styled.div`
  padding: 40px;
`;

export default AnswerCard;
