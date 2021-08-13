import React from 'react';
import styled from 'styled-components';
import { Text, Image } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import profile_small from '../image/profile_small.png';
import question from '../redux/modules/question';

const QnaCard = (props) => {
  const { _onClick } = props;
  const question_id = props.questionId;
  const question_list = useSelector((state) => state.question.list);
  const question_found = question_list.find(
    (question) => question.questionId == question_id
  );

  return (
    <React.Fragment>
      <QnaListCard onClick={_onClick}>
        {/* 질문 글 */}
        <QuestionSection>
          {/* 질문 제목 */}
          <Text fontSize="18px" fontWeight="700" color="#F8F9FA">
            <span style={{ marginRight: '8px' }}>Q</span>
            {question_found.title}
          </Text>
          {/* 질문 내용 */}
          <Text
            p
            fontSize="14px"
            color="#9AA0A6"
            overflow="hidden"
            display="-webkit-box"
            wlc="4"
            wbo="vertical"
          >
            {question_found.content}
          </Text>
          <div
            style={{ position: 'absolute', bottom: '16px', display: 'flex' }}
          >
            {/* 작성자 프로필 이미지 */}
            <Image src={profile_small} width="24px" height="24px" />
            {/* 작성자 닉네임 */}
            <Text
              fontSize="12px"
              color="#80868b"
              lineHeight="24px"
              margin="0 8px"
            >
              {question_found.nickname}
            </Text>
            {/* 작성일자 */}
            <Text fontSize="12px" color="#80868b" lineHeight="24px">
              <span
                style={{
                  fontSize: '16px',
                  verticalAlign: 'middle',
                  marginRight: '4px',
                }}
              >
                <BiTimeFive />
              </span>
              {question_found.createdAt}
            </Text>
          </div>
        </QuestionSection>
        <AnswerSection>
          <div style={{ paddingTop: '16px' }}>
            {/* 추천 수 */}
            <Text fontSize="12px" color="#bdc1c6" margin="0 8px 0 0">
              {question_found.questionLike ? (
                <span
                  style={{
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                >
                  <BiLike />
                  {question_found.questionLike.length}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                >
                  <BiLike />0
                </span>
              )}
            </Text>
            {/* 댓글 수 */}
            <Text fontSize="12px" color="#bdc1c6" margin="0 8px">
              {question_found.answer ? (
                <span
                  style={{
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                >
                  <BiComment />
                  {question_found.answer.length}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                >
                  <BiComment />0
                </span>
              )}
            </Text>
            {/* 조회수 */}
            <Text fontSize="12px" color="#bdc1c6" margin="0 0 0 8px">
              {question_found.viewCount > 0 ? (
                <span
                  style={{
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                >
                  <AiOutlineEye />
                  {question_found.viewCount}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                >
                  <AiOutlineEye />0
                </span>
              )}
            </Text>
          </div>
        </AnswerSection>
      </QnaListCard>
    </React.Fragment>
  );
};

const QnaListCard = styled.div`
  width: 31.5%;
  height: 250px;
  float: left;
  background-color: #202124;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  margin: 0 10px 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const QuestionSection = styled.div`
  height: 170px;
  position: relative;
  border-bottom: 1px solid #282a2d;
  box-sizing: border-box;
`;

const AnswerSection = styled.div`
  height: 50px;
`;

QnaCard.defaultProps = {
  _onClick: () => {},
};

export default QnaCard;
