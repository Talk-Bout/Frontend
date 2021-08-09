import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';

import { useSelector, useDispatch } from 'react-redux';
import { Text, Button, Grid, Image } from '../elements/index';
import { BiTimeFive, BiLike, BiComment, BiSort} from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa";

const CommonPostList = (props) => {

  const common_list = useSelector(state => state.post.list);

  // 게시물 최신순으로 구현하는 함수
const all_common = common_list.slice(0, common_list.length)
.sort(function(a, b) {
  const timeA = a.createdAt; const timeB = b.createdAt; 
  if (timeA < timeB) return 1; if (timeA > timeB) return -1; });

  return (
    <React.Fragment>
      <Content common_list={all_common} key={props.postId} onClick={() => history.push(`/common/detail/${props.postId}`)}
                >
                <Text p color="#F1F3F4" fontSize="2.6vh" margin="0px" padding="2% 2% 1% 2%" fontWeight="bold">
                 {props.title}
                </Text>
                <Text p color="#9AA0A6" fontSize="2.1vh" margin="0px" padding="0% 2%">
                 {props.content}
               </Text>
              <ProfileImage>
                <Image margin="0 0 3% 0" size="2"/>
                <Text fontSize="1.8vh" color="#9AA0A6" margin="0 0 0 2%" >
                {props.nickname}
                </Text>
              </ProfileImage>
            
              {/* 게시한 날짜, 좋아요, 댓글 */}
            <Grid width="100%" float="left">
            <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%" >
              <BiTimeFive/> &nbsp;
              {props.createdAt}
              </Text>
            <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%">
              <BiLike/> &nbsp;
              {props.likes}
              </Text>
            <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%" >
              <BiComment/> &nbsp; 2
            </Text>
            <hr/>
            </Grid>
            </Content>
    </React.Fragment>
  )
};

const Content = styled.div`
  z-index: 1;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: cover;
  box-sizing: border-box;
  padding: 0% 3%;
  &:hover {
    opacity: 0.7;
  }
`;

const ProfileImage = styled.div`
display: flex;
height: 10%;
padding: 3%;
`;

export default CommonPostList;