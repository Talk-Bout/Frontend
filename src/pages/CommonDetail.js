import React, {useState} from 'react';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions} from "../redux/modules/post";

import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Comment from '../components/Comment';
import PopBootContents from '../components/PopBootContents';

import styled from 'styled-components';
import { Text, Grid } from '../elements/index';
import {
  BiLike,
  BiComment,
  BiPencil,
  BiTrashAlt,
} from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { Button, Menu, MenuItem } from '@material-ui/core';
import {
  BsThreeDotsVertical,
  BsBookmark,
  BsChevronLeft,
  BsBookmarkFill,
} from 'react-icons/bs';
import Profile from '../image/profile_small.png';

const CommonDetail = (props) => {
  const dispatch = useDispatch();
  // 해당 게시물
  const one_post = useSelector(state => state.post.one_post);
  console.log(one_post.postComment);
  console.log(one_post.postComment.length);
  const username = useSelector((state) => state.user.user.nickname);
  const postId = parseInt(props.match.params.id);
  // 게시물 수정, 삭제 버튼
  const [MenuLink, setMenuLink] = useState(null);

  // 게시물 조회
  React.useEffect(() => {
    if (!one_post) {
    }
    dispatch(postActions.setOnePostDB(postId));
    dispatch(postActions.setBookmarkDB(username));
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
  
  if (!one_post) {
    return (
    <></>
    );
  };

  return (
    <React.Fragment>
      <Grid
        className="background"
        overflow="auto"
        display="flex"
        backgroundColor="#17181B"
      >
        <Sidebar />
        <Body header>
          <Grid display="flex" width="100%" >
            <Grid width="70%" height="98vh" >
              {/* 게시물 */}
              <Grid width="100%" height="auto" >
                <Grid width="100%" height="27%">
                    <Grid width="100%" height="15%" >
                      <Text
                        fontSize="14px"
                        lineHeight="18px"
                        margin="0 4x 0 0"
                        color="#BDC1C6"
                      >
                        {' '}
                        부트톡톡 <BsChevronLeft />
                      </Text>
                      <Text
                        fontSize="14px"
                        lineHeight="18px"
                        margin="0 2px"
                        color="#BDC1C6"
                      >
                        {' '}
                        {one_post.category}{' '}
                      </Text>
                    </Grid>
                    <Grid
                      justify_content="space-between"
                      display="flex"
                      padding="2% 0"
                      width="100%"
                      height="45%"
                    >
                      <Grid width="40%" height="100%">
                        <Text
                          p
                          margin="0"
                          fontSize="24px"
                          lineHeight="35px"
                          color="#F1F3F4"
                          fontWeight="bold"
                        >
                          {one_post.title}
                        </Text>
                      </Grid>
                      {/* 북마크 버튼 */}
                    {/* 북마크 되어 있으면, 보라색 북마크 보이기 */}
                    {/* 북마크 되어 있지 않으면, 회색 빈 북마크 보이기 */}
                      <Grid display="flex" width="14%" height="100%" >
                        
                      {post_bookmark ? (
                        <>
                        <Button
                          padding="0"
                          width="16.33px"
                          height="21px"
                        >
                            <Text
                              padding="0"
                              color="#7879F1"
                              fontSize="24px"
                              lineHeight="35px"
                              vertical_align="middle"
                              cursor="pointer"
                              hover="opacity: 0.7"
                              _onClick={()=> unmarkPost(
                                post_bookmark.postBookmarkId
                              )}
                            >
                              <BsBookmarkFill />
                            </Text>
                            </Button>
                            </>
                          ) : (
                            <>
                            <Button
                          padding="0"
                          width="16.33px"
                          height="21px"
                         
                        >
                            <Text
                              padding="0"
                              color="#9aa0a6"
                              fontSize="24px"
                              lineHeight="35px"
                              vertical_align="middle"
                              cursor="pointer"
                              hover="opacity: 0.7"
                              _onClick={()=> markPost()}
                            >
                              <BsBookmark />
                            </Text>
                            </Button>
                            </>
                          )}
                       
                        {/* 드롭다운 메뉴 버튼 */}
                    {/* 게시글 작성자와 접속자의 닉네임이 같을 때만 보이기 */}
                        {one_post.nickname === username ?
                        <>
                        <Button
                          padding="0"
                          width="16.33px"
                          height="21px"
                          bg="transparent"
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <Text
                            padding="0"
                            color="#9AA0A6"
                            fontSize="24px"
                            lineHeight="35px"
                            hover="opacity: 0.8"
                          >
                            <BsThreeDotsVertical />
                          </Text>
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={MenuLink}
                          keepMounted
                          open={Boolean(MenuLink)}
                          onClose={handleClose}
                        >
                          <MenuItem
                            onClick={() => {
                              history.push(`/common/write/${postId}`);
                            }}
                          >
                            수정하기
                            <Text margin="0 0 0 10px">
                              <BiPencil />
                            </Text>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              deleteCommon();
                            }}
                          >
                            삭제하기
                            <Text margin="0 0 0 10px">
                              <BiTrashAlt />
                            </Text>
                          </MenuItem>
                        </Menu>
                        </>
                        :
                        ""
                        }
                        
                      </Grid>
                    </Grid>
                    <Grid display="flex" width="100%" height="40px">
                        <Grid width="4.5%" height="40px">
                          <img src={Profile} alt="프로필" />
                        </Grid>
                        <Grid width="30%" height="40px" >
                          <Text
                            p
                            margin="0 6px"
                            fontSize="12px"
                            lineHeight="16px"
                            color="#BDC1C6"
                            _onClick={()=>{history.push('/mypage/mypost')}}
                          >
                            {one_post.nickname}
                          </Text>

                          <Text
                            p
                            margin="0 6px"
                            fontSize="12px"
                            lineHeight="16px"
                            color="#BDC1C6"
                          >
                            {one_post.createdAt}
                          </Text>
                        </Grid>
                    </Grid>
                </Grid>
                {/* 게시물 본문 */}
                <Grid width="90%" height="58%" >
                  <Grid padding="0 1% 2% 1%">
                    {/* 이미지가 있을 경우 내용 위에 보여주기 */}
                {one_post.image ? <ImageBox><Image src={`http://13.209.12.149${one_post.image}`}/></ImageBox> : ''}
                <Text p fontSize="16px"
                      lineHeight="24px"
                      color="#DADCE0"
                      style={{ wordBreak: 'break-all' }}
                     margin={one_post.image ? '' : '32px 0 0'}>{one_post.content}</Text>
                  </Grid>
                </Grid>
                <Grid width="100%" height="100%">
                  {/* 좋아요 버튼 */}
                  {/* 좋아요 한 상태이면 보라색, 아니면 하얀색으로 보여주기 */}
                  {like_find ?
                  <span>
                  <UnlikeButton 
                  onClick={()=>unlikePost(like_find.postLikeId)}
                  >
                  
                    <BiLike/> {my_like.length}
                  </UnlikeButton>
                  </span>
                  :
                  <span>
                  <LikeButton
                  onClick={()=>likePost()}
                  >
                    <BiLike /> {my_like.length}
                  </LikeButton>
                  </span>
                  }
                  <Text
                    margin="0 0 0 2%"
                    color="#DADCE0"
                    width="10%"
                    height="100%"
                    fontSize="16px"
                    lineHeight="18px"
                  >
                    <BiComment /> {one_post.postComment.length}
                  </Text>
                  <Text
                    margin="0 0 0 3%"
                    color="#DADCE0"
                    width="10%"
                    height="100%"
                    fontSize="16px"
                    lineHeight="18px"
                  >
                    <AiOutlineEye /> {one_post.viewCount}
                  </Text>
                </Grid>
              </Grid>
              {/* import 댓글 작성과 리스트 */}
              <Grid width="97%" height="15vh" borderTop="1px solid #DADCE0" >
                <Comment postId={postId} />
              </Grid>
              {/* <Grid width="100%" height="40vh" backgroundColor="tomato"></Grid> */}
            </Grid>
            {/* import 인기 부트톡톡 */}
            <Grid width="30%" height="100%">
              <PopBootContents />
            </Grid>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const LikeButton = styled.button`
  width: 69px;
  height: 40px;
  font-size: 16px;
  line-height: 18px;
  background-color: transparent;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: #dadce0;
  &:hover {
    background-color: #282a2d;
    color: #7879f1;
  }
`;

const UnlikeButton = styled.button`
width: 69px;
  height: 40px;
  font-size: 16px;
  line-height: 18px;
  background-color: #282a2d;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: #7879f1;
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

export default CommonDetail;
