import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import instance from '../../shared/request';
import { actionCreators as statusActions } from './status';

// 액션타입
const SET_MYBOOT = 'mypage/SET_BOOTCAMP'; // 부트캠프 북마크 불러오기
const SET_MYPOST = 'mypage/SET_MYPOST';  // 내가 쓴 글 불러오기
const SET_MYBOOKMARK = 'mypage/SET_MYBOOKMARK'; // 내가 북마크한 글들 불러오기

// 액션생성함수
const setMyboot = createAction(SET_MYBOOT, (myboot_list) => ({ myboot_list }));
const setMypost = createAction(SET_MYPOST, (list_list) => ({ list_list }));
const setMyBookmark = createAction(SET_MYBOOKMARK, (mybookmark_list) => ({ mybookmark_list }));

// 기본값 정하기
const initialState = {
  myboot_list: [],
  mypost_list: {},
  myqna_list: [],
  mytalk_list: [],
};

// 액션함수

// 부트캠프 북마크 불러오기
const setMyBootDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance.get(`/users/${nickname}/bootcampBookmarks`)
      .then((response) => {
        // console.log(response.data);
        dispatch(setMyboot(response.data));
        dispatch(statusActions.endTask());
      })
      .catch((err) => {
        console.log(`마이페이지 부트캠프 북마크 불러오기 에러 발생: ${err}`);
        // window.alert('북마크한 부트캠프 목록을 불러오는 데 문제가 발생했어요! :(');
        dispatch(statusActions.endTask());
      });
  };
};


// 내가 쓴글 불러오기
const setMypostDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance.get(`/users/${nickname}/posts`, {
    })
      .then((response) => {
        // console.log(response.data);
        dispatch(setMypost(response.data));
        dispatch(statusActions.endTask());
      })
      .catch((err) => {
        console.log(`마이페이지 내가 쓴글 불러오기 에러 발생: ${err}`);
        dispatch(statusActions.endTask());
      });
  };
};

const setMyBookmarkDB = (nickname) => {
  // 내가 북마크한 글들 불러오기
  return function (dispatch) {
    dispatch(statusActions.addTask());
    instance.get(`/users/${nickname}/allBookmarks`)
      .then((response) => {
        dispatch(setMyBookmark(response.data));
        dispatch(statusActions.endTask());
      }).catch((err) => {
        console.log(`마이페이지 내 북마크 글 불러오기 에러 발생: ${err} ### ${err.response}`);
        dispatch(statusActions.endTask());
      });
  };
};

export default handleActions({
  [SET_MYBOOT]: (state, action) => produce(state, (draft) => {
    draft.myboot_list = [...action.payload.myboot_list];
  }),
  [SET_MYPOST]: (state, action) => produce(state, (draft) => {
    draft.mypost_list = {...action.payload.list_list};
  }),
  [SET_MYBOOKMARK]: (state, action) => produce(state, (draft) => {
    draft.myqna_list = [...action.payload.mybookmark_list.questionBookmarks];
    draft.mytalk_list = [...action.payload.mybookmark_list.postBookmarks];
  }),
}, initialState);


// 액션 생성자
const actionCreators = {
  setMyBootDB,
  setMypostDB,
  setMyBookmarkDB,
}

export {
  actionCreators
};