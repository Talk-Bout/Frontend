import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Text, Button, Grid, Input, Image} from "../elements/index";

import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions} from "../redux/modules/comment";
import { BiTimeFive, BiLike, BiComment, BiCommentEdi, BiPencil, BiTrashAlt } from 'react-icons/bi';

const CommentEdit = (props) => {

  const dispatch = useDispatch();
  // const postId = props.postId;
  console.log(props, "props");
  const {commentId, content, postId} = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(content);
  const username = useSelector(state => state.user.user.nickname);
  console.log(commentId);

  // 댓글 삭제
  const deleteComment = () => {
    dispatch(commentActions.deleteCommentDB(commentId, postId));
    console.log(commentId, "commentId");
    console.log(postId, "postId");
  }

  // 댓글 수정
  const editComment = () => {
  // const editCommentRef = editRef.current.value;
  const edit_comment = {
    commentId : commentId,
    nickname : username,
    content : commentValue,
  };
  console.log(edit_comment);

  dispatch(commentActions.editCommentDB(edit_comment, postId));
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
      <EditText
      onClick={()=>(deleteComment())}
      >
      <BiTrashAlt />
    </EditText>
      <EditText
      onClick={()=>(setIsEditMode(true))}
      >
      <BiPencil />
      </EditText>
      </>
    )}
  {isEditMode? (
    <>
    <EditInput
    defaultValue={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
    <EditText onClick={() => (setIsEditMode(false))}>수정취소</EditText>
    <EditText onClick={() => (editComment())}>수정완료</EditText>
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
border-radius: 5px;
margin-left: 3%;
height: 2.5vh;
width:50vh;

`;

const EditText = styled.text`
float: right;
border: none;
color: #9AA0A6;
cursor: pointer;
/* width: 8%; */
width: 48px;
height: 16px;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }

`;

export default CommentEdit;