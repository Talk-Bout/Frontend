import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';

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
    const axios = require('axios');
    axios
      .get('http://15.165.18.118/posts')
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
    const axios = require('axios');
    axios
      .get(`http://15.165.18.118/posts/${postId}`)
      .then((response) => {
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
    const axios = require('axios');
    console.log(new_post);
    axios
      .post('http://15.165.18.118/posts', {
        title: title,
        content: content,
        nickname: nickname,
        category: category,
      })
      .then((response) => {
        console.log(response);
        // dispatch(addPost(response.data));
        // history.push('/');
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
    const axios = require('axios');
    axios
      .patch(`http://15.165.18.118/posts/${postId}`, {
        title: title,
        content: content,
      })
      .then((response) => {
        dispatch(editPost(response.data));
        if (edited_post.board_name === 'question') {
          history.push(`/question/detail/${postId}`);
        }
        // history.push('/review/list');
      })
      .catch((err) => {
        console.error(`게시글 수정하기 에러 발생: ${err}`);
      });
  };
};

const deletePostDB = (id) => {
  // 게시글 삭제하는 함수
  return function (dispatch) {
    const postId = id;
    const axios = require('axios');
    axios
      .delete('url')
      .then((response) => {
        console.log('deletePostDB 함수 호출 성공!');
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
