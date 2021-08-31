import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from '../elements';
import { WriterInfo, PostInfo } from '.';
import { history } from '../redux/ConfigureStore';
import { useSelector } from 'react-redux';

const CommonPostList = (props) => {
  const common_list = useSelector(state => state.post.list);
  const userInfo = {
    profilePic: props.user.profilePic,
    nickname: props.nickname,
    createdAt: props.createdAt,
  }
  const postInfo = {
    viewCount: props.viewCount,
    commentNumber: 0,
    like: props.postLike,
  }

  return (
    <React.Fragment>
      <Content common_list={common_list} key={props.postId} onClick={() => history.push(`/common/detail/${props.postId}`)}>
        {/* 부트톡톡 게시글 제목 */}
        <Text fontSize="18px" fontWeight='700' TABfontSize='16px' MOBfontSize='14px' color='#f1f3f4' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'>
          {props.title}
        </Text>
        {/* 부트톡톡 게시글 내용 */}
        <Grid height='50px' TABheight='32px' MOBheight='50px' TABmargin='0 0 12px' MOBmargin='0 0 20px'>
          <Text p fontSize="14px" margin="16px 0 0" TABmargin='10px 0 0' letterSpacing='0.2px' lineHeight='18px' color="#9aa0a6" overflow='hidden' wlc='2' wbo='vertical' display='-webkit-box' TABfontSize='12px' TABlineHeight='16px' MOBfontSize='10px'>{props.content}</Text>
        </Grid>
        {/* 작성자 정보 */}
        <Grid margin='16px 0 0' TABmargin='24px 0 0' MOBmargin='0' display='flex'>
          <WriterInfo width_point='1150px' userInfo={userInfo}/>
        </Grid>
        <Grid margin='16px 0 0' TABmargin='12px 0 0'>
          <PostInfo postInfo={postInfo} />
        </Grid>
      </Content>
    </React.Fragment>
  )
};

const Content = styled.div`
  height: fit-content;
  width: 49%;
  padding: 24px;
  border-bottom: 1px solid #3C4043;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 1150px) {
    border-bottom: 1px solid #3c4043;
    padding: 16px;
  }
  @media screen and (max-width: 767px) {
    border-bottom: 1px solid #3c4043;
    padding: 16px 16px 12px;
    width: 99%;
  }
`;

const Profile = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1150px) {
    width: 16px;
    height: 16px;
  }
  @media screen and (max-width: 767px) {
    width: 14px;
    height: 14px;
  }
`;

const ProfileImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
`;

export default CommonPostList;