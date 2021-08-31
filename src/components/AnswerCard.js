import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Image } from '../elements';
import { Profile_medium } from '../image';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from '../redux/modules/question';
import { BiLike } from 'react-icons/bi';

const AnswerCard = (props) => {
  const dispatch = useDispatch();

  const answer_id = parseInt(props.answerId);
  const user_name = useSelector(state => state.user.user.nickname);
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
  const user_profile_url = `https://fw3efsadfcv.shop${one_answer.profilePic}`

  return (
    <React.Fragment>
      <AnswerBox>
        <AnswerContent>
          <Grid display="flex">
            {/* 답변 작성자 정보 */}
            <Text fontSize="32px" MOBfontSize='24px' fontWeight="700" color="#ffffff" cursor='default'>
              A
            </Text>
            <Grid width="40px" MOBwidth='28px' margin="auto 15px" MOBmargin='auto 8px'>
              <ImageBox>
                <Profile src={user_profile ? user_profile_url : Profile_medium} />
              </ImageBox>
            </Grid>
            <Grid width="480px" MOBwidth='fit-content' MOBmargin='2px 0 0'>
              {/* 작성자 닉네임 */}
              <Text p margin="auto" fontSize="14px" MOBfontSize='12px' fontWeight="600" color="#F1F3F4" cursor='default'>
                {props.nickname} 님의 답변
              </Text>
              {/* 작성 시간 */}
              <Text p margin="auto" fontSize="12px" MOBfontSize='8px' color="#BDC1C6" cursor='default'>
                {props.createdAt}
              </Text>
            </Grid>
          </Grid>
          {/* 답변 내용 */}
          <Grid margin="30px 0 50px" MOBmargin='10px 0 20px' height='fit-content'>
            <Text p fontSize="16px" MOBfontSize='12px' color="#C4C4C4" cursor='text' userSelect='text' wordBreak='break-all'>
              {props.content}
            </Text>
          </Grid>
          {/* 좋아요 버튼 */}
          {/* 이미 눌려 있는 경우 보라색, 그렇지 않은 경우 하얀색으로 보여주기 */}
          {is_login ?
            my_answer_like ?
              <Text backgroundColor='#2E3134' padding='8px 16px' MOBpadding='2px 12px 6px' borderRadius='12px'>
                <Text color="#7879F1" fontSize="14px" MOBfontSize='12px' fontWeight="700" lineHeight="18px" cursor="pointer" _onClick={() => unlikeAnswer(my_answer_like.answerLikeId)}>
                  <Text fontSize='24px' MOBfontSize='16px' margin='0 8px 0 0' MOBmargin='0 6px 0 0' verticalAlign='middle' lineHeight='30px' MOBlineHeight='20px'><BiLike /></Text>
                  {one_answer.likeNumber}
                </Text>
              </Text>
              :
              <Text backgroundColor='#2E3134' padding='8px 16px' MOBpadding='2px 12px 6px' borderRadius='12px'>
                <Text color="#BDC1C6" fontSize="14px" MOBfontSize='12px' fontWeight="700" lineHeight="18px" cursor="pointer" _onClick={() => likeAnswer()}>
                  <Text fontSize='24px' MOBfontSize='16px' margin='0 8px 0 0' MOBmargin='0 6px 0 0' verticalAlign='middle' lineHeight='30px' MOBlineHeight='20px'><BiLike /></Text>
                  {one_answer.likeNumber}
                </Text>
              </Text>
            :
            <Text backgroundColor='#2E3134' padding='8px 16px' MOBpadding='4px 16px 8px' borderRadius='12px'>
              <Text color="#BDC1C6" fontSize="14px" MOBfontSize='12px' fontWeight="700" lineHeight="18px" cursor="default">
                <Text fontSize='24px' MOBfontSize='16px' margin='0 8px 0 0' MOBmargin='0 6px 0 0' verticalAlign='middle' lineHeight='30px' MOBlineHeight='20px'><BiLike /></Text>
                {one_answer.likeNumber}
              </Text>
            </Text>
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
  @media screen and (max-width: 1150px) {
    width: 660px;
  }
  @media screen and (max-width: 767px) {
    width: calc(100% - 36px);
  }
`;

const AnswerContent = styled.div`
  padding: 40px;
  @media screen and (max-width: 767px) {
    padding: 20px;
  }
`;

const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    width: 28px;
    height: 28px;
  }
`;

const Profile = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export default AnswerCard;
