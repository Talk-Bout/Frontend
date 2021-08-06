import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import {Grid, Text} from '../elements';
import { GoPrimitiveDot } from 'react-icons/go';
import { BiLike, BiComment, BiPencil, BiTrashAlt } from "react-icons/bi";
import { AiOutlineEye } from 'react-icons/ai';
import { BsThreeDotsVertical, BsBookmark } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import {actionCreators as commentActions} from '../redux/modules/comment';
import {history} from '../redux/ConfigureStore';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Button, Menu, MenuItem } from '@material-ui/core';

const BootPost = (props) => {
  const dispatch = useDispatch();
  const post_id = parseInt(window.location.pathname.split('/boot/post/')[1]);
  // const username = useSelector(state => state.user.user.nickname);
  const username = 'test';
  const post_list = useSelector(state => state.post.list);
  const post_found = post_list.find((post) => post.postId == post_id);
  const comment_list = useSelector(state => state.comment.list);
  const [MenuLink, setMenuLink] = useState(null);
  const [EditComment, setEditComment] = useState(null);

  const commentInput = useRef(null);
  const commentEdit = useRef(null);

  useEffect(() => {
    if (!post_found) {
      dispatch(postActions.setOnePostDB(post_id));
    }
    dispatch(commentActions.setCommentDB(post_id));
  }, []);

  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  }

  const handleClose = () => {
    setMenuLink(null);
  }

  const addComment = () => {
    const content = commentInput.current.value;
    const new_comment = {
      nickname: username,
      content: content,
      postId: post_id,
    }
    dispatch(commentActions.addCommentDB(new_comment));
    commentInput.current.value = '';
  }

  const editComment = (comment_id) => {
    const content = commentEdit.current.value;
    const edited_comment = {

    }
    dispatch(commentActions.editCommentDB(edited_comment, parseInt(comment_id), post_id))
  }

  const deleteComment = (comment_id) => {
    const nickname = username;
    dispatch(commentActions.deleteCommentDB(post_id, parseInt(comment_id), nickname));
  }

  const deletePost = () => {
    const deleted_post = {
      postId: post_id,
      nickname: username,
    };
    dispatch(postActions.deletePostDB(deleted_post));
    history.push('/boot/community');
  }

  if (!post_found) {
    return (
      <></>
    );
  };

  return (
    <React.Fragment>
      <Grid className='background' display='flex' overflow='auto' height='100vh'>
        <Sidebar />
        <Body header>
          <BodyInner>
            <div className='post-box' style={{padding: '0 10px 0 0'}}>
              {/* 게시글 */}
              <Post>
                <TitleBox>
                  <Grid>
                    <Text fontSize='1.7vh' color='#dadce0'>부트캠프 &gt; 커뮤니티 / 작성자:{post_found.nickname}</Text>
                  </Grid>
                  <Grid display='flex' justify_content='space-between' padding='10px 0 0'>
                    <Text fontSize='3vh' color='#f1f3f4' fontWeight='700'>{post_found.title}</Text>
                    <div style={{height: '5vh'}}>
                      <Text color='#9aa0a6' fontSize='3vh' vertical_align='middle' cursor='pointer' hover='opacity: 0.7'><BsBookmark /></Text>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Text color='#9AA0A6' fontSize='3vh' hover='opacity: 0.8'><BsThreeDotsVertical /></Text>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={MenuLink}
                        keepMounted
                        open={Boolean(MenuLink)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => history.push(`/boot/community/write/${post_id}`)}>수정하기<Text margin='0 0 0 10px'><BiPencil /></Text></MenuItem>
                        <MenuItem onClick={() => {handleClose(); deletePost()}}>삭제하기<Text margin='0 0 0 10px'><BiTrashAlt /></Text></MenuItem>
                      </Menu>
                    </div>
                  </Grid>
                  <Text fontSize='1.5vh' color='#7A7E82'>{post_found.createdAt}</Text>
                </TitleBox>
                <ContentBox>
                  <Text p fontSize='2vh' color='#dadce0'>{post_found.content}</Text>
                </ContentBox>
                <IconBox>
                  <span style={{backgroundColor: '#202124', padding: '10px', margin: '', borderRadius: '10px'}}><Text color='#BDC1C6' fontSize='2vh' fontWeight='700'><BiLike /> 17</Text></span>
                  <Text color='#BDC1C6' fontSize='1.7vh' margin='0 10px 0 20px'><BiComment /> 15</Text>
                  <Text color='#BDC1C6' fontSize='1.7vh' margin='0 10px 0'><AiOutlineEye /> 354</Text>
                </IconBox>
              </Post>
              {/* 댓글 입력란 */}
              <CommentInput>
                <Text p fontSize='1.7vh' color='#E1E1E1'>댓글 15</Text>
                <InputWrap>
                  <Input placeholder='댓글을 남겨주세요' ref={commentInput}></Input>
                  <CommentBtn onClick={() => addComment()}><Text fontSize='1.7vh' fontWeight='700' color='#121212'>등록하기</Text></CommentBtn>
                </InputWrap>
              </CommentInput>
              {/* 댓글 리스트 */}
              <CommentList>
                {comment_list && comment_list.map((n, idx) => {
                  <Comment key={idx}>
                    <Grid display='flex' justify_content='space-between'>
                      <NameTime><Text fontSize='1.7vh' fontWeight='700' color='#F1F3F4' margin='0 10px 0 0'>익명{idx + 1}</Text><Text fontSize='1.5vh' color='#BDC1C6'>{n.createdAt}</Text></NameTime>
                      <Buttons>
                        <PostBtn style={{margin: '0 20px 0'}} onClick={() => setEditComment(n.commentId)}><Text fontSize='2vh' color='#9AA0A6'><BiPencil /></Text></PostBtn>
                        <PostBtn onClick={() => deleteComment(n.commentId)}><Text fontSize='2vh' color='#9AA0A6'><BiTrashAlt /></Text></PostBtn>
                      </Buttons>
                    </Grid>
                    <Word><Text fontSize='1.7vh' color='#F1F3F4'>{n.content}</Text></Word>
                    <Like><Text fontSize='1.5vh' color='#BDC1C6' margin='0 10px 0 0'><BiLike /> 17</Text><Text fontSize='1.5vh' color='#BDC1C6'><BiComment /> 0</Text></Like>
                  </Comment>
                })}
                <MoreBtn><Text fontSize='1.6vh' fontWeight='700' color='#A9AAAB'>댓글 더보기(1/2)</Text></MoreBtn>
              </CommentList>
            </div>
            {/* 다른 게시글 목록 */}
            <OthersBox>
              <BoxInner>
                <Text p fontSize='2vh' fontWeight='700' color='#E8EAED'>커뮤니티 내 다른 게시글</Text>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, idx) => {
                  return (
                    <Text key={idx} p fontSize='1.7vh' color='#DADCE0' _onClick={() => history.push('/boot/post')} cursor='pointer' hover='opacity: 0.7'><GoPrimitiveDot style={{height: '1.2vh'}} />부트캠프 질문 드립니다!</Text>
                  )
                })}
              </BoxInner>
            </OthersBox>
          </BodyInner>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const BodyInner = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 69% 29%;
`;

const Post = styled.div`
  width: 99%;
  height: auto;
  border-bottom: 1px solid #5F6368;
  padding: 0 0 20px;
`;

const TitleBox = styled.div`
  width: 99%;
  height: auto;
`;

const PostBtn = styled.button`
  background-color: transparent;
  box-sizing: border-box;
  padding: 2px 0;
  cursor: pointer;
  border: none;
  &:active {
    opacity: 0.7;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: auto;
`;

const IconBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 5%;
`;

const CommentInput = styled.div`
  width: 99%;
  border-bottom: 1px solid #5F6368;
  padding-bottom: 40px;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  background-color: #17181B;
  border: 1.9px solid #9AA0A6;
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;
  font-size: 1.7vh;
  caret-color: #5F6368;
  color: #e1e1e1;
  &::placeholder {
    color: #5F6368 ;
  }
  &:focus {
    outline: none;
  }
`;

const CommentBtn = styled.button`
  width: 15%;
  background-color: #7879F1;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const CommentList = styled.div`
  width: 99%;
  height: auto;  
`;

const Comment = styled.div`
  width: 97%;
  border-bottom: 1px solid #5F6368;
  padding: 15px 10px 15px 20px;
`;

const NameTime = styled.div`
  width: auto;
  padding-bottom: 10px;
`;

const Buttons = styled.div`
  width: auto;
`;

const Word = styled.div`
  width: 100%;
`;

const Like = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const MoreBtn = styled.button`
  width: 100%;
  padding: 2.5% 0;
  background-color: #282A2D;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const OthersBox = styled.div``;

const BoxInner = styled.div`
  width: 100%;
  height: auto;
  background-color: #202124;
  padding: 20px;
`;



export default BootPost;