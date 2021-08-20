import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Text, Grid } from '../elements';
import { Sidebar, Body } from '../components';
import { Profile_small } from '../image';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions} from "../redux/modules/post";
import { GoPrimitiveDot } from 'react-icons/go';
import { BiLike, BiComment, BiPencil, BiTrashAlt } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsThreeDotsVertical, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { Button, Menu, MenuItem } from '@material-ui/core';

const CommonDetail = (props) => {
  const dispatch = useDispatch();
  // 해당 게시물
  const one_post = useSelector(state => state.post.one_post);
  const comment_list = useSelector(state => state.post.postComment_list);
  // const username = useSelector((state) => state.user.user.nickname);
  const username = sessionStorage.getItem('nickname');
  const postId = parseInt(props.match.params.id);
  // 게시물 수정, 삭제 버튼
  const [MenuLink, setMenuLink] = useState(null);

  // <댓글 기능>
  const is_login = useSelector((state) => state.user.is_login);
  const [edit_comment, setEditComment] = useState(null);
  const commentInput = useRef(null);
  const commentEdit = useRef(null);

  // 게시물 조회
  React.useEffect(() => {
    dispatch(postActions.setOnePostDB(postId));
    dispatch(postActions.setBookmarkDB(username));
    dispatch(postActions.setCommentDB(postId, 1));
  }, []);

  const handleClick = (e) => {
    setMenuLink(e.currentTarget);
  };

  const handleClose = () => {
    setMenuLink(null);
  };

  // 게시글 삭제
  const deleteCommon = () => {
    const deleted_post = {
      postId: postId,
    };
    dispatch(postActions.deletePostDB(deleted_post));
    history.push('/common/list');
  };
  
  // 북마크 리스트 조회
  const bookmark_list = useSelector(state => state.post.my_bookmark_list);
  // 해당 게시글 조회
  const post_bookmark = bookmark_list.find((post) => post.postId === parseInt(postId));
  // 해당 게시글 북마크 표시
  const markPost = () => {
    dispatch(postActions.addBookmarkDB(postId, username));
  }
  
  // 해당 게시글 북마크 해제
  const unmarkPost = (postBookmarkId) => {
      dispatch(postActions.deleteBookmarkDB(postId, postBookmarkId));
  }

  // 해당 게시글 좋아요 한 사람들 목록
  const my_like = useSelector(state => state.post.my_like_list);
 
  // 해당 게시글 좋아요 한 사람들 목록에 사용자 닉네임이 있으면, like_find에 추가.
  const like_find = my_like.find((like_post) => like_post.nickname === username);

  // 해당 게시글 좋아요 표시
  const likePost = () => {
    dispatch(postActions.likePostDB(username, postId));
  };
  
  // 해당 게시글 좋아요 해제
  const unlikePost = (postLikeId) => {
    dispatch(postActions.unlikePostDB(postId, postLikeId));
  };
  
  
  
  //댓글 추가하기
  const addComment = () => {
    const content_comment = commentInput.current.value;
    console.log(content_comment);
    const new_comment = {
      content: content_comment,
      nickname: username,
      postId: postId,
    };
    if (!is_login) {
      window.alert('로그인 후 이용해주세요!');
      return;
    };
    if (commentInput === '') {
      window.alert('댓글을 입력해주세요!');
      return;
    };

    dispatch(postActions.addCommentDB(new_comment));
    commentInput.current.value = '';
  };
  
    // 댓글 수정하기
    const editComment = (postCommentId) => {
      const content_comment = commentEdit.current.value;
      console.log(content_comment);
    const edit_comment = {
      postCommentId : postCommentId,
      content : content_comment,
    };
    dispatch(postActions.editCommentDB(edit_comment, postId));
    setEditComment(null);
    };

    // 댓글 삭제
    const deleteComment = (postCommentId) => {
      dispatch(postActions.deleteCommentDB(postCommentId, postId));
    }
  
  // 댓글 페이지네이션
  const [next_page, setNextPage] = useState(2);
  
  // 댓글 더보기
  const moreComment = () => {
    dispatch(postActions.setCommentDB(postId, next_page));
    setNextPage(next_page + 1);
  }

  if (!one_post && !comment_list) {
    return (
    <></>
    );
  };

  return (
    <React.Fragment>
      <Grid className='background' display='flex'>
        {/* 사이드바 */}
        <Sidebar />
        {/* 헤더, 푸터 포함한 바디 */}
        <Body header footer>
          <BodyInner>
            <div className='post-box' style={{padding: '0 10px 0 0'}}>
              {/* 게시글 */}
              <Post>
                {/* 게시글 카테고리 */}
                <Text fontSize='14px' color='#dadce0'>부트캠프 &gt; {one_post.category}</Text>
                <Grid display='flex' justifyContent='space-between' padding='12px 0 0'>
                  {/* 제목 */}
                  <Text fontSize='24px' color='#f1f3f4' fontWeight='700' lineHeight='36px' verticalAlign='middle'>{one_post.title}</Text>
                  <div style={{height: 'fit-content'}}>
                    {/* 북마크 버튼 */}
                    {/* 북마크 되어 있으면, 보라색 북마크 보이기 */}
                    {/* 북마크 되어 있지 않으면, 회색 빈 북마크 보이기 */}
                    {post_bookmark ? <Text color='#7879F1' fontSize='28px' lineHeight='28px' verticalAlign='middle' cursor='pointer' hover='opacity: 0.7' _onClick={()=> unmarkPost(post_bookmark.postBookmarkId)}><BsBookmarkFill /></Text>
                    : <Text color='#9aa0a6' fontSize='28px' lineHeight='28px' verticalAlign='middle' cursor='pointer' hover='opacity: 0.7' _onClick={() => markPost()}><BsBookmark /></Text> }
                    {/* 드롭다운 메뉴 버튼 */}
                    {/* 게시글 작성자와 접속자의 닉네임이 같을 때만 보이기 */}
                    {one_post.nickname === username ?
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
                        <MenuItem onClick={() => {
                              history.push(`/common/write/${postId}`);
                            }}>수정하기<Text margin='0 0 0 10px'><BiPencil /></Text></MenuItem>
                        {/* 삭제하기 */}
                        <MenuItem  onClick={() => {
                              handleClose();
                              deleteCommon();
                            }}>삭제하기<Text margin='0 0 0 10px'><BiTrashAlt /></Text></MenuItem>
                      </Menu>
                    </>
                    :
                    ''
                    }
                  </div>
                </Grid>
                {/* 작성일자 */}
                <InfoBox>
                <img src={Profile_small} alt='프로필' style={{width: '40px', height: '40px'}}/>
                  <InfoBoxInner>
                    <div style={{height: '18px', lineHeight: '18px'}}>
                    <Text fontSize='14px' color='#BDC1C6' margin='0'>{one_post.nickname}</Text>
                    </div>
                    <div style={{height: '16px', lineHeight: '16px'}}>
                    <Text fontSize='12px' color='#BDC1C6' margin='0'>{one_post.createdAt}</Text>
                    </div>
                  </InfoBoxInner>
                </InfoBox>
                {/* 내용 */}
                {/* 이미지가 있을 경우 내용 위에 보여주기 */}
                {one_post.image ? <ImageBox><Image src={`http://13.209.12.149${one_post.image}`}/></ImageBox> : ''}
                <Text p lineHeight='24px' fontSize='16px' color='#dadce0' margin={one_post.image ? '' : '32px 0 0'}>{one_post.content}</Text>
                <IconBox>
                  {/* 좋아요 버튼 */}
                  {/* 좋아요 한 상태이면 보라색, 아니면 하얀색으로 보여주기 */}
                  {like_find ? 
                  <span style={{backgroundColor: '#202124', padding: '8px 16px', borderRadius: '10px'}}>
                    <Text color='#7879F1' fontSize='14px' fontWeight='700' lineHeight='18px' cursor='pointer' _onClick={()=>unlikePost(like_find.postLikeId)}>
                      <span style={{fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px'}}>
                        <BiLike />
                      </span>
                      {/* 좋아요 개수 */}
                      {my_like.length}
                    </Text>
                  </span>
                  :
                  <span style={{backgroundColor: '#202124', padding: '8px 16px', borderRadius: '10px'}}>
                    <Text color='#BDC1C6' fontSize='14px' fontWeight='700' lineHeight='18px' cursor='pointer' _onClick={() => likePost()}>
                      <span style={{fontSize: '24px', margin: '0 8px 0 0', verticalAlign: 'middle', lineHeight: '30px'}}>
                        <BiLike />
                      </span>
                      {/* 좋아요 개수 */}
                      {my_like.length}
                    </Text>
                  </span>
                  }
                  {/* 댓글 수 */}
                  <Text color='#BDC1C6' fontSize='12px' margin='0 16px 0'><span style={{fontSize: '20px', margin: '0 6px 0 0', verticalAlign: 'middle'}}><BiComment /></span>{comment_list ? comment_list.length : 0}</Text>
                  {/* 조회수 */}
                  <Text color='#BDC1C6' fontSize='12px'><span style={{fontSize: '20px', margin: '0 6px 0 0', verticalAlign: 'middle'}}><AiOutlineEye /></span>{one_post.viewCount}</Text>
                </IconBox>
              </Post>
              {/* 댓글 입력란 */}
              <CommentInput>
                <Text p fontSize='14px' lineHeight='18px' color='#E8eaed' margin='16px 0'>댓글</Text>
                <InputWrap>
                  <Input placeholder='댓글을 남겨주세요' ref={commentInput} />
                  <CommentBtn onClick={() => addComment()}><Text fontSize='14px' fontWeight='700' color='#121212'>등록하기</Text></CommentBtn>
                </InputWrap>
              </CommentInput>
              {/* 댓글 리스트 */}
              {comment_list && comment_list.map((ct, idx) => {
                return (
                  <CommentBox key={idx}>
                    <Grid display='flex' justifyContent='space-between'>
                      <NameTime>
                        {/* 작성자 닉네임 */}
                        <Text fontSize='14px' lineHeight='18px' fontWeight='700' color='#F1F3F4' margin='0 16px 0 0'>{ct.nickname}</Text>
                        {/* 작성일자 */}
                        <Text fontSize='12px' lineHeight='16px' color='#BDC1C6'>{ct.createdAt}</Text>
                      </NameTime>
                      {/* 댓글 수정, 삭제 버튼 */}
                      {/* 댓글 작성자와 접속자의 닉네임이 같을 때만 보이기 */}
                      {ct.nickname === username ?
                      <Buttons>
                        {/* 수정 버튼 */}
                        {ct.postCommentId === edit_comment ?
                        <PostBtn style={{margin: '0 16px 0'}} onClick={() => editComment(ct.postCommentId)}><Text fontSize='16px' color='#9AA0A6'><BiPencil /></Text></PostBtn>
                        :
                        <PostBtn style={{margin: '0 16px 0'}} onClick={() => setEditComment(ct.postCommentId)}><Text fontSize='16px' color='#9AA0A6'><BiPencil /></Text></PostBtn>
                        }
                        {/* 삭제 버튼 */}
                        <PostBtn onClick={() => deleteComment(ct.postCommentId)}><Text fontSize='16px' color='#9AA0A6'><BiTrashAlt /></Text></PostBtn>
                      </Buttons>
                      :
                      ''
                      }
                    </Grid>
                    {/* 댓글 내용 */}
                    {/* 수정 버튼을 누른 경우, input 창으로 바뀜 */}
                    {ct.postCommentId === edit_comment ?
                    <Input edit_mode ref={commentEdit} defaultValue={ct.content}/>
                    :
                    <Text p lineHeight='24px' fontSize='16px' color='#F1F3F4' margin='0 0 16px'>{ct.content}</Text>
                    }
                    {/* <Like> */}
                      {/* 추천 수 */}
                      {/* <Text fontSize='16px' color='#BDC1C6' margin='0 16px 0 0'><BiLike /><span style={{fontSize: '12px', marginLeft: '6px'}}>17</span></Text> */}
                      {/* 대댓글 수 */}
                      {/* <Text fontSize='16px' color='#BDC1C6'><BiComment /><span style={{fontSize: '12px', marginLeft: '6px'}}>0</span></Text> */}
                    {/* </Like> */}
                  </CommentBox>
                )
              })}
              {/* 댓글 더보기 버튼 */}
              <MoreBtn onClick={() => moreComment()}><Text fontSize='14px' fontWeight='700' color='#A9AAAB'>댓글 더보기</Text></MoreBtn>
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
  @media screen and (min-width: 768px) and (max-width: 992px) { 
    grid-template-columns: 100%;
  }
`;

const Post = styled.div`
  border-bottom: 1px solid #5F6368;
  padding: 0 0 20px;
  @media screen and (min-width: 768px) and (max-width: 992px) { 
    width: 100%;
  }
`;

const InfoBox = styled.div`
display: flex;
width: auto;
height: 40px;
margin: 24px 0 0 0;
`;

const InfoBoxInner = styled.div`
margin: 0 0 0 8px;
height: 40px;
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
  margin: 50px 0 0;
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
  font-size: 14px;
  line-height: 18px;
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
  line-height: '18px';
  width: 17%;
  background-color: #7879F1;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;

const CommentBox = styled.div`
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
  /* height: fit-content; */
  background-color: #202124;
  padding: 24px;
  height: 403px;
  @media screen and (min-width: 768px) and (max-width: 992px) { 
    display: none;
  }
`;

export default CommonDetail;