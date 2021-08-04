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

// 액션생성함수
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setOnePost = createAction(SET_ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

// 기본값 정하기
const initialState = {
  list: [],
};

// 액션함수
const setPostDB = () => {
  // 전체 게시글 불러오는 함수
  return function (dispatch) {
    instance.get('/posts')
      .then((response) => {
        dispatch(setPost(response.data));
      })
      .catch((err) => {
        console.error(`전체 게시글 불러오기 에러 발생: ${err}`);
      });
  };
};

const setOnePostDB = (id) => {
  // 개별 게시글 불러오는 함수
  return function (dispatch) {
    const postId = id;
    // const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance
      .get(`/posts/${postId}`, {
        postId: postId,
      })
      .then((response) => {
        console.log(response.data);
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
    console.log(headers);
    instance
      .post('/posts', {
        title: title,
        content: content,
        nickname: nickname,
        category: category,
      }, {headers: headers})
      .then((response) => {
        console.log(response);
        dispatch(addPost(response.data));
      })
      .catch((err) => {
        console.error(`게시글 추가하기 에러 발생: ${err}`);
      });
  };
};

const editPostDB = (edited_post) => {
  console.log(edited_post);
  // 게시글 수정하는 함수
  return function (dispatch) {
    const title = edited_post.title;
    const content = edited_post.content;
    const postId = edited_post.postId;
    const category = edited_post.category;
    const nickname = edited_post.nickname;
    instance
      .patch(`/posts/${postId}`, {
        title: title,
        content: content,
        postId: postId,
        category: category,
        nickname: nickname,
      })
      .then((response) => {
        dispatch(editPost(response.data));
        // if (edited_post.board_name === 'question') {
        //   history.push(`/question/detail/${postId}`);
        // }
        // history.push('/review/list');
      })
      .catch((err) => {
        console.error(`게시글 수정하기 에러 발생: ${err}`);
      });
  };
};

const deletePostDB = (deleted_post) => {
  // 게시글 삭제하는 함수
  return function (dispatch) {
    const postId = deleted_post.id;
    const nickname = deleted_post.nickname;
    instance
      .delete(`/posts/${postId}`, {
        postId: postId,
        nickname: nickname,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(deletePost(deleted_post));
        // history.push('/');
      })
      .catch((err) => {
        console.error(`게시글 삭제하기 에러 발생: ${err}`);
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
      console.log(action.payload.post);
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
};

export { actionCreators };
