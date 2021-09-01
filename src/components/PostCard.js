import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { WriterInfo, PostInfo } from '.';
import { AiOutlineRight } from "react-icons/ai";

const PostCard = (props) => {
  const { _onClick, title, content, profilePic, nickname, createdAt, viewCount, commentNumber, likes, width_point, height, TABheight, MOBheight, category_bool, board_name, category_name, mypost_bool, question_bool, answer_bool} = props;
  
  const cardContent = {
    title: title,
    content: content,
  }
  const userInfo = {
    profilePic: profilePic,
    nickname: nickname,
    createdAt: createdAt,
  }
  const postInfo = {
    viewCount: viewCount,
    commentNumber: commentNumber,
    likes: likes,
  }
  
  return (
    <React.Fragment>
      {/* 글 */}
      <QnaListCard onClick={_onClick} width_point={width_point} height={height} TABheight={TABheight} MOBheight={MOBheight}>
        {/* 제목 */}
        <Text fontSize="18px" fontWeight="700" color="#F8F9FA" overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" TABfontSize="16px" MOBfontSize='14px'>
        {question_bool ?
        <span style={{ marginRight: '8px' }}>Q</span>
        :
        ''
        }
        {answer_bool ?
        <span style={{ marginRight: '8px' }}>A</span>
        :
        ''
        }
          {cardContent.title}
        </Text>
        {/* 내용 */}
        <Content>
          <Text p fontSize="14px" color="#9AA0A6" lineHeight='18px' letterSpacing='0.2px' overflow="hidden" display="-webkit-box" wlc="4" MOBwlc='2' wbo="vertical" TABoverflow="hidden" TABfontSize="12px" MOBfontSize='10px' wordBreak='break-all'>
            {cardContent.content}
          </Text>
        </Content>
        {/* 작성자 프로필 사진, 닉네임, 작성일시 */}
        {mypost_bool ? 
        <WriterInfo mypost_bool={mypost_bool} userInfo={userInfo} width_point={width_point}/>
        :
        <WriterInfo userInfo={userInfo} width_point={width_point}/>
        }
        <Line />
        {category_bool ? 
        // 게시판 및 카테고리
        <Grid padding="2px 5px 0 0" justify_content="space-between" display="flex" height="20px" width="100%">
          {/* 카테고리 이름이 있으면 보여주고, 없으면 게시판 이름만 보여주기 */}
        {category_name ? 
        <Text color="#BDC1C6" fontSize="14px" TABfontSize="12px" MOBfontSize='10px' display='-webkit-box' overflow='hidden' wlc='1' wbo='vertical'> {board_name} <span style={{verticalAlign: 'middle'}}><AiOutlineRight /></span> {category_name === 'info' ? '정보' : category_name === 'chitchat' ? '잡담' : category_name === 'job' ? '취업' : category_name === 'lecture' ? '인터넷 강의' : `${category_name} 리뷰`} </Text>
        :
        <Text color="#BDC1C6" fontSize="14px" TABfontSize="12px" MOBfontSize='10px'> {board_name} </Text>
        }
        </Grid>
        :
        // 추천 수, 댓글(답변) 수, 조회수
        <PostInfo postInfo={postInfo} />}
      </QnaListCard>
    </React.Fragment>
  );
};

const QnaListCard = styled.div`
  height: ${(props) => props.height ? props.height : '250px'};
  background-color: #202124;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: ${(props) => props.width_point}) {
    height: 270px;
  }
  @media screen and (max-width: 1150px) {
    height: ${(props) => props.TABheight ? props.TABheight : '230px'};
    padding: 16px 16px 0;
  }
  @media screen and (max-width: 767px) {
    height: ${(props) => props.MOBheight ? props.MOBheight : 'fit-content'};
    padding: 14px 14px 8px;
  }
`;

const Content = styled.div`
  height: 72px;
  margin: 16px 0 32px;
  @media screen and (max-width: 1150px) {
    margin: 10px 0 10px;
  }
  @media screen and (max-width: 767px) {
    height: 28px;
    margin: 12px 0 16px;
  }
`;

const Line = styled.hr`
  border: 1px solid #282a2d;
  @media screen and (max-width: 1150px) {
    margin-bottom: 0px;
  }
`;

PostCard.defaultProps = {
  _onClick: () => {},
  category_bool: false,
};

export default PostCard;
