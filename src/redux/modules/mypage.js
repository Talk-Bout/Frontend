import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import instance from '../../shared/request';
import { actionCreators as statusActions } from './status';
import { actionCreators as imageActions } from './image';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { history } from '../ConfigureStore';

// 액션타입
const SET_MYBOOT = 'mypage/SET_BOOTCAMP'; // 부트캠프 북마크 불러오기
const SET_MYPOST = 'mypage/SET_MYPOST';  // 내가 쓴 글 불러오기
const SET_MYBOOKMARK = 'mypage/SET_MYBOOKMARK'; // 내가 북마크한 글들 불러오기
const EDIT_INFO = 'mypage/UPDATE_INFO' // 회원정보 수정하기(이메일, 닉네임, 프로필사진)

// 액션생성함수
const setMyboot = createAction(SET_MYBOOT, (myboot_list) => ({ myboot_list }));
const setMypost = createAction(SET_MYPOST, (mypost_list) => ({ mypost_list }));
const setMyBookmark = createAction(SET_MYBOOKMARK, (mybookmark_list) => ({ mybookmark_list }));

// 기본값 정하기
const initialState = {
  myboot_list: [],
  mypost_list: [],
  myqna_list: [],
  mytalk_list: [],
};

// 액션함수

// 부트캠프 북마크 불러오기
const setMyBootDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/bootcampBookmarks`)
      .then((response) => {
        // console.log(response.data);
        dispatch(setMyboot(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(`마이페이지 부트캠프 북마크 불러오기 에러 발생: ${err}`);
      });
  };
};


// 내가 쓴글 불러오기
const setMypostDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/posts`, {
    })
      .then((response) => {
        // console.log(response.data);
        dispatch(setMypost(response.data));
        dispatch(statusActions.endLoading());
      })
      .catch((err) => {
        console.error(`마이페이지 내가 쓴글 불러오기 에러 발생: ${err}`);
      });
  };
};

const setMyBookmarkDB = (nickname) => {
  // 내가 북마크한 글들 불러오기
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/allBookmarks`)
      .then((response) => {
        dispatch(setMyBookmark(response.data));
        dispatch(statusActions.endLoading());
      }).catch((err) => {
        console.error(`마이페이지 내 북마크 글 불러오기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};

const editInfoDB = (nickname, profilePic) => {
  // 개인정보 수정하기  
  return function (dispatch) {
    // dispatch(statusActions.setLoading());
    instance.patch(`/users/${nickname}`, {
      nickname: nickname,
      email: 'leedmeen@naver.com',
      profilePic: profilePic,
    })
      .then((response) => {
        if (response.data.isUpdated === true) {
          deleteCookie('profilePic');
          deleteCookie('nickname');
          setCookie('profilePic', profilePic);
          setCookie('nickname', nickname);
        }
        console.log(response.data);
        dispatch(statusActions.endLoading());
        dispatch(imageActions.getPreview(null));
        dispatch(imageActions.DeleteImageUrl());
        history.push('/mypage');
      }).catch((err) => {
        console.error(`마이페이지 개인정보 수정하기 에러 발생: ${err} ### ${err.response}`);
      });
  };
};


export default handleActions({
  [SET_MYBOOT]: (state, action) => produce(state, (draft) => {
    draft.myboot_list = [...action.payload.myboot_list];
  }),
  [SET_MYPOST]: (state, action) => produce(state, (draft) => {
    draft.mypost_list = [...action.payload.mypost_list];
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
  editInfoDB,
}

export {
  actionCreators
};