import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import instance from '../../shared/Request';

// 액션타입
const SET_BOOTTALK = 'SET_BOOTTALK'; //부트톡톡 북마크 불러오기
const SET_MYBOOT = 'SET_BOOTCAMP'; // 부트캠프 북마크 불러오기

// 액션생성함수
const setMyTalk = createAction(SET_BOOTTALK, (mytalk_list) => ({mytalk_list}));
const setMYboot = createAction(SET_MYBOOT, (myboot_list) => ({myboot_list}));

// 기본값 정하기
const initialState = {
  mytalk_list: [],
  myboot_list: [],
};

// 액션함수
// 부트톡톡 북마크 불러오기
const setMyTalkDB = (username) => {
  return function (dispatch) {
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance.get(`/users/${username}/postBookmarks`,{
      nickname: username
    },{headers: headers})
    .then((response) => {
      dispatch(setMyTalk(response.data));
  })
  .catch((err) => {
      console.log(`마이페이지 부트톡톡 북마크 불러오기 에러 발생: ${err}`);
  });
  };
};

// 부트캠프 북마크 불러오기
const setMyBootDB = (nickname) => {
  return function (dispatch) {
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance.get(`/users/${nickname}/bootcampBookmarks`,{
      nickname: nickname,
    },{headers: headers})
    .then((response) => {
      console.log(response);
      console.log(response.data);
      dispatch(setMYboot(response.data));
  })
  .catch((err) => {
      console.log(`마이페이지 부트캠프 북마크 불러오기 에러 발생: ${err}`);
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
}, initialState);


// 액션 생성자
const actionCreators = {
  setMyTalkDB,
  setMyBootDB,
}

export {
  actionCreators
};