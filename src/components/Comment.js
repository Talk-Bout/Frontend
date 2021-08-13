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
  // const comment_list = useSelector((state) => state.comment.list);
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
  
  // 서버에서 불러온 댓글 목록
  const all_comment = useSelector(state => state.comment.list);
  // 이 커뮤니티글의 댓글이 맞는지 재확인
  const comment_check = all_comment.filter((comment) => comment.postId === postId);
  // 댓글 페이지네이션
  const [next_page, setNextPage] = useState(2);
  
  useEffect(() => {
    dispatch(commentActions.setCommentDB(postId, 1));
  }, []);

  // 댓글 더보기
  const moreComment = () => {
    dispatch(commentActions.setCommentDB(postId, next_page));
    setNextPage(next_page + 1);
  }
  

  if (!comment_check) {
    return (
      <></>
    );
  };
  return (
    <React.Fragment>
      <Grid width="100%" height="100%" >
        <Grid width="100%" height="20%" margin="16px 0 0 0">
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
      
      <Grid width="100%" height="40vh" >
        { all_comment.map((ct, index) => {
            return <CommentEdit key={ct.commentId} {...ct} />;
          })}
      
      {/* 댓글 더보기 버튼 */}
      <Grid width="100%" height="40vh">
      <MoreBtn onClick={() => moreComment()}><Text fontSize='14px' fontWeight='700' color='#A9AAAB'>댓글 더보기</Text></MoreBtn>
      </Grid>
      </Grid>
    </Grid>        
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

const CommentInput = styled.input`
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
