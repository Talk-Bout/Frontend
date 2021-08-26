import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { Profile_medium } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { BiLike } from 'react-icons/bi';
import { nickname_c } from '../shared/cookie';
import { baseUrl } from '../shared/api';

const AnswerCard = (props) => {
  const dispatch = useDispatch();

  const answer_id = parseInt(props.answerId);
  const user_name = nickname_c;
  const is_login = useSelector(state => state.user.is_login);

  // 전체 답변 리스트
  const answer_list = useSelector((state) => state.question.answer_list);

  // 이 답변에 대한 데이터
  const one_answer = answer_list.find((answer) => answer.answerId === answer_id);

  // 답변의 좋아요 목록
  const answer_like = one_answer.answerLike;

  // 내가 닉네임이 좋아요 한 답변
  const my_answer_like = answer_like && answer_like.findIndex((like) => like.nickname === user_name) !== -1 ? answer_like.find((like) => like.nickname === user_name) : '';

  // 좋아요 버튼
  const likeAnswer = () => {
    dispatch(questionActions.likeAnswerDB(answer_id, user_name));
  };
  // 좋아요 취소 버튼
  const unlikeAnswer = (answerLikeId) => {
    dispatch(questionActions.unlikeAnswerDB(answer_id, answerLikeId, user_name));
  };

  // 답변 작성자 프로필 사진
  const user_profile = one_answer.profilePic;
  const user_profile_url = `http://fw3efsadfcv.shop${one_answer.profilePic}`

  return (
    <React.Fragment>
      <AnswerBox>
        <AnswerContent>
          <Grid display="flex">
            {/* 답변 작성자 정보 */}
            <Text fontSize="32px" fontWeight="700" color="#ffffff" cursor='default'>
              A
            </Text>
            <Grid width="40px" height="40px" margin="auto 15px">
              <Image src={user_profile == null ? Profile_medium : user_profile_url}></Image>
            </Grid>
            <Grid width="480px">
              {/* 작성자 닉네임 */}
              <Text p margin="auto" fontSize="14px" fontWeight="600" color="#F1F3F4" cursor='default'>
                {props.nickname} 님의 답변
              </Text>
              {/* 작성 시간 */}
              <Text p margin="auto" fontSize="12px" color="#BDC1C6" cursor='default'>
                {props.createdAt}
              </Text>
            </Grid>
          </Grid>
          {/* 답변 내용 */}
          <Grid margin="30px 0 50px 0" height='fit-content'>
            <Text p fontSize="16px" color="#C4C4C4" cursor='text' userSelect='text' wordBreak='break-all'>
              {props.content}
            </Text>
          </Grid>
          {/* 좋아요 버튼 */}
          {/* 이미 눌려 있는 경우 보라색, 그렇지 않은 경우 하얀색으로 보여주기 */}
          {is_login ?
            my_answer_like ?
              <span style={{ backgroundColor: '#282A2D', padding: '8px 16px', borderRadius: '12px', }}>
                <Text color="#7879F1" fontSize="14px" fontWeight="700" lineHeight="18px" cursor="pointer" _onClick={() => unlikeAnswer(my_answer_like.answerLikeId)}>
                  <span style={{ fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px', }}><BiLike /></span>
                  {one_answer.likeNumber}
                </Text>
              </span>
              :
              <span style={{ backgroundColor: '#2E3134', padding: '8px 16px', borderRadius: '12px', }}>
                <Text color="#BDC1C6" fontSize="14px" fontWeight="700" lineHeight="18px" cursor="pointer" _onClick={() => likeAnswer()}>
                  <span style={{ fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px', }}><BiLike /></span>
                  {one_answer.likeNumber}
                </Text>
              </span>
            :
            <span style={{ backgroundColor: '#2E3134', padding: '8px 16px', borderRadius: '12px', }}>
              <Text color="#BDC1C6" fontSize="14px" fontWeight="700" lineHeight="18px" cursor="default">
                <span style={{ fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px', }}><BiLike /></span>
                {one_answer.likeNumber}
              </Text>
            </span>
          }
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
  @media screen and (max-width: 1200px) {
    width: 800px;
  }
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 660px;
  }
`;

const AnswerContent = styled.div`
  padding: 40px;
`;

export default AnswerCard;
