import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_POST = 'SET_POST'; // 게시글 전체 불러오기
const SET_ONE_POST = 'SET_ONE_POST'; // 게시글 하나 불러오기
const ADD_POST = 'ADD_POST'; // 게시글 추가하기
const EDIT_POST = 'EDIT_POST'; // 게시글 수정하기
const DELETE_POST = 'DELETE_POST'; // 게시글 삭제하기
const ADD_BOOKMARK = 'ADD_BOOKMARK'; // 북마크 추가하기
const DELETE_BOOKMARK = 'DELETE_BOOKMARK'; // 북마크 삭제하기

// 액션생성함수
// 게시물
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setOnePost = createAction(SET_ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));
// 북마크
const addBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({bookmark}));
const deleteBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({bookmark}));

// 기본값 정하기
const initialState = {
  list: [],
  bookmark_list: [],
};

// 액션함수
const setPostDB = (page) => {
  // 전체 게시글 불러오는 함수
  return function (dispatch) {
    instance.get(`/posts?page=${page}&category=test`)
      .then((response) => {
        dispatch(setPost(response.data));
        // console.log(response.data);
      })
      .catch((err) => {
        console.error(`전체 게시글 불러오기 에러 발생: ${err}`);
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
        console.error(`개별 게시글 불러오기 에러 발생: ${err}`);
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
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance
      .post('/posts', {
        title: title,
        content: content,
        nickname: nickname,
        category: category,
      }, {headers: headers})
      .then((response) => {
        // console.log(response.data);
        dispatch(addPost(response.data));
      })
      .catch((err) => {
        console.error(`게시글 추가하기 에러 발생: ${err}`);
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
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance
      .patch(`/posts/${postId}`, {
        title: title,
        content: content,
        postId: postId,
        category: category,
        nickname: nickname,
      }, {headers: headers})
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
        console.error(`게시글 수정하기 에러 발생: ${err}`);
      });
  };
};

const deletePostDB = (deleted_post) => {
  // 게시글 삭제하는 함수
  return function (dispatch) {
    const postId = parseInt(deleted_post.postId);
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance
      .delete(`/posts/${postId}`, {headers: headers})
      .then((response) => {
        // console.log(response.data);
        dispatch(deletePost(postId));
      })
      .catch((err) => {
        console.error(`게시글 삭제하기 에러 발생: ${err}`);
      });
  };
};

const addBookmarkDB = (add_bookmark) => {
  console.log(add_bookmark);
    return function (dispatch) {
      const postId = parseInt(add_bookmark.postId);
      const nickname = add_bookmark.nickname;
        instance.post(`/posts/${postId}/postBookmarks`,{
          postId : postId,
          nickname : nickname,
        })
      .then((response) => {
                dispatch(addBookmark(response.data));
            })
            .catch((err) => {
                console.log(`에러 발생: ${err}`);
            });
    };
};

const deleteBookmarkDB = (deleted_bookmark) => {
  console.log(deleted_bookmark);
  return function (dispatch) {
    const postId = deleted_bookmark.postId;
    const postBookmarkId = deleted_bookmark.postBookmarkId;
    
      instance.delete(`/posts/${postId}/postBookmarks/${postBookmarkId}`,{
        postBookmarkId : postBookmarkId,
      })
    .then((response) => {
              dispatch(deleteBookmark(response.data));
              console.log(response.data);
          })
          .catch((err) => {
              console.log(`에러 발생: ${err}`);
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
        draft.list.unshift(action.payload.post);
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
    [ADD_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.bookmark_list.unshift(action.payload.bookmark);
    }),
    [DELETE_BOOKMARK]: (state, action) =>
    produce(state, (draft) => {
      const deleted_bookmark = draft.bookmark_list.filter((bookmark) => {
        if(bookmark.bookmarkId !== action.payload.bookmark){
          return bookmark;
        }
      })
      draft.list = deleted_bookmark;
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
};

export { actionCreators };
