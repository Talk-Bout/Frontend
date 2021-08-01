import React from 'react';
import styled from "styled-components";
import {Text, Button, Grid, Input, Image} from "../elements/index";

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions} from "../redux/modules/comment";

const CommentEdit = (props) => {
  const dispatch = useDispatch();
  const postId = props.postId;
  //리덕스 : 게시글 상세 조회, 해당 게시물 댓글 리스트 조회
  const common_list = useSelector(state => state.post.list);
  const common_find = common_list.find((comment)=> comment.postId == postId);

  const editOn = (commentId) => {
    // setEditId(commentId);
    dispatch(commentActions.isEdit(true));
  }
  
  // 댓글 삭제
  const deleteComment = (postId, commentId) => {
    dispatch(commentActions.deleteCommentDB(postId, commentId));
  }
  console.log(common_find);
    
return (
  <React.Fragment>
    <Grid width="100" height="80%" >
      <ButtonBox>
        <EditDeleteButton
          onClick={()=>deleteComment(postId, common_find.commentId)} >
          삭제
        </EditDeleteButton>
        <EditDeleteButton 
          onClick={()=>editOn(common_find.commentId)} >
          수정
        </EditDeleteButton>
      </ButtonBox>
  </Grid>
  </React.Fragment>
)
};

const ButtonBox = styled.div`
width: 100%;
height: 100%;
`;

const EditDeleteButton = styled.button`
float: right;
background-color: #FFFFFF;
margin: 2% 3% 0 0;
font-size: 0.9vh;
border: none;
color: #121212;
cursor: pointer;
width: 13%;
border-radius: 40vh;
font-weight: bold;
height: 2.3vh;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }
`;

export default CommentEdit;