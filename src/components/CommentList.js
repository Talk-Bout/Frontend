import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import {Text, Button, Grid, Input} from "../elements/index";
import { actionCreators as commentActions} from "../redux/modules/comment";
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';
import CommentEdit from './CommentEdit';

const Comment = (props) => {

const dispatch = useDispatch();
const comment_list = useSelector(state => state.comment.list);
const postId = props.postId;

// 댓글 조회
useEffect(() => {
  dispatch(commentActions.setCommentDB(postId));
  // dispatch(commentActions.isEdit(true));
}, []);

return(
  <React.Fragment>
<Grid width="97%" height="40vh" >
  {comment_list && comment_list.map((ct, index) => {
  return (
  <Grid overflow="hidden" width="100%" height="8vh">
    <Grid display="flex" height="30%" borderTop="0.2vh solid #DADCE0" padding="0 0 0 2%" width="100%">
      <Grid width="50%" height="100%" >
        <Text fontSize="1.2vh" color="#BDC1C6">{ct.nickname}</Text>
        <Text padding="0 0 0 1%" width="33.3%" fontSize="1.2vh" color="#BDC1C6"><BiTimeFive/>{ct.createdAt}</Text>
      </Grid>
      <Grid width="50%" height="100%"> 
        <CommentEdit/>
      </Grid>
    </Grid>
    <Grid height="30%" padding="0.3% 0 0 0" width="70%"  >
        <Text p margin="0 0 0 1%" padding="0% 2%" fontSize="1.2vh" color="#BDC1C6"> {ct.content}</Text>
    </Grid>
    <Grid height="30%" width="100%">
      <Text padding="0 2%" width="33.3%" fontSize="1.2vh" color="#BDC1C6"><BiLike/> 10</Text>
      <Text width="33.3%" fontSize="1.2vh" color="#BDC1C6"><BiComment/> 2</Text>
    </Grid>  
  </Grid>
  )
  })}
  <Grid width="100%" height="6vh">
    <Grid width="100%" height="6vh">
      <CommentListButton>
        댓글 더보기 (1/2)
      </CommentListButton>
    </Grid>
  </Grid>
  </Grid>
    </React.Fragment>
)    
}

const CommentListButton = styled.button`
width: 100%;
margin: auto;
height: 100%;
display: block;
background-color: #282A2D;
color: #DADCE0;
border: none;
&:hover {
  background-color: #FFFFFF;
  color: #121212;
  }
`;

export default Comment;