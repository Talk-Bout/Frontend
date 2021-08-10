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
import {actionCreators as campActions} from '../redux/modules/bootcamp';
import {actionCreators as commentActions} from '../redux/modules/comment';
import {history} from '../redux/ConfigureStore';
import { Button, Menu, MenuItem } from '@material-ui/core';

const BootPost = (props) => {
  const dispatch = useDispatch();
  const camp_name = window.location.pathname.split('/')[2];
  const commu_id = parseInt(window.location.pathname.split(`/${camp_name}/post/`)[1]);
  const username = useSelector(state => state.user.user);
  const commu_list = useSelector(state => state.bootcamp.commu_list);
  const commu_found = commu_list.find((commu) => commu.communityId === commu_id);
  const comment_list = useSelector(state => state.bootcamp.comment_list);

  const [MenuLink, setMenuLink] = useState(null);
  // const [EditComment, setEditComment] = useState(null);

  const commentInput = useRef(null);
  // const commentEdit = useRef(null);

  useEffect(() => {
    if (!commu_found) {
      dispatch(campActions.setOneCommuDB(camp_name, commu_id));
    }
    // dispatch(commentActions.setCommentDB(commu_id));
  }, []);

  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  }

  const handleClose = () => {
    setMenuLink(null);
  }

  // const addComment = () => {
  //   const content = commentInput.current.value;
  //   const new_comment = {
  //     nickname: username,
  //     content: content,
  //     postId: post_id,
  //   }
  //   dispatch(commentActions.addCommentDB(new_comment));
  //   commentInput.current.value = '';
  // }

  // const editComment = (comment_id) => {
  //   const content = commentEdit.current.value;
  //   const edited_comment = {

  //   }
  //   dispatch(commentActions.editCommentDB(edited_comment, parseInt(comment_id), post_id))
  // }

  // const deleteComment = (comment_id) => {
  //   const nickname = username;
  //   dispatch(commentActions.deleteCommentDB(post_id, parseInt(comment_id), nickname));
  // }

  const deleteCommu = () => {
    const deleted_commu = {
      bootcampName: camp_name,
      communityId: commu_id,
    };
    dispatch(campActions.deleteCommuDB(deleted_commu));
  }

  if (!commu_found) {
    return (
      <></>
    );
  };

  return (
    <React.Fragment>
      <Grid className='background' display='flex'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더 포함한 바디 */}
        <Body header>
          <BodyInner>
            <div className='post-box' style={{padding: '0 10px 0 0'}}>
              {/* 게시글 */}
              <Post>
                {/* 게시글 카테고리 */}
                <Text fontSize='14px' color='#dadce0'>부트캠프 &gt; 커뮤니티 / 작성자:{commu_found.nickname}</Text>
                <Grid display='flex' justify_content='space-between' padding='12px 0 0'>
                  {/* 제목 */}
                  <Text fontSize='24px' color='#f1f3f4' fontWeight='700' lineHeight='28px' vertical_align='middle'>{commu_found.title}</Text>
                  <div style={{height: 'fit-content'}}>
                    {/* 북마크 버튼 */}
                    <Text color='#9aa0a6' fontSize='28px' lineHeight='28px' vertical_align='middle' cursor='pointer' hover='opacity: 0.7'><BsBookmark /></Text>
                    {/* 드롭다운 메뉴 버튼 */}
                    {/* 게시글 작성자와 접속자의 닉네임이 같을 때만 활성화 */}
                    {commu_found.nickname === username ?
                    <>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Text color='#9AA0A6' fontSize='28px' lineHeight='28px' hover='opacity: 0.8'><BsThreeDotsVertical /></Text>
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={MenuLink}
                        keepMounted
                        open={Boolean(MenuLink)}
                        onClose={handleClose}
                      >
                        {/* 수정하기 */}
                        <MenuItem onClick={() => history.push(history.push({
                          pathname: `/boot/${camp_name}/community/write/${commu_found.communityId}`,
                          }))}>수정하기<Text margin='0 0 0 10px'><BiPencil /></Text></MenuItem>
                        {/* 삭제하기 */}
                        <MenuItem onClick={() => {deleteCommu(); handleClose()}}>삭제하기<Text margin='0 0 0 10px'><BiTrashAlt /></Text></MenuItem>
                      </Menu>
                    </>
                    :
                    ''
                    }
                  </div>
                </Grid>
                {/* 작성일자 */}
                <Text p fontSize='12px' color='#BDC1C6' margin='5px 0 0'>{commu_found.createdAt}</Text>
                {/* 내용 */}
                <Text p fontSize='16px' color='#dadce0' margin='32px 0 0'>{commu_found.content}</Text>
                <IconBox>
                  {/* 추천 버튼 */}
                  <span style={{backgroundColor: '#202124', padding: '8px 16px', borderRadius: '10px'}}><Text color='#BDC1C6' fontSize='14px' fontWeight='700' lineHeight='18px'><span style={{fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px'}}><BiLike /></span>{commu_found.communityLike ? commu_found.communityLike.length : 0}</Text></span>
                  {/* 댓글 수 */}
                  <Text color='#BDC1C6' fontSize='12px' margin='0 16px 0'><span style={{fontSize: '20px', margin: '0 6px 0 0', verticalAlign: 'middle'}}><BiComment /></span>{commu_found.communityComment ? commu_found.communityComment.length : 0}</Text>
                  {/* 조회수 */}
                  <Text color='#BDC1C6' fontSize='12px'><span style={{fontSize: '20px', margin: '0 6px 0 0', verticalAlign: 'middle'}}><AiOutlineEye /></span>{commu_found.viewCount}</Text>
                </IconBox>
              </Post>
              {/* 댓글 입력란 */}
              <CommentInput>
                <Text p fontSize='14px' color='#E8eaed' margin='16px 0'>댓글</Text>
                <InputWrap>
                  <Input placeholder='댓글을 남겨주세요' ref={commentInput} />
                  <CommentBtn onClick={() => {}}><Text fontSize='14px' fontWeight='700' color='#121212'>등록하기</Text></CommentBtn>
                </InputWrap>
              </CommentInput>
              {/* 댓글 리스트 */}
              {comment_list && comment_list.map((cm, idx) => {
                return (
                  <Comment>
                    <Grid display='flex' justify_content='space-between'>
                      <NameTime>
                        {/* 작성자 닉네임 */}
                        <Text fontSize='14px' fontWeight='700' color='#F1F3F4' margin='0 10px 0 0'>{cm.nickname}</Text>
                        {/* 작성일자 */}
                        <Text fontSize='12px' color='#BDC1C6'>{cm.createdAt}</Text>
                      </NameTime>
                      <Buttons>
                        {/* 수정 버튼 */}
                        <PostBtn style={{margin: '0 16px 0'}} onClick={() => {}}><Text fontSize='16px' color='#9AA0A6'><BiPencil /></Text></PostBtn>
                        {/* 삭제 버튼 */}
                        <PostBtn onClick={() => {}}><Text fontSize='16px' color='#9AA0A6'><BiTrashAlt /></Text></PostBtn>
                      </Buttons>
                    </Grid>
                    {/* 댓글 내용 */}
                    <Text p fontSize='16px' color='#F1F3F4' margin='0 0 16px'>{cm.content}</Text>
                    <Like>
                      {/* 추천 수 */}
                      <Text fontSize='16px' color='#BDC1C6' margin='0 16px 0 0'><BiLike /><span style={{fontSize: '12px', marginLeft: '6px'}}>17</span></Text>
                      {/* 대댓글 수 */}
                      <Text fontSize='16px' color='#BDC1C6'><BiComment /><span style={{fontSize: '12px', marginLeft: '6px'}}>0</span></Text>
                    </Like>
                  </Comment>
                )
              })}
              {/* 댓글 더보기 버튼 */}
              {comment_list.length > 5 ? <MoreBtn><Text fontSize='14px' fontWeight='700' color='#A9AAAB'>댓글 더보기(1/2)</Text></MoreBtn> : ''}
            </div>
            {/* 다른 게시글 목록 */}
            <OthersBox>
              <Text fontSize='18px' fontWeight='700' color='#E8EAED'>커뮤니티 내 다른 게시글</Text>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, idx) => {
                return (
                  <Text key={idx} p fontSize='16px' margin='8px 0 0' color='#DADCE0' _onClick={() => history.push('/boot/community/post')} cursor='pointer' hover='opacity: 0.7'><GoPrimitiveDot style={{height: '10px'}} />부트캠프 질문 드립니다!</Text>
                )
              })}
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
  grid-template-columns: 65% 34%;
`;

const Post = styled.div`
  border-bottom: 1px solid #5F6368;
  padding: 0 0 20px;
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

const IconBox = styled.div`
  margin: 56px 0 0;
`;

const CommentInput = styled.div`
  border-bottom: 1px solid #5F6368;
  padding-bottom: 34px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  height: 48px;
  background-color: #17181B;
  border: 1px solid #9AA0A6;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 15px 20px;
  margin-right: 8px;
  font-size: 14px;
  caret-color: #5F6368;
  color: #e1e1e1;
  &::placeholder {
    color: #5F6368;
  }
  &:focus {
    outline: none;
  }
`;

const CommentBtn = styled.button`
  width: 17%;
  background-color: #7879F1;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const Comment = styled.div`
  border-bottom: 1px solid #5F6368;
  padding: 16px 24px;
`;

const NameTime = styled.div`
  width: auto;
  padding-bottom: 8px;
`;

const Buttons = styled.div`
  width: auto;
`;

const Like = styled.div`
  line-height: 20px;
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

const OthersBox = styled.div`
  height: fit-content;
  background-color: #202124;
  padding: 24px;
`;

export default BootPost;