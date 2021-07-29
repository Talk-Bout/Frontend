import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';

//액션 타입
const LOG_IN = 'LOG_IN'; //로그인하기
const LOG_OUT = 'LOG_OUT'; //로그아웃하기
const SIGN_UP = 'SIGN_UP'; //회원가입

//액션 생성함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
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
      .post('http://15.165.18.118/login', { email, password })
      .then((response) => {
        dispatch(logIn(response.data));
        window.alert('로그인 완료!');
        history.push('/');
      })
      .catch((err) => {
        console.log(`로그인 에러 발생: ${err}`);
      });
  };
};

const signUpDB = (new_user) => {
  return function (dispatch) {
    const axios = require('axios');
    axios
      .post('http://15.165.18.118/users', {
        email: new_user.user_mail,
        password: new_user.password,
        nickname: new_user.nickname,
        confirmPassword: new_user.confirm_password,
      })
      .then((response) => {
        window.alert('회원가입 완료!');
        history.push('/login');
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
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = false;
        window.alert('로그아웃 완료!');
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//액션 생성자
const actionCreators = {
  logIn,
  logOut,
  signUp,
  logInDB,
  signUpDB,
};

export { actionCreators };
