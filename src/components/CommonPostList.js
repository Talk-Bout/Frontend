import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';

import Profile from '../image/profile_small.png';
import { useSelector, } from 'react-redux';
import { Text, Grid} from '../elements/index';
import { BiTimeFive, BiLike, BiComment} from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const CommonPostList = (props) => {
  const one_post = useSelector(state => state.post.one_post);
  const common_list = useSelector(state => state.post.list);

  return (
    <React.Fragment>
      <Content common_list={common_list} key={props.postId} onClick={() => history.push(`/common/detail/${props.postId}`)}
                >
                <Text p color="#F1F3F4" lineHeight="27px" fontSize="18px" fontWeight="bold">
                 {props.title}
                </Text>
                <Text p color="#9AA0A6" lineHeight="18px" fontSize="14px"
                overflow="hidden" display="-webkit-box" wlc="1" wbo="vertical" >
                 {props.content}
               </Text>
              <ProfileImage>
                <img src={Profile} alt='프로필' style={{margin: "0 8px 0 0"}}/>
                <Text lineHeight="16px" fontSize="12px" color="#9AA0A6" margin= "0px 8px">
                {props.nickname}
                </Text>
                <Text color="#9AA0A6" fontSize="12px" margin= "0px 8px"  >
                  <BiTimeFive/> &nbsp; {props.createdAt}
                </Text>
              </ProfileImage>
            
            <Grid width="100%" float="left">
            <LikeAndCountBox>
              {/* 좋아요 */}
              <Text color="#9AA0A6" fontSize="12px" width="36px" margin= "0 16px 0 0">
                <BiLike/> &nbsp; {props.postLike ? props.postLike.length : '0'}
                </Text>
              {/* 댓글 수 */}
              <Text color="#9AA0A6" fontSize="12px"  width="33.3%" margin= "0px 16px 0 0">
                <BiComment/> &nbsp; {props.postComment ? props.postComment.length : '0'}
              </Text>
              {/* 조회수 */}
              <Text color="#9AA0A6" fontSize="12px" width="43px">
              <AiOutlineEye /> <span>{props.viewCount}</span>
              </Text>
              
            </LikeAndCountBox>
            
            </Grid>
            </Content>
    </React.Fragment>
  )
};

const Content = styled.div`
border-bottom: 1px solid #9AA0A6;
  z-index: 1;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 191px;
  background-size: cover;
  box-sizing: border-box;
  flex-wrap: wrap;
  &:hover {
    opacity: 0.7;
  }

`;

const ProfileImage = styled.div`
display: flex;
/* height: 10%;
padding: 3%; */
width: 400px;
height: 24px;
margin: 16px 0px;
`;

const LikeAndCountBox = styled.div`
width: 140px;
height: 16px;
margin: 10px 0 24px 0;

`;

export default CommonPostList;