import React, {useState} from 'react';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions} from "../redux/modules/post";
import { actionCreators as commentActions} from "../redux/modules/comment";

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
  // 부트톡톡 게시물 리스트
  const common_list = useSelector((state) => state.post.list);
  // 해당 게시물
  const one_post = useSelector(state => state.post.one_post);
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
          <Grid display="flex" width="100%">
            <Grid width="70%" height="100vh">
              {/* 게시물 */}
              <Grid width="100%" height="45vh">
                <Grid width="100%" height="45%">
                  <Grid width="100%" height="100%">
                    <Grid padding="2% 0" width="100%" height="15%">
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
                        정보게시판{' '}
                      </Text>
                    </Grid>
                    <Grid
                      justify_content="space-between"
                      display="flex"
                      padding="2% 0"
                      width="100%"
                      height="45%"
                    >
                      <Grid width="20%" height="100%">
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
                      <Grid display="flex" width="14%" height="100%">
                        
                      {post_bookmark ? (
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
                    <Grid width="100%" height="50%">
                      <Grid display="flex" width="100%" height="100%">
                        <Grid width="4.5%" height="80%">
                          <img src={Profile} alt="프로필" />
                        </Grid>
                        <Grid width="30%" height="80%">
                          <Text
                            p
                            margin="0 6px"
                            fontSize="12px"
                            lineHeight="16px"
                            color="#BDC1C6"
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
                        <Grid width="63.5%" height="80%"></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* 게시물 본문 */}
                <Grid width="70%" height="41%">
                  <Grid padding="0 1% 2% 1%">
                    <Text
                      fontSize="16px"
                      lineHeight="24px"
                      color="#DADCE0"
                      style={{ wordBreak: 'break-all' }}
                    >
                      {one_post.content}
                    </Text>
                  </Grid>
                </Grid>
                <Grid width="100%" height="100%">
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
                    fontSize="14px"
                    lineHeight="18px"
                  >
                    <BiComment /> &nbsp; 15
                  </Text>
                  <Text
                    margin="0 0 0 3%"
                    color="#DADCE0"
                    width="10%"
                    height="100%"
                    fontSize="14px"
                    lineHeight="18px"
                  >
                    <AiOutlineEye /> {one_post.viewCount}
                  </Text>
                </Grid>
              </Grid>
              {/* import 댓글 작성과 리스트 */}
              <Grid width="97%" height="15vh" borderTop="1.5px solid #DADCE0">
                <Comment postId={postId} />
              </Grid>
              <Grid width="100%" height="40vh"></Grid>
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
  font-size: 14px;
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
  font-size: 14px;
  line-height: 18px;
  background-color: #282a2d;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: #7879f1;
`;


export default CommonDetail;
