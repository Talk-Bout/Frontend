import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Text, Grid } from '../elements/index';
import { actionCreators as commentActions } from '../redux/modules/comment';
//icons
import CommentEdit from '../components/CommentEdit';

const Comment = (props) => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.user.user.nickname);
  const is_login = useSelector((state) => state.user.is_login);
  const comment_list = useSelector((state) => state.comment.list);
  const addRef = useRef(null);
  const postId = parseInt(props.postId);
  const [comment_page, setCommentPage] = useState(1);

  //댓글 등록
  const addComment = () => {
    const addCommentRef = addRef.current.value;

    const new_comment = {
      content: addCommentRef,
      nickname: nickname,
      postId: postId,
    };
    if (!is_login) {
      window.alert('로그인 후 이용해주세요!');
      return;
    };
    if (addCommentRef === '') {
      window.alert('댓글을 입력해주세요!');
      return;
    };

    dispatch(commentActions.addCommentDB(new_comment));
    addRef.current.value = '';
  };
  
  // 댓글 조회
  // useEffect(() => {
  //   dispatch(commentActions.setCommentDB(postId));
  //   // dispatch(commentActions.isEdit(true));
  // }, []);
  
  // 댓글 더보기
  const moreComment = () => {
    setCommentPage(comment_page + 1);
  }

  if (!comment_list) {
    return (
      <></>
    );
  };
  return (
    <React.Fragment>
      <Grid width="100%" height="80%">
        <Grid width="100%" height="20%">
          <Text
            p
            color="#DADCE0"
            margin="5px 0 20px 0"
            fontWeight="bold"
            fontSize="14px"
            lineHeight="18px"
          >
            댓글
          </Text>
        </Grid>
        <Grid width="100%" height="60%">
          <CommentBox>
            <CommentInput
              placeholder="댓글을 남겨주세요"
              ref={addRef}
              // onSubmit={addComment}
            />
            <WriteButton
              onClick={() => {
                addComment();
              }}
            >
              등록하기
            </WriteButton>
          </CommentBox>
        </Grid>
      </Grid>
      <Grid width="100%" height="40vh">
        {comment_list &&
          comment_list.map((ct, index) => {
            return <CommentEdit key={ct.commentId} {...ct} />;
          })}
      </Grid>
      {/* 댓글 더보기 버튼 */}
      {comment_list ?
      <>
              <MoreBtn disabled><Text fontSize='14px' fontWeight='700' color='#A9AAAB' onClick={() => moreComment()}>댓글 더보기(1/2)</Text></MoreBtn>
              </>
              :
              <>
              <MoreBtn><Text fontSize='14px' fontWeight='700' color='#A9AAAB' onClick={() => moreComment()}>댓글 더보기(1/2)</Text></MoreBtn>
              </>}
              
    </React.Fragment>
  );
};

const CommentBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  margin: auto;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 48px;
  left: 0px;
  top: 430px;
  padding: 20px 10px 20px 20px;
  border: 1px solid #9aa0a6;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: transparent;
  color: #dadce0;
`;

const WriteButton = styled.button`
  /* height: 50%;
width: 13%; */
  background-color: #7879f1;
  margin: 0 0 0 8px;
  font-size: 1.7vh;
  border: none;
  color: #121212;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #282a2d;
    color: #dadce0;
  }

  width: 134px;
  height: 48px;
  left: 698px;
  top: 430px;
`;

const CommentListButton = styled.button`
  width: 100%;
  margin: auto;
  height: 100%;
  display: block;
  background-color: #282a2d;
  color: #dadce0;
  border: none;
  &:hover {
    background-color: #ffffff;
    color: #121212;
  }
`;

const MoreBtn = styled.button`
  width: 100%;
  padding: 23px 0;
  margin: 0 0 64px;
  background-color: #282A2D;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

export default Comment;
