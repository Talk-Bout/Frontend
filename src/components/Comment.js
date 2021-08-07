import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import { Text, Button, Grid, Input } from '../elements/index';
import Header from '../components/Header';
import { actionCreators as commentActions } from '../redux/modules/comment';
//icons
import CommentEdit from '../components/CommentEdit';

const Comment = (props) => {
  
const dispatch = useDispatch();
const username = useSelector(state => state.user.user.nickname);
const comment_list = useSelector(state => state.comment.list);
const addRef = useRef(null);
const postId = parseInt(props.postId);

// 댓글 조회
useEffect(() => {
  dispatch(commentActions.setCommentDB(postId));
  // dispatch(commentActions.isEdit(true));
}, []);

// 댓글 최신순으로 구현하는 함수
const all_comment = comment_list.slice(0, comment_list.length)
.sort(function(a, b) {
  const timeA = a.createdAt; const timeB = b.createdAt; 
  if (timeA < timeB) return 1; if (timeA > timeB) return -1; });

  //댓글 등록
  const addComment = () => {
    const addCommentRef = addRef.current.value;

    const new_comment = {
      content : addCommentRef,
      nickname : username,
      postId : postId,
  }
  console.log(new_comment);
  
    if (addCommentRef === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }
  dispatch(commentActions.addCommentDB(new_comment));
  // console.log(dispatch(commentActions.addCommentDB(new_comment)));
  addRef.current.value = "";
  }

return (
  <React.Fragment>
  <Grid width="100%" height="100%" >
    <Grid width="100%" height="5%"   >
      <Text p color="#DADCE0" margin="2% 0 0 0.5%" fontWeight="bold" fontSize="2vh">
      댓글 &nbsp; 15
      </Text>
    </Grid>
    <Grid width="100%" height="95%">
    <CommentBox>
    <Input padding="0 3%" outline="none" color="#DADCE0" width="100%" border="1px solid #DADCE0" bg="transparent" font_size="2vh"  border_radius="5px" height="50%"
    placeholder="댓글을 남겨주세요" _ref={addRef} onSubmit={addComment}/>
    <WriteButton onClick={()=> {addComment()}}>
      등록하기
    </WriteButton>
    </CommentBox>
    </Grid>
  </Grid>
  <Grid width="100%" height="40vh" >
  {all_comment && all_comment.map((ct, index) => {
  return (
    <CommentEdit  key={ct.commentId} {...ct}/>
  )
  })}
  </Grid>
  </React.Fragment>
  )    
}

const CommentBox = styled.div`
display: flex;
width: 100%;
height: 100%;
text-align: center;
align-items: center;
margin: auto;
`;

const WriteButton = styled.button`
height: 50%;
background-color: #7879F1;
margin: 0 1%;
font-size: 1.7vh;
border: none;
color: #121212;
cursor: pointer;
width: 13%;
border-radius: 5px;
font-weight: bold;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }
`;

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
