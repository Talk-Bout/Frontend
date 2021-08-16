import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Profile from '../image/profile_small.png';
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const MainTalk = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.setPostPopDB(1));
  }, []);

  const post_list = useSelector(state => state.post.pop_list);
  const pop_posts = post_list.slice(0, 4);
  
  return (
    <React.Fragment>
      <Grid className="top-boot" margin="48px 0" TABpadding='32px 0 0'>
        {/* 인기 부트톡톡 */}
        <Text fontSize='24px' fontWeight='700' color='#F8F9FA' TABfontSize='20px'>📣부트톡톡</Text>
        <TextBox>
          {/* 부트캠퍼들이 가장 많이 추천한 게시물 */}
          <Text fontSize='14px' color='#BDC1C6' TABfontSize='12px'>부트캠퍼들의 자유로운 Talk Talk</Text>
          {/* 부트톡톡 더보기 버튼 */}
          <Text fontSize='14px' color='#BDC1C6' cursor='pointer' _onClick={() => history.push('/common/list')}>부트톡톡 더보기 &gt;</Text>
        </TextBox>
        {/* 부트톡톡 게시물 목록 */}
        <Questions>
          {pop_posts.map((pp, idx) => {
          return (
            <QuestionBox key={idx} onClick={() => history.push(`/common/detail/${pp.postId}`)}>
              {/* 게시글 제목 */}
              <Text fontSize="18px" fontWeight='700' TABfontSize='16px' color='#F8F9FA' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'>
                {pp.title}
              </Text>
              {/* 게시글 내용 */}
              <Grid height='50px' TABheight='32px'>
                <Text p fontSize="14px" margin="16px 0 0" letterSpacing='0.2px' lineHeight='18px' color="#9aa0a6" overflow='hidden' wlc='2' wbo='vertical' display='-webkit-box' TABfontSize='12px' TABlineHeight='16px'>{pp.content}</Text>
              </Grid>
              {/* 작성자 정보 */}
              <Grid padding='16px 0 0' TABpadding='24px 0 0'>
                <ProfileImg src={pp.user.profilePic ? pp.user.profilePic : Profile} alt='프로필' />
                <Text fontSize="12px" color="#9aa0a6" margin='0 8px' TABfontSize='10px'>
                  {pp.user.nickname}
                </Text>
                {/* 작성일자 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 12px 0 0' TABfontSize='10px'>
                  <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' TABmargin='0 4px 0 0' vertical_align= 'middle'><BiTimeFive /></Text>{pp.createdAt}
                </Text>
              </Grid>
              <Grid padding='16px 0 0' TABpadding='12px 0 0'>
                {/* 추천 수 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0' TABfontSize='10px'>
                  <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' vertical_align= 'middle' TABfontSize='14px'><BiLike /></Text>{pp.likeNumber}
                </Text>
                {/* 댓글 수 */}
                {/* <Text fontSize='12px' color='#bdc1c6' margin='0 8px'>
                  <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiComment /></span>댓글 수</Text> */}
                {/* 조회수 */}
                <Text fontSize='12px' color='#bdc1c6' margin='0 0 0 8px' TABfontSize='10px'>
                <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' vertical_align= 'middle' TABfontSize='14px'><AiOutlineEye /></Text>{pp.viewCount}</Text>
              </Grid>
            </QuestionBox>
          );
        })}
        </Questions>
      </Grid>
    </React.Fragment>
  );
};

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0 24px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    margin: 4px 0 20px;
  } 
`;

const Questions = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const QuestionBox = styled.div`
  height: fit-content;
  width: 49%;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #b5b5b5;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    border-bottom: 1px solid #3c4043;
    padding: 16px;
  }
`;

const ProfileImg = styled.img`
  width: 24px;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 16px;
  }
`;

export default MainTalk;
