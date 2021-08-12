import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/Request';

// 액션타입
const SET_POST = 'post/SET_POST'; // 게시글 전체 불러오기
const SET_ONE_POST = 'post/SET_ONE_POST'; // 게시글 하나 불러오기
const ADD_POST = 'post/ADD_POST'; // 게시글 추가하기
const EDIT_POST = 'post/EDIT_POST'; // 게시글 수정하기
const DELETE_POST = 'post/DELETE_POST'; // 게시글 삭제하기

const SET_BOOKMARK = 'post/SET_BOOKMARK' // 북마크 불러오기
const ADD_BOOKMARK = 'post/ADD_BOOKMARK'; // 북마크 추가하기
const DELETE_BOOKMARK = 'post/DELETE_BOOKMARK'; // 북마크 삭제하기

// 액션생성함수
// 게시물
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setOnePost = createAction(SET_ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));
// 북마크
const setBookmark = createAction(SET_BOOKMARK, (bookmark_list) => ({bookmark_list}));
const addBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({bookmark}));
const deleteBookmark = createAction(DELETE_BOOKMARK, (bookmarkId) => ({bookmarkId}));

// 기본값 정하기
const initialState = {
  list: [],
  my_bookmark_list: [],
};

// 액션함수
const setPostDB = (page, category) => {
  // 전체 게시글 불러오는 함수
  return function (dispatch) {
    instance.get(`/posts?page=${page}&category=${category}`)
      .then((response) => {
        dispatch(setPost(response.data));
        // console.log(response);
        // console.log(response.data);
      })
      .catch((err) => {
        console.error(`부트톡톡 전체 게시글 불러오기 에러 발생: ${err}`);
      });
  };
};

const setOnePostDB = (id) => {
  // 개별 게시글 불러오는 함수
  return function (dispatch) {
    const postId = parseInt(id);
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
    instance
      .post('/posts', {
        title: title,
        content: content,
        nickname: nickname,
        category: category,
      })
      .then((response) => {
        // console.log(response.data);
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
    // console.log(edited_post);
    instance
      .patch(`/posts/${postId}`, {
        title: title,
        content: content,
        postId: postId,
        category: category,
        nickname: nickname,
      })
      .then((response) => {
        const  data = {
          title: title,
          content: content,
          postId: postId,
          category: category,
          nickname: nickname,
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
  // 서버로부터 북마크한 커뮤니티글 목록 불러오는 함수
  return function (dispatch) {
    instance.get(`/users/${nickname}/postBookmarks`).then((response) => {
      dispatch(setBookmark(response.data));
    }).catch((err) => {
      console.error(`부트톡톡 북마크 목록 불러오기 에러 발생: ${err} ### ${err.response}`);
    });
  };
};

const addBookmarkDB = (postId, nickname) => {
  console.log(postId, nickname);

    return function (dispatch) {
        instance.post(`/posts/${postId}/postBookmarks`,{
          postId: parseInt(postId),
          nickname: nickname,
        })
      .then((response) => {
        console.log(response.data);
                dispatch(addBookmark(response.data));
                
            })
            .catch((err) => {
              console.error(`부트톡톡 북마크 추가하기 에러 발생: ${err} ### ${err.response}`);
            });
    };
};

const deleteBookmarkDB = (postId, postBookmarkId) => {
  return function (dispatch) {
      instance.delete(`/posts/${postId}/postBookmarks/${postBookmarkId}`)
    .then((response) => {
              dispatch(deleteBookmark(response.data));
              // console.log(response.data);
          })
          .catch((err) => {
            console.error(`부트톡톡 북마크 삭제하기 에러 발생: ${err} ### ${err.response}`);
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
    [SET_ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [action.payload.post];
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
      }),
    [DELETE_POST]: (state, action) =>
    produce(state, (draft) => {
      const deleted_list = draft.list.filter((post) => {
        if(post.postId !== action.payload.post){
          return post;
        }
      })
      draft.list = deleted_list;
    }),
    [EDIT_POST]: (state, action) =>
    produce(state, (draft) =>{
      draft.list = [action.payload.post];
    }),
    [SET_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.my_bookmark_list = action.payload.bookmark_list;
    }
    ),
    [ADD_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.my_bookmark_list.unshift(action.payload.bookmark);
    }),
    [DELETE_BOOKMARK]: (state, action) =>
    produce(state, (draft) => {
      const new_bookmark = draft.my_bookmark_list.filter((bookmark) => {
        if(bookmark.postBookmarkId !== action.payload.bookmarkId){
          return bookmark;
        }
      })
      draft.list = new_bookmark;
    }),
  },
  initialState
);

// 액션 생성자
const actionCreators = {
  setPostDB,
  setOnePostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  addBookmarkDB,
  deleteBookmarkDB,
  setBookmarkDB,
};

export { actionCreators };
