import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Text, Button, Grid, Input, Image} from "../elements/index";

import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions} from "../redux/modules/comment";
import { BiTimeFive, BiLike, BiComment, BiCommentEdit } from 'react-icons/bi';

const CommentEdit = (props) => {

  const dispatch = useDispatch();
  // const postId = props.postId;
  const {commentId, nickname, content, postId} = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(content);

  // 댓글 삭제
  const deleteComment = (postId, commentId) => {
    dispatch(commentActions.deleteCommentDB(postId, commentId));
  }

  // 댓글 수정
  const editComment = () => {
  // const editCommentRef = editRef.current.value;
  const edit_comment = {
    nickname : nickname,
    content : commentValue,
  };

  dispatch(commentActions.editCommentDB(edit_comment, commentId, postId));
  setIsEditMode(false);
  };

return (
<React.Fragment>
  <Grid overflow="hidden" width="100%" height="12vh">
  <Grid display="flex" height="33.3%" borderTop="0.2vh solid #DADCE0" padding="0 0 0 2%" width="100%">
    <Grid width="50%" height="100%" margin="1% 0 0 0">
      <Text fontSize="1.3vh" color="#BDC1C6">{props.nickname}</Text>
      <Text padding="0 0 0 1%" width="33.3%" fontSize="1.3vh" color="#BDC1C6"><BiTimeFive/>{props.createdAt}</Text>
    </Grid>
  </Grid>
  <Grid height="33.3%" padding="0.3% 0 0 0" width="100%"  >
  {isEditMode ? (
      ""
    ) : (
      <>
      <EditButton
      onClick={()=>(deleteComment(postId, props.commentId))}
      >
      삭제
    </EditButton>
      <EditButton
      onClick={()=>(setIsEditMode(true))}
      >
      수정
      </EditButton>
      </>
    )}
  {isEditMode? (
    <>
    <EditInput
    defaultValue={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
    <EditButton onClick={() => (setIsEditMode(false))}>수정취소</EditButton>
    <EditButton onClick={() => (editComment())}>수정완료</EditButton>
    </>
  ):(
    <Text p margin="0% 1%" padding="0% 2%" fontSize="1.5vh" color="#BDC1C6"> {commentValue}</Text>
    )} 
    </Grid>
  <Grid width="100%" height="33.3%">
    <Text padding="0 2%" width="33.3%" fontSize="1.5vh" color="#BDC1C6"><BiLike/> 10</Text>
    <Text width="33.3%" fontSize="1.5vh" color="#BDC1C6"><BiComment/> 2</Text>
  </Grid>  
</Grid>
</React.Fragment>
)
};

const EditInput = styled.input`
outline: none;
color: #DADCE0;
border: 1px solid #DADCE0;
background-color: transparent;
font-size: 1.3vh;
border-radius: 20vh;
margin-left: 3%;
height: 2.5vh;
width:50vh;

`;

const EditButton = styled.button`
float: right;
background-color: #FFFFFF;
margin: 0 1%;
font-size: 1.2vh;
border: none;
color: #121212;
cursor: pointer;
width: 8%;
border-radius: 40vh;
font-weight: bold;
height: 2.3vh;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }
`;

export default CommentEdit;