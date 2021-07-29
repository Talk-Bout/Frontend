import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';

//액션 타입
const LOG_IN = 'LOG_IN'; //로그인하기
const SIGN_UP = 'SIGN_UP'; //회원가입

//액션 생성함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const signUp = createAction(SIGN_UP, (user) => ({ user }));

//기본값 정하기
const initialState = {
  user: [],
  is_login: false,
};

//액션함수
const logInDB = (email, password) => {
  return function (dispatch) {
    const axios = require('axios');
    axios
      .post('http://15.165.18.118/login', { email, password }) //(1) api제대로 넣기(서버와 통신가능) 서버에서 response.data로 돌려줌
      .then((response) => {
        // dispatch(logIn(response.data));
        //(3) 주석살리고 데이터 실행
        console.log(response); //(2) 서버가 주는 데이터 확인! 24 ->36
      })
      .catch((err) => {
        console.log(`로그인 에러 발생: ${err}`);
      });
  };
};

const signUpDB = (new_user) => {
  return function (dispatch) {
    console.log(new_user);
    const axios = require('axios');
    axios
      .post('http://15.165.18.118/users', {
        email: new_user.user_mail,
        password: new_user.password,
        nickname: new_user.nickname,
        confirmPassword: new_user.confirm_password,
      }) //여기에서는 백이 원하는 데이터 형식 똑같이 보내기
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(`회원가입 에러 발생 : ${err}`);
      });
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        // is_login = true;
        // console.log(action.payload.user);
        //(4) 여기 주석처리하구 콘솔(action.payload.user)찍어서 확인
        //(5) draft.user에 어떻게 넣을지 고민 - draft.user와 action.payload.user의 형식 맞추기
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//액션 생성자
const actionCreators = {
  logIn,
  signUp,
  logInDB,
  signUpDB,
};

export { actionCreators };
