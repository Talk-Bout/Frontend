import React from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import { Profile_small } from '../image';
import { useSelector } from 'react-redux';
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

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
          <Text
            fontSize="18px"
            fontWeight="700"
            color="#F8F9FA"
            overflow="hidden"
            display="-webkit-box"
            wlc="2"
            wbo="vertical"
            TABfontSize="16px"
            TABwlc="1"
          >
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
            TABwlc="3"
            TABoverflow="hidden"
            TABfontSize="12px"
          >
            {question_found.content}
          </Text>
          <QuestionInfo>
            {/* 작성자 프로필 이미지 */}
            <ProfileImg src={Profile_small} width="24px" height="24px" />
            {/* 작성자 닉네임 */}
            <Text
              fontSize="12px"
              color="#80868b"
              lineHeight="24px"
              margin="0 8px"
              TABfontSize="10px"
              TABmargin="0 4px 0"
            >
              {question_found.nickname}
            </Text>
            {/* 작성일자 */}
            <Text
              fontSize="12px"
              color="#80868b"
              lineHeight="24px"
              TABfontSize="10px"
            >
              <Text
                fontSize="16px"
                verticalAlign="middle"
                margin="0 4px 0 0"
                TABfontSize="10px"
                TABmargin="0 2px 0 0"
              >
                <BiTimeFive />
              </Text>
              {question_found.createdAt}
            </Text>
          </QuestionInfo>
        </QuestionSection>

        <AnswerSection>
          <span style={{ height: 'fit-content' }}>
            {/* 추천 수 */}

            {question_found.questionLike ? (
              <Text
                fontSize="12px"
                color="#bdc1c6"
                verticalAlign="middle"
                margin="0 8px 0 0"
                TABfontSize="10px"
              >
                <Text
                  fontSize="16px"
                  color="#bdc1c6"
                  margin="0 6px 0 0"
                  verticalAlign="middle"
                  TABfontSize="14px"
                >
                  <BiLike />
                </Text>
                {question_found.questionLike.length}
              </Text>
            ) : (
              <Text
                fontSize="12px"
                color="#bdc1c6"
                verticalAlign="middle"
                margin="0 8px 0 0"
                TABfontSize="10px"
              >
                <Text
                  fontSize="16px"
                  color="#bdc1c6"
                  margin="0 6px 0 0"
                  verticalAlign="middle"
                  TABfontSize="14px"
                >
                  <BiLike />
                </Text>
                0
              </Text>
            )}

            {/* 댓글 수 */}

            {question_found.answer ? (
              <Text
                fontSize="12px"
                color="#bdc1c6"
                verticalAlign="middle"
                margin="0 8px 0 0"
                TABfontSize="10px"
              >
                <Text
                  fontSize="16px"
                  color="#bdc1c6"
                  margin="0 6px 0 0"
                  verticalAlign="middle"
                  TABfontSize="14px"
                >
                  <BiComment />
                </Text>

                {question_found.answer.length}
              </Text>
            ) : (
              <Text
                fontSize="12px"
                color="#bdc1c6"
                verticalAlign="middle"
                margin="0 8px 0 0"
                TABfontSize="10px"
              >
                <Text
                  fontSize="16px"
                  color="#bdc1c6"
                  margin="0 6px 0 0"
                  verticalAlign="middle"
                  TABfontSize="14px"
                >
                  <BiComment />
                </Text>
                0
              </Text>
            )}

            {/* 조회수 */}

            {question_found.viewCount > 0 ? (
              <Text
                fontSize="12px"
                color="#bdc1c6"
                verticalAlign="middle"
                margin="0 8px 0 0"
                TABfontSize="10px"
              >
                <Text
                  fontSize="16px"
                  color="#bdc1c6"
                  margin="0 6px 0 0"
                  verticalAlign="middle"
                  TABfontSize="14px"
                >
                  <AiOutlineEye />
                </Text>
                {question_found.viewCount}
              </Text>
            ) : (
              <Text
                fontSize="12px"
                color="#bdc1c6"
                verticalAlign="middle"
                margin="0 8px 0 0"
                TABfontSize="10px"
              >
                <Text
                  fontSize="16px"
                  color="#bdc1c6"
                  margin="0 6px 0 0"
                  verticalAlign="middle"
                  TABfontSize="14px"
                >
                  <AiOutlineEye />
                </Text>
                0
              </Text>
            )}
          </span>
        </AnswerSection>
      </QnaListCard>
    </React.Fragment>
  );
};

const QnaListCard = styled.div`
  width: 32.48%;
  max-width: 800px;
  height: 250px;
  float: left;
  background-color: #202124;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 32%;
    height: 200px;
    padding: 16px 16px 0;
  }
`;

const QuestionSection = styled.div`
  height: 170px;
  position: relative;
  border-bottom: 1px solid #282a2d;
  box-sizing: border-box;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 140px;
  }
`;

const QuestionInfo = styled.div`
  position: absolute;
  bottom: 16px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    bottom: 4px;
  }
`;

const AnswerSection = styled.div`
  height: 16px;
  padding-top: 16px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 30px;
    padding-top: 12px;
  }
`;

const ProfileImg = styled.img`
  width: 24px;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 16px;
    height: 16px;
  }
`;

QnaCard.defaultProps = {
  _onClick: () => {},
};

export default QnaCard;
