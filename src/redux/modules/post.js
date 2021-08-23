import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/request';
import { actionCreators as statusActions } from './status';

// 액션타입
const SET_POST = 'post/SET_POST'; // 게시글 전체 불러오기
const SET_POST_POP = 'post/SET_POST_POP' // 게시글 전체 불러오기(인기순)
const SET_ONE_POST = 'post/SET_ONE_POST'; // 게시글 하나 불러오기
const ADD_POST = 'post/ADD_POST'; // 게시글 추가하기
const EDIT_POST = 'post/EDIT_POST'; // 게시글 수정하기
const DELETE_POST = 'post/DELETE_POST'; // 게시글 삭제하기

const SET_BOOKMARK = 'post/SET_BOOKMARK' // 북마크 불러오기
const ADD_BOOKMARK = 'post/ADD_BOOKMARK'; // 북마크 추가하기
const DELETE_BOOKMARK = 'post/DELETE_BOOKMARK'; // 북마크 삭제하기

const LIKE_POST = 'post/LIKE_POST' // 좋아요 표시하기
const UNLIKE_POST = 'post/UNLIKE_POST' // 좋아요 해제하기

const SET_COMMENT = 'post/SET_COMMENT';         // 댓글 불러오기
const SET_NEXT_COMMENT = 'post/SET_NEXT_COMMENT';    // 댓글 더보기
const ADD_COMMENT = 'post/ADD_COMMENT';         // 댓글 추가하기
const EDIT_COMMENT = 'post/EDIT_COMMENT';       // 댓글 수정하기
const DELETE_COMMENT = 'post/DELETE_COMMENT';   // 댓글 삭제하기

// 액션생성함수
// 게시물
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setPostPop = createAction(SET_POST_POP, (post_list) => ({ post_list }));
const setOnePost = createAction(SET_ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));
// 북마크
const setBookmark = createAction(SET_BOOKMARK, (bookmark_list) => ({ bookmark_list }));
const addBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({ bookmark }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (bookmarkId) => ({ bookmarkId }));
// 좋아요
const likePost = createAction(LIKE_POST, (like_post) => ({ like_post }));
const unlikePost = createAction(UNLIKE_POST, (unlike_post) => ({ unlike_post }));

// 액션생성함수
const setComment = createAction(SET_COMMENT, (postComment_list) => ({ postComment_list }));
const setNextComment = createAction(SET_NEXT_COMMENT, (postComment_list) => ({ postComment_list }));
const addComment = createAction(ADD_COMMENT, (postComment) => ({ postComment }));
const editComment = createAction(EDIT_COMMENT, (postComment) => ({ postComment }));
const deleteComment = createAction(DELETE_COMMENT, (postCommentId) => ({ postCommentId }));

// 기본값 정하기
const initialState = {
  list: [],
  pop_list: [],
  one_post: [],
  my_bookmark_list: [],
  my_like_list: [],
  postComment_list: [],
};

// 액션함수
const setPostDB = (page, category) => {
  // 전체 게시글 불러오는 함수
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/posts?page=${page}&category=${category}`)
      .then((response) => {
        dispatch(setPost(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(`부트톡톡 전체 게시글 불러오기 에러 발생: ${err}`);
      });
  };
};

const setPostPopDB = (page) => {
  // 전체 게시글 인기순 불러오는 함수
  return function (dispatch) {
    instance.get(`/popular/posts?page=${page}`).then((response) => {
      dispatch(setPostPop(response.data));
    }).catch((err) => {
      console.error(`부트톡톡 인기순 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const setOnePostDB = (postId) => {
  // 개별 게시글 불러오는 함수
  return function (dispatch) {
    instance.get(`/posts/${postId}`)
      .then((response) => {
        // console.log(response.data);
        dispatch(setOnePost(response.data));
      })
      .catch((err) => {
        console.error(`부트톡톡 개별 게시글 불러오기 에러 발생: ${err}`);
      });
  };
};

const addPostDB = (new_post) => {
  // 게시글 추가하는 함수
  return function (dispatch) {
    const title = new_post.title;
    const content = new_post.content;
    const nickname = new_post.nickname;
    const category = new_post.category;
    const image = new_post.image;
    instance
      .post('/posts', {
        title: title,
        content: content,
        nickname: nickname,
        category: category,
        image: image,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addPost(response.data));
      })
      .catch((err) => {
        console.error(`부트톡톡 게시글 추가하기 에러 발생: ${err}`);
      });
  };
};

const editPostDB = (edited_post) => {
  // 게시글 수정하는 함수
  return function (dispatch) {
    const title = edited_post.title;
    const content = edited_post.content;
    const postId = parseInt(edited_post.postId);
    const category = edited_post.category;
    const nickname = edited_post.nickname;
    const image = edited_post.image;
    // console.log(edited_post);
    instance
      .patch(`/posts/${postId}`, {
        title: title,
        content: content,
        postId: postId,
        category: category,
        nickname: nickname,
        image: image,
      })
      .then((response) => {
        const data = {
          title: title,
          content: content,
          postId: postId,
          category: category,
          nickname: nickname,
          image: image,
        }
        // console.log(response.data);
        dispatch(editPost(data));
      })
      .catch((err) => {
        console.error(`부트톡톡 게시글 수정하기 에러 발생: ${err}`);
      });
  };
};

const deletePostDB = (deleted_post) => {
  // 게시글 삭제하는 함수
  return function (dispatch) {
    const postId = parseInt(deleted_post.postId);
    instance
      .delete(`/posts/${postId}`)
      .then((response) => {
        // console.log(response.data);
        dispatch(deletePost(postId));
      })
      .catch((err) => {
        console.error(`부트톡톡 게시글 삭제하기 에러 발생: ${err}`);
      });
  };
};

const setBookmarkDB = (nickname) => {
  // 부트톡톡 북마크 불러오기
  return function (dispatch) {
    instance.get(`/users/${nickname}/postBookmarks`).then((response) => {
      dispatch(setBookmark(response.data));
      // console.log(response.data);
    }).catch((err) => {
      console.error(`부트톡톡 북마크 목록 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const addBookmarkDB = (postId, nickname) => {
  // 부트톡톡 북마크 추가하기
  return function (dispatch) {
    instance.post(`/posts/${postId}/postBookmarks`, {
      postId: parseInt(postId),
      nickname: nickname,
    })
      .then((response) => {
        // console.log(response.data);
        dispatch(addBookmark(response.data));
      })
      .catch((err) => {
        console.error(`부트톡톡 북마크 추가하기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};

const deleteBookmarkDB = (postId, postBookmarkId) => {
  // 부트톡톡 북마크 삭제하기
  return function (dispatch) {
    instance.delete(`/posts/${postId}/postBookmarks/${postBookmarkId}`)
      .then((response) => {
        dispatch(deleteBookmark(response.data));
      })
      .catch((err) => {
        console.error(`부트톡톡 북마크 삭제하기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};

const likePostDB = (nickname, postId) => {
  // 부트톡톡 좋아요 표시하기
  return function (dispatch) {
    instance.post(`/posts/${postId}/postLikes`, {
      nickname: nickname,
      postId: postId,
    }).then((response) => {
      dispatch(likePost(response.data));
    }).catch((err) => {
      console.error(`부트톡톡 좋아요 표시하기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const unlikePostDB = (postId, postLikeId) => {
  // 부트톡톡 좋아요 해제하기
  return function (dispatch) {
    instance.delete(`/posts/${postId}/postLikes/${postLikeId}`)
      .then((response) => {
        dispatch(unlikePost(postId, postLikeId));
      }).catch((err) => {
        console.error(`부트톡톡 좋아요 해제하기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};

const setCommentDB = (postId, page) => {
  // 댓글 불러오는 함수
  return function (dispatch) {
    instance.get(`/posts/${postId}/postComments?page=${page}`, {
    })
      .then((response) => {
        if (page !== 1) {
          if (response.data.length !== 0) {
            dispatch(setNextComment(response.data));
          } else {
            window.alert('마지막 댓글입니다.');
            return;
          }
        } else {
          dispatch(setComment(response.data));
        }
        // console.log(setComment(response.data));
      })
      .catch((err) => {
        console.error(`부트톡톡 댓글 불러오기 에러 발생: ${err}`);
      });
  };
};

const addCommentDB = (new_comment) => {           // 댓글 추가하는 함수
  return function (dispatch, { history }) {
    const nickname = new_comment.nickname;
    const content = new_comment.content;
    const postId = parseInt(new_comment.postId);
    instance.post(`/posts/${postId}/postComments`,
      {
        nickname: nickname,
        content: content,
        postId: postId,
      }).then((response) => {
        dispatch(addComment(response.data));
        // console.log(response.data);
      }).catch((err) => {
        console.error(`부트톡톡 댓글 추가하기 에러 발생: ${err}`);
      });
  };
};

const editCommentDB = (edit_comment, postId) => {           // 댓글 수정하는 함수
  return function (dispatch, getState, { history }) {
    const postCommentId = edit_comment.postCommentId;
    const content = edit_comment.content;
    instance.patch(`/posts/${postId}/postComments/${postCommentId}`,
      {
        content: content,
      }).then((response) => {
        // console.log(response.data);
        dispatch(editComment(response.data));
      }).catch((err) => {
        console.error(`부트톡톡 댓글 수정하기 에러 발생: ${err}`);
      });
  };
};


const deleteCommentDB = (postCommentId, postId) => {       // 댓글 삭제하는 함수
  return function (dispatch) {
    instance.delete(`/posts/${postId}/postComments/${postCommentId}`
    )
      .then((response) => {
        // console.log(response.data);
        dispatch(deleteComment(postCommentId));
      }).catch((err) => {
        console.error(`부트톡톡 댓글 삭제하기 에러 발생: ${err}`);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [SET_POST_POP]: (state, action) => produce(state, (draft) => {
      draft.pop_list = action.payload.post_list;
    }),
    [SET_ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.one_post = action.payload.post;
        draft.my_like_list = action.payload.post.postLike;

      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        const deleted_list = draft.list.filter((post) => {
          if (post.postId !== action.payload.post) {
            return post;
          }
        })
        draft.list = deleted_list;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [action.payload.post];
      }),
    [SET_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.my_bookmark_list = action.payload.bookmark_list;
    }),
    [ADD_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.my_bookmark_list.unshift(action.payload.bookmark);
    }),
    [DELETE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.my_bookmark_list.findIndex((bookmark) => bookmark.postBookmarkId === action.payload.postBookmarkId);
        draft.my_bookmark_list.splice(idx, 1);
      }),
    [LIKE_POST]: (state, action) => produce(state, (draft) => {
      draft.my_like_list.push(action.payload.like_post);
    }),

    [UNLIKE_POST]: (state, action) => produce(state, (draft) => {
      let like_idx = draft.my_like_list.findIndex((like) => like.postLikeId === action.payload.unlike_post);
      draft.my_like_list.splice(like_idx, 1);
    }),
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.postComment_list = [...action.payload.postComment_list];
    }),
    [SET_NEXT_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.postComment_list = [...draft.postComment_list].concat(action.payload.postComment_list);
    }),

    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.postComment_list.unshift(action.payload.postComment);
    }),

    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.postComment_list.findIndex((ct) => ct.postCommentId === action.payload.postCommentId);
      draft.postComment_list.splice(idx, 1);
    }),

    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.postComment_list.findIndex((ct) => ct.postCommentId === action.payload.postComment.postCommentId);
        draft.postComment_list[idx] = action.payload.postComment;
      }),
  }, initialState);

// 액션 생성자
const actionCreators = {
  setPostDB,
  setPostPopDB,
  setOnePostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  addBookmarkDB,
  deleteBookmarkDB,
  setBookmarkDB,
  likePostDB,
  unlikePostDB,
  setCommentDB,
  addCommentDB,
  editCommentDB,
  deleteCommentDB,
};

export { actionCreators };
