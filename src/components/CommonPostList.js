import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from '../elements';
import { Profile_small } from '../image';
import { history } from '../redux/ConfigureStore';
import { useSelector } from 'react-redux';
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const CommonPostList = (props) => {
  const common_list = useSelector(state => state.post.list);

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
          <Profile>
            <ProfileImage src={props.user.profilePic != null ? `http://fw3efsadfcv.shop${props.user.profilePic}` : Profile_small} />
          </Profile>
          <Text fontSize="12px" color="#9aa0a6" margin='0 8px' TABfontSize='10px' MOBfontSize='8px'>
            {props.nickname}
          </Text>
          {/* 작성일자 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 12px 0 0' TABmargin='0' MOBmargin='0' TABfontSize='10px' MOBfontSize='8px'>
            <Text fontSize='16px' MOBfontSize='14px' color='#bdc1c6' margin='0 6px 0 0' TABmargin='0 4px 0 0' verticalAlign='middle'><BiTimeFive /></Text>{props.createdAt}
          </Text>
        </Grid>
        <Grid margin='16px 0 0' TABmargin='12px 0 0'>
          {/* 추천 수 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0' TABfontSize='10px' MOBfontSize='8px'>
            <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' verticalAlign='middle' TABfontSize='14px'><BiLike /></Text>{props.postLike ? props.postLike.length : '0'}
          </Text>
          {/* 댓글 수 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 8px' MOBfontSize='8px'>
            <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' verticalAlign='middle' TABfontSize='14px'><BiComment /></Text>{props.postComment ? props.postComment.length : '0'}</Text>
          {/* 조회수 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 0 0 8px' TABfontSize='10px' MOBfontSize='8px'>
            <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' verticalAlign='middle' TABfontSize='14px'><AiOutlineEye /></Text>{props.viewCount}
          </Text>
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
  @media screen and (max-width: 1090px) {
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
  @media screen and (max-width: 1090px) {
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