import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import instance from '../../shared/Request';
import { actionCreators as statusActions } from './status';

// 액션타입
const SET_BOOTTALK = 'mypage/SET_BOOTTALK'; //부트톡톡 북마크 불러오기
const SET_MYBOOT = 'mypage/SET_BOOTCAMP'; // 부트캠프 북마크 불러오기
const SET_MYPOST = 'mypage/SET_MYPOST'  // 내가 쓴 글 불러오기
const SET_MYQNA = 'mypage/SET_MYQNA' // 질문과 답변 북마크 불러오기
const SET_MYCOMMU = 'mypage/SET_MYCOMMU' // 커뮤니티 북마크 불러오기

// 액션생성함수
const setMytalk = createAction(SET_BOOTTALK, (mytalk_list) => ({mytalk_list}));
const setMyboot = createAction(SET_MYBOOT, (myboot_list) => ({myboot_list}));
const setMypost = createAction(SET_MYPOST, (mypost_list) => ({mypost_list}));
const setMyqna = createAction(SET_MYQNA, (myqna_list) => ({myqna_list}));
const setMycommu = createAction(SET_MYCOMMU, (mycommu_list) => ({mycommu_list}));

// 기본값 정하기
const initialState = {
  mytalk_list: [],
  myboot_list: [],
  mypost_list: [],
  myqna_list: [],
  mycommu_list: [],
};

// 액션함수

// 부트캠프 북마크 불러오기
const setMyBootDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/bootcampBookmarks`,{
    })
    .then((response) => {
      // console.log(response.data);
      dispatch(setMyboot(response.data));
      dispatch(statusActions.endLoading());
  })
  .catch((err) => {
      console.log(`마이페이지 부트캠프 북마크 불러오기 에러 발생: ${err}`);
  });
  };
};

// 부트톡톡 북마크 불러오기
const setMyTalkDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/postBookmarks`,{
    })
    .then((response) => {
      dispatch(setMytalk(response.data));
      dispatch(statusActions.endLoading());
      // console.log(response.data);
  })
  .catch((err) => {
      console.log(`마이페이지 부트톡톡 북마크 불러오기 에러 발생: ${err}`);
  });
  };
};

// 질문과답변 북마크 불러오기
const setMyQnaDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/questionBookmarks`,{
    })
    .then((response) => {
      dispatch(setMyqna(response.data));
      dispatch(statusActions.endLoading());
      // console.log(response.data);
  })
  .catch((err) => {
      console.log(`마이페이지 질문과답변 북마크 불러오기 에러 발생: ${err}`);
  });
  };
};

// 커뮤니티 북마크 불러오기
const setMyCommuDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/communityBookmarks`,{
    })
    .then((response) => {
      dispatch(setMycommu(response.data));
      dispatch(statusActions.endLoading());
      // console.log(response.data);
  })
  .catch((err) => {
      console.log(`마이페이지 커뮤니티 북마크 불러오기 에러 발생: ${err}`);
  });
  };
};



// 내가 쓴글 불러오기
const setMypostDB = (nickname) => {
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    instance.get(`/users/${nickname}/posts`,{
    })
    .then((response) => {
      // console.log(response.data);
      dispatch(setMypost(response.data));
      dispatch(statusActions.endLoading());
  })
  .catch((err) => {
      console.log(`마이페이지 내가 쓴글 불러오기 에러 발생: ${err}`);
  });
  };
};


export default handleActions({
  [SET_BOOTTALK]: (state, action) => produce(state, (draft) => {
      draft.mytalk_list = [...action.payload.mytalk_list];
  }),
  [SET_MYBOOT]: (state, action) => produce(state, (draft) => {
    draft.myboot_list = [...action.payload.myboot_list];
  }),
  [SET_MYPOST]: (state, action) => produce(state, (draft) => {
    draft.mypost_list = [...action.payload.mypost_list];
  }),
  [SET_MYQNA]: (state, action) => produce(state, (draft) => {
    draft.myqna_list = [...action.payload.myqna_list];
  }),
  [SET_MYCOMMU]: (state, action) => produce(state, (draft) => {
    draft.mycommu_list = [...action.payload.mycommu_list];
  }),
}, initialState);


// 액션 생성자
const actionCreators = {
  setMyTalkDB,
  setMyBootDB,
  setMypostDB,
  setMyQnaDB,
  setMyCommuDB,
}

export {
  actionCreators
};