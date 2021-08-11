import React, {useState} from 'react';
import styled from "styled-components";
import {Text, Grid} from "../elements/index";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions} from "../redux/modules/comment";
import { BiTimeFive, BiLike, BiComment, BiPencil, BiTrashAlt } from 'react-icons/bi';

const CommentEdit = (props) => {

  const dispatch = useDispatch();
  // const postId = props.postId;
  const {commentId, content, postId} = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(content);
  const username = useSelector(state => state.user.user.nickname);

  // 댓글 삭제
  const deleteComment = () => {
    dispatch(commentActions.deleteCommentDB(commentId, postId));
  }

  // 댓글 수정
  const editComment = () => {
  // const editCommentRef = editRef.current.value;
  const edit_comment = {
    commentId : commentId,
    nickname : username,
    content : commentValue,
  };

  dispatch(commentActions.editCommentDB(edit_comment, postId));
  setIsEditMode(false);
  };

return (
<React.Fragment>
  <Grid overflow="hidden" width="100%" height="12vh">
  <Grid display="flex" height="33.3%" borderTop="0.2vh solid #DADCE0"  width="100%">
    <Grid width="50%" height="100%">
      <Text fontSize="1.3vh" color="#BDC1C6">{props.nickname}</Text>
      <Text padding="0 0 0 1%" width="33.3%" fontSize="1.3vh" color="#BDC1C6"><BiTimeFive/>{props.createdAt}</Text>
    </Grid>
  </Grid>
  <Grid height="50%" width="100%"  >
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
    <Grid display="flex" width="100%" height="20%">
    <EditInput
    defaultValue={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
    
    <EditButton onClick={() => (editComment())}>수정완료</EditButton>
    <CancelButton onClick={() => (setIsEditMode(false))}>취소</CancelButton>
    </Grid>
  ):(
    <Text p margin="0% 1%" fontSize="1.5vh" color="#BDC1C6"> {commentValue}</Text>
    )} 
    </Grid>
    <Grid width="100%" height="40%">
    <Text padding="0 2%" width="33.3%" fontSize="1.5vh" color="#BDC1C6"><BiLike/> 10</Text>
    <Text width="33.3%" fontSize="1.5vh" color="#BDC1C6"><BiComment/> 2</Text>
  </Grid>
</Grid>
</React.Fragment>
)
};

const EditInput = styled.textarea`
outline: none;
color: #F1F3F4;
border: 1px solid #9AA0A6;
background-color: transparent;
font-size: 1.3vh;
border-radius: 5px;
margin-left: 15px;
overflow: auto;
height: 54px;
width: 91%;

`;

const EditText = styled.text`
float: right;
border: none;
color: #9AA0A6;
cursor: pointer;
/* width: 8%; */
width: 44px; 
height: 16px;
&:hover {
  background-color: #282A2D;
  color: #DADCE0;
  }

`;

const CancelButton = styled.button`
width: 38px;
height: 60px;
background: #2E3134;
border-radius: 8px;
font-weight: bold;
font-size: 14px;
line-height: 18px;
text-align: center;
letter-spacing: 0.2px;
color: #121212;
margin: 0 0 0 5px;
`;

const EditButton = styled.button`
width: 82px;
height: 60px;
background: #7879F1;
border-radius: 8px;
font-weight: bold;
font-size: 14px;
line-height: 18px;
color: #121212;
margin: 0 0 0 8px;
`;

export default CommentEdit;