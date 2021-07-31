import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import {Text, Button, Grid, Input} from "../elements/index";
import Header from '../components/Header';
import { actionCreators as commentActions} from "../redux/modules/comment";
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';

const Comment = (props) => {

    const dispatch = useDispatch();
    
    const addRef = useRef(null);
    const postId = props.postId;

    // 댓글 조회
    useEffect(() => {
      dispatch(commentActions.setCommentDB(postId));
      // dispatch(commentActions.isEdit(true));
  }, []);

    //댓글 등록
    const addComment = () => {
      const addCommentRef = addRef.current.value;
      console.log(addCommentRef);
      const new_comment = {
        content : addCommentRef,
        nickname : "username"
    }

      if (addCommentRef === "") {
        window.alert("댓글을 입력해주세요!");
        return;
      }
     
    dispatch(commentActions.addCommentDB(new_comment, postId));
    addRef.current.value = "";
    }

      return (
        <React.Fragment>
        <Grid width="100%" height="90%" >
          <Grid width="100%" height="30%"   >
            <Text p color="#DADCE0" margin="1% 0 0 0.5%" fontWeight="bold" fontSize="1.5vh">
            댓글 &nbsp; 15
            </Text>
          </Grid>
          <Grid width="100%" height="65%" >
          <CommentBox>
          <Input outline="none" color="#DADCE0" width="100%" border="1px solid #DADCE0" bg="transparent" font_size="1.3vh"  border_radius="20vh" height="10%"
          placeholder="댓글을 남겨주세요" _ref={addRef} onSubmit={addComment}/>
          <WriteButton onClick={()=> {addComment();}}>
            등록하기
          </WriteButton>
        </CommentBox>
          </Grid>
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
background-color: #FFFFFF;
margin: 0 1%;
font-size: 1.3vh;
border: none;
color: #121212;
cursor: pointer;
width: 13%;
border-radius: 40vh;
font-weight: bold;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }
`;

export default Comment;