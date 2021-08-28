import React from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import { Profile_small } from '../image';
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const QnaCard = (props) => {
  const { _onClick } = props;

  return (
    <React.Fragment>
      {/* 질문 글 */}
      <QnaListCard onClick={_onClick}>
        {/* 질문 제목 */}
        <Text fontSize="18px" fontWeight="700" color="#F8F9FA" overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px">
          <span style={{ marginRight: '8px' }}>Q</span>
          {props.title}
        </Text>
        {/* 질문 내용 */}
        <Content>
          <Text p fontSize="14px" color="#9AA0A6" lineHeight='18px' letterSpacing='0.2px' overflow="hidden" display="-webkit-box" wlc="4" wbo="vertical" TABoverflow="hidden" TABfontSize="12px">
            {props.content}
          </Text>
        </Content>
        {/* 화면 너비 width > 1200px 일 때 보이기 */}
        <QInfoDesktop>
          {/* 작성자 프로필 이미지 */}
          <ProfileImg src={props.user.profilePic != null && props.user.profilePic !== 'null' ? `http://fw3efsadfcv.shop${props.user.profilePic}` : Profile_small} width='16px' />
          {/* 작성자 닉네임 */}
          <Text fontSize="12px" TABfontSize='10px' color="#80868b" lineHeight="24px" margin="0 16px 0 8px" TABmargin='0 4px 0'>
            {props.nickname}
          </Text>
          {/* 작성일자 */}
          <Text fontSize="12px" color="#80868b" lineHeight="24px" TABfontSize="8px">
            <Text fontSize="16px" TABfontSize="10px" verticalAlign="middle" margin="0 4px 0 0" TABmargin="0 2px 0 0"><BiTimeFive /></Text>
            {props.createdAt}
          </Text>
        </QInfoDesktop>
        {/* 화면 너비 < 1200px 일 때 보이기 */}
        <QInfoTablet>
          {/* 작성자 프로필 이미지 */}
          <ProfileImg src={props.user.profilePic != null && props.user.profilePic !== 'null' ? `http://fw3efsadfcv.shop${props.user.profilePic}` : Profile_small} width='16px' />
          {/* 작성자 닉네임 */}
          <Text color="#80868b" fontSize='12px' lineHeight='24px' TABfontSize="10px" margin='0 16px 0 8px' TABmargin="0 4px 0">
            {props.nickname}
          </Text>
          <Date>
            {/* 작성일자 */}
            <Text fontSize='12px' color="#80868b" lineHeight='24px' TABfontSize="8px">
              <Text fontSize='16px' verticalAlign="middle" TABfontSize="10px" margin='0 4px 0 0' TABmargin="0 2px 0 0"><BiTimeFive /></Text>
              {props.createdAt}
            </Text>
          </Date>
        </QInfoTablet>
        <Line />
        <span style={{ height: 'fit-content' }}>
          {/* 추천 수 */}
          {props.questionLike ?
            <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" margin="0 16px 0 0" TABfontSize="10px">
              <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><BiLike /></Text>
              {props.questionLike.length}
            </Text>
            :
            <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" margin="0 16px 0 0" TABfontSize="10px">
              <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><BiLike /></Text>
              0
            </Text>
          }
          {/* 답변 수 */}
          {props.answer ?
            <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" margin="0 16px 0 0" TABfontSize="10px">
              <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><BiComment /></Text>
              {props.answerNumber}
            </Text>
            :
            <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" margin="0 16px 0 0" TABfontSize="10px">
              <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><BiComment /></Text>
              0
            </Text>
          }
          {/* 조회수 */}
          {props.viewCount > 0 ?
            <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" TABfontSize="10px">
              <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><AiOutlineEye /></Text>
              {props.viewCount}
            </Text>
            :
            <Text fontSize="12px" color="#bdc1c6" verticalAlign="middle" TABfontSize="10px">
              <Text fontSize="16px" color="#bdc1c6" margin="0 6px 0 0" verticalAlign="middle" TABfontSize="14px"><AiOutlineEye /></Text>
              0
            </Text>
          }
        </span>
      </QnaListCard>
    </React.Fragment>
  );
};

const QnaListCard = styled.div`
  height: 250px;
  background-color: #202124;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 1200px) {
    height: 270px;
  }
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    height: 230px;
    padding: 16px 16px 0;
  }
`;

const Content = styled.div`
  height: 72px;
  margin: 16px 0 32px;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    margin: 10px 0 10px;
  }
`;

const QInfoDesktop = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const QInfoTablet = styled.div`
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const ProfileImg = styled.img`
  width: 24px;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 1090px) {
    width: 16px;
    height: 16px;
  }
`;

const Date = styled.div`
  @media screen and (max-width: 1200px) {
    margin-top: -8px;
    margin-left: 30px;
  }
  @media screen and (max-width: 1090px) {
    margin-left: 20px;
  }
`;

const Line = styled.hr`
  border: 1px solid #282a2d;
`;

QnaCard.defaultProps = {
  _onClick: () => { },
};

export default QnaCard;
