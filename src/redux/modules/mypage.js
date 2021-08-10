import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';
import {history} from '../ConfigureStore';
import instance from '../../shared/Request';

// 액션타입
const SET_MYPOST = 'SET_MYPOST'; //내가 쓴글 불러오기

// 액션생성함수
const setMyPost = createAction(SET_MYPOST, (mypost_list) => ({mypost_list}));

// 기본값 정하기
const initialState = {
  mypost_list: [],
};

// 액션함수
const setMyPostDB = (username) => {
  return function (dispatch) {
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}`}
    instance.get(`/users/${username}/posts`,{
      nickname: username
    },{headers: headers})
    .then((response) => {
      console.log(response);
      console.log(response.data);
      dispatch(setMyPost(response.data));
  })
  .catch((err) => {
      console.log(`마이페이지 내가쓴글 불러오기 에러 발생: ${err}`);
  });
  };
};

export default handleActions({
  [SET_MYPOST]: (state, action) => produce(state, (draft) => {
      draft.mypost_list = [...action.payload.mypost_list];
  }),
}, initialState);


// 액션 생성자
const actionCreators = {
  setMyPostDB,
}

export {
  actionCreators
};