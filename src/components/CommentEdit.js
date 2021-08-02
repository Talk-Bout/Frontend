import React, {useEffect} from 'react';
import styled from "styled-components";
import {Text, Button, Grid, Input, Image} from "../elements/index";

import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions} from "../redux/modules/comment";
import { BiTimeFive, BiLike, BiComment, BiCommentEdit } from 'react-icons/bi';

const CommentEdit = (props) => {

  const dispatch = useDispatch();
  const postId = props.postId;

  // 댓글 삭제
  const deleteComment = (postId, commentId) => {
    dispatch(commentActions.deleteCommentDB(postId, commentId));
  }

  const editOn = () => {
    // setEditId(commentId);
    dispatch(commentActions.isEdit(true));
  }
    
return (
<React.Fragment>
  <Grid overflow="hidden" width="100%" height="8vh">
  <Grid display="flex" height="30%" borderTop="0.2vh solid #DADCE0" padding="0 0 0 2%" width="100%">
    <Grid width="50%" height="100%" >
      <Text fontSize="1.2vh" color="#BDC1C6">{props.nickname}</Text>
      <Text padding="0 0 0 1%" width="33.3%" fontSize="1.2vh" color="#BDC1C6"><BiTimeFive/>{props.createdAt}</Text>
    </Grid>
    <Grid width="50%" height="100%"> 
      <Grid width="100" height="80%" >
      <ButtonBox>
        <EditDeleteButton
          onClick={()=>deleteComment(postId, props.commentId)} >
          삭제
        </EditDeleteButton>
        <EditDeleteButton 
          onClick={()=>editOn(props.commentId)}
          >
          수정
        </EditDeleteButton>
      </ButtonBox>
      </Grid>
    </Grid>
  </Grid>
  <Grid height="30%" padding="0.3% 0 0 0" width="70%"  >
      <Text p margin="0 0 0 1%" padding="0% 2%" fontSize="1.2vh" color="#BDC1C6"> {props.content}</Text>
  </Grid>
  <Grid height="30%" width="100%">
    <Text padding="0 2%" width="33.3%" fontSize="1.2vh" color="#BDC1C6"><BiLike/> 10</Text>
    <Text width="33.3%" fontSize="1.2vh" color="#BDC1C6"><BiComment/> 2</Text>
  </Grid>  
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