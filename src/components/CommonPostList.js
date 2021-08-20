import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from '../elements';
import { Profile_small } from '../image';
import { history } from '../redux/ConfigureStore';
import { useSelector } from 'react-redux';
import { BiTimeFive, BiLike, BiComment} from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const CommonPostList = (props) => {
  const one_post = useSelector(state => state.post.one_post);
  const common_list = useSelector(state => state.post.list);

  return (
    <React.Fragment>
      <Content common_list={common_list} key={props.postId} onClick={() => history.push(`/common/detail/${props.postId}`)}>
        {/* 부트톡톡 게시글 제목 */}
        <Text fontSize="18px" fontWeight='700' TABfontSize='16px' color='#f1f3f4' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'>
          {props.title}
        </Text>
        {/* 부트톡톡 게시글 내용 */}
        <Grid height='50px' TABheight='32px'>
          <Text p fontSize="14px" margin="16px 0 0" TABmargin='10px 0 0' letterSpacing='0.2px' lineHeight='18px' color="#9aa0a6" overflow='hidden' wlc='2' wbo='vertical' display='-webkit-box' TABfontSize='12px' TABlineHeight='16px'>{props.content}</Text>
        </Grid>
        {/* 작성자 정보 */}
        <Grid margin='16px 0 0' TABmargin='24px 0 0'>
          <ProfileImage src={props.profilePic ? props.profilePic : Profile_small}
          alt='프로필' />
          <Text fontSize="12px" color="#9aa0a6" margin='0 8px' TABfontSize='10px'>
            {props.nickname}
          </Text>
          {/* 작성일자 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 12px 0 0' TABmargin='12px 0 0' TABfontSize='10px'>
            <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' TABmargin='0 4px 0 0' verticalAlign= 'middle'><BiTimeFive /></Text>{props.createdAt}
          </Text>
        </Grid>
        <Grid margin='16px 0 0' TABmargin='12px 0 0'>
          {/* 추천 수 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 8px 0 0' TABfontSize='10px'>
            <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' verticalAlign= 'middle' TABfontSize='14px'><BiLike /></Text>{props.postLike ? props.postLike.length : '0'}
          </Text>
          {/* 댓글 수 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 8px'>
            <span style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '6px'}}><BiComment /></span>{props.postComment ? props.postComment.length : '0'}</Text>
          {/* 조회수 */}
          <Text fontSize='12px' color='#bdc1c6' margin='0 0 0 8px' TABfontSize='10px'>
            <Text fontSize='16px' color='#bdc1c6' margin='0 6px 0 0' verticalAlign= 'middle' TABfontSize='14px'><AiOutlineEye /></Text>{props.viewCount}
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
  @media screen and (min-width: 768px) and (max-width: 992px) {
    border-bottom: 1px solid #3c4043;
    padding: 16px;
  }
`;

const ProfileImage = styled.img`
  width: 24px;
  vertical-align: middle;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 16px;
  }
`;

export default CommonPostList;