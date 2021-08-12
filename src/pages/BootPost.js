import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import {Grid, Text} from '../elements';
import { GoPrimitiveDot } from 'react-icons/go';
import { BiLike, BiComment, BiPencil, BiTrashAlt } from "react-icons/bi";
import { AiOutlineEye } from 'react-icons/ai';
import { BsThreeDotsVertical, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as campActions} from '../redux/modules/bootcamp';
import {history} from '../redux/ConfigureStore';
import { Button, Menu, MenuItem } from '@material-ui/core';

const BootPost = (props) => {
  const dispatch = useDispatch();
  const camp_name = window.location.pathname.split('/')[2];
  const commu_id = parseInt(window.location.pathname.split(`/${camp_name}/post/`)[1]);
  // 현재 접속 중인 사용자 닉네임
  const username = useSelector(state => state.user.user);
  // 사용자가 북마크한 커뮤니티글 목록
  const my_commu_list = useSelector(state => state.bootcamp.my_commu_list);
  // 북마크한 커뮤니티글 목록에 이 글이 있으면, this_commu에 넣는다.
  const this_commu = my_commu_list.find((commu) => commu.communityId === commu_id);
  
  // 이 커뮤니티글
  const commu_found = useSelector(state => state.bootcamp.one_commu);
  // 이 커뮤니티글 좋아요 한 사람들 목록
  const commu_likes = useSelector(state => state.bootcamp.commu_like_list);
  // 이 커뮤니티글 좋아요 한 사람들 목록에 사용자 닉네임이 있으면, like_found에 넣는다.
  const like_found = commu_likes.find((like) => like.nickname === username);

  const comment_list = useSelector(state => state.bootcamp.comment_list);
  const [comment_page, setCommentPage] = useState(1);
  const [MenuLink, setMenuLink] = useState(null);
  const [edit_comment, setEditComment] = useState(null);

  const commentInput = useRef(null);
  const commentEdit = useRef(null);

  useEffect(() => {
    dispatch(campActions.setOneCommuDB(camp_name, commu_id));
    dispatch(campActions.setCommentsDB(commu_id, comment_page));
    dispatch(campActions.setMyCommuDB());
  }, []);

  // 게시글 북마크 표시
  const markCommu = () => {
    dispatch(campActions.addMyCommuDB(username, commu_id));
  }

  // 게시글 북마크 해제
  const unmarkCommu = (bookmark_id) => {
    dispatch(campActions.deleteMyCommuDB(commu_id, bookmark_id));
  }

  // 드롭다운 메뉴(수정하기, 삭제하기)
  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  }
  const handleClose = () => {
    setMenuLink(null);
  }

  // 게시글 삭제하기
  const deleteCommu = () => {
    const deleted_commu = {
      bootcampName: camp_name,
      communityId: commu_id,
    };
    dispatch(campActions.deleteCommuDB(deleted_commu));
  }

  // 좋아요 표시하기
  const likeCommu = () => {
    dispatch(campActions.likeCommuDB(commu_id, username));
  }

  // 좋아요 해제하기
  const unlikeCommu = (communityLikeId) => {
    dispatch(campActions.unlikeCommuDB(commu_id, communityLikeId));
  }

  // 댓글 추가하기
  const addComment = () => {
    const content = commentInput.current.value;
    const new_comment = {
      nickname: username,
      content: content,
      communityId: commu_id,
    }
    dispatch(campActions.addCommentDB(new_comment));
    commentInput.current.value = '';
  }

  // 댓글 수정하기
  const editComment = (comment_id) => {
    const content = commentEdit.current.value;
    const edited_comment = {
      communityId: commu_id,
      communityCommentId: comment_id,
      content: content,
    }
    dispatch(campActions.editCommentDB(edited_comment));
    setEditComment(null);
  }

  // 댓글 삭제하기
  const deleteComment = (comment_id) => {
    const deleted_comment = {
      communityId: commu_id,
      communityCommentId: comment_id,
    }
    dispatch(campActions.deleteCommentDB(deleted_comment));
  }

  // 댓글 더보기
  const moreComment = () => {
    setCommentPage(comment_page + 1);
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
                    {/* 북마크 되어 있으면, 보라색 북마크 보이기 */}
                    {/* 북마크 되어 있지 않으면, 회색 빈 북마크 보이기 */}
                    {this_commu ? <Text color='#7879F1' fontSize='28px' lineHeight='28px' vertical_align='middle' cursor='pointer' hover='opacity: 0.7' _onClick={() => unmarkCommu(this_commu.communityBookmarkId)}><BsBookmarkFill /></Text>
                    : <Text color='#9aa0a6' fontSize='28px' lineHeight='28px' vertical_align='middle' cursor='pointer' hover='opacity: 0.7' _onClick={() => markCommu()}><BsBookmark /></Text> }
                    {/* 드롭다운 메뉴 버튼 */}
                    {/* 게시글 작성자와 접속자의 닉네임이 같을 때만 보이기 */}
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
                {/* 이미지가 있을 경우 내용 위에 보여주기 */}
                {commu_found.image ? <ImageBox><Image src={`http://13.209.12.149${commu_found.image}`}/></ImageBox> : ''}
                <Text p fontSize='16px' color='#dadce0' margin={commu_found.image ? '' : '32px 0 0'}>{commu_found.content}</Text>
                <IconBox>
                  {/* 좋아요 버튼 */}
                  {/* 좋아요 한 상태이면 보라색, 아니면 하얀색으로 보여주기 */}
                  {like_found ? 
                  <span style={{backgroundColor: '#202124', padding: '8px 16px', borderRadius: '10px'}}>
                    <Text color='#7879F1' fontSize='14px' fontWeight='700' lineHeight='18px' cursor='pointer' _onClick={() => unlikeCommu(like_found.communityLikeId)}>
                      <span style={{fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px'}}>
                        <BiLike />
                      </span>
                      {/* 좋아요 개수 */}
                      {commu_likes.length}
                    </Text>
                  </span>
                  :
                  <span style={{backgroundColor: '#202124', padding: '8px 16px', borderRadius: '10px'}}>
                    <Text color='#BDC1C6' fontSize='14px' fontWeight='700' lineHeight='18px' cursor='pointer' _onClick={() => likeCommu()}>
                      <span style={{fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px'}}>
                        <BiLike />
                      </span>
                      {/* 좋아요 개수 */}
                      {commu_likes.length}
                    </Text>
                  </span>
                  }
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
                  <CommentBtn onClick={() => addComment()}><Text fontSize='14px' fontWeight='700' color='#121212'>등록하기</Text></CommentBtn>
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
                      {/* 댓글 수정, 삭제 버튼 */}
                      {/* 댓글 작성자와 접속자의 닉네임이 같을 때만 보이기 */}
                      {cm.nickname === username ?
                      <Buttons>
                        {/* 수정 버튼 */}
                        {cm.communityCommentId === edit_comment ?
                        <PostBtn style={{margin: '0 16px 0'}} onClick={() => editComment(cm.communityCommentId)}><Text fontSize='16px' color='#9AA0A6'><BiPencil /></Text></PostBtn>
                        :
                        <PostBtn style={{margin: '0 16px 0'}} onClick={() => setEditComment(cm.communityCommentId)}><Text fontSize='16px' color='#9AA0A6'><BiPencil /></Text></PostBtn>
                        }
                        {/* 삭제 버튼 */}
                        <PostBtn onClick={() => deleteComment(cm.communityCommentId)}><Text fontSize='16px' color='#9AA0A6'><BiTrashAlt /></Text></PostBtn>
                      </Buttons>
                      :
                      ''
                      }
                    </Grid>
                    {/* 댓글 내용 */}
                    {/* 수정 버튼을 누른 경우, input 창으로 바뀜 */}
                    {cm.communityCommentId === edit_comment ?
                    <Input edit_mode ref={commentEdit} defaultValue={cm.content}/>
                    :
                    <Text p fontSize='16px' color='#F1F3F4' margin='0 0 16px'>{cm.content}</Text>
                    }
                    {/* <Like> */}
                      {/* 추천 수 */}
                      {/* <Text fontSize='16px' color='#BDC1C6' margin='0 16px 0 0'><BiLike /><span style={{fontSize: '12px', marginLeft: '6px'}}>17</span></Text> */}
                      {/* 대댓글 수 */}
                      {/* <Text fontSize='16px' color='#BDC1C6'><BiComment /><span style={{fontSize: '12px', marginLeft: '6px'}}>0</span></Text> */}
                    {/* </Like> */}
                  </Comment>
                )
              })}
              {/* 댓글 더보기 버튼 */}
              {commu_found.communityComment.length <= 5 ?
              <MoreBtn disabled><Text fontSize='14px' fontWeight='700' color='#A9AAAB' onClick={() => moreComment()}>댓글 더보기(1/2)</Text></MoreBtn>
              :
              <MoreBtn><Text fontSize='14px' fontWeight='700' color='#A9AAAB' onClick={() => moreComment()}>댓글 더보기(1/2)</Text></MoreBtn>}
            </div>
            {/* 다른 게시글 목록 */}
            <OthersBox>
              <Text fontSize='18px' fontWeight='700' color='#E8EAED'>커뮤니티 내 다른 게시글</Text>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, idx) => {
                return (
                  <Text key={idx} p fontSize='16px' margin='8px 0 0' color='#DADCE0' _onClick={() => history.push('/boot/community/post')} cursor='pointer' hover='opacity: 0.7' overflow='hidden' display='-webkit-box' wlc='1' wbo='vertical'><GoPrimitiveDot style={{height: '10px'}} />부트캠프 질문 드립니다!</Text>
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

const ImageBox = styled.div`
  width: 70%;
  border: none;
  box-sizing: border-box;
  text-align: center;
  object-fit: cover;
  overflow: hidden;
  margin: 32px auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
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
  height: ${(props) => props.edit_mode ? '20px' : '48px'};
  background-color: #17181B;
  border: 1px solid #9AA0A6;
  box-sizing: border-box;
  border-radius: 8px;
  padding: ${(props) => props.edit_mode ? '15px 10px' : '15px 20px'};
  margin: ${(props) => props.edit_mode ? '0 0 10px' : '0 8px 0 0'};
  font-size: 16px;
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
  padding: 16px 24px 10px;
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