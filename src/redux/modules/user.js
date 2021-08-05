import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';

//액션 타입
const LOG_IN = 'LOG_IN'; //로그인하기
const LOG_OUT = 'LOG_OUT'; //로그아웃하기
const SIGN_UP = 'SIGN_UP'; //회원가입
const LOG_CHECK = 'LOG_CHECK'; //로그인 확인

//액션 생성함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const signUp = createAction(SIGN_UP, (user) => ({ user }));
// const logCheck = createAction(LOG_CHECK, (user) => ({ user }));

//기본값 정하기
const initialState = {
  user: [],
  is_login: false,
};

//액션함수
const logInDB = (email, password) => {
  return function (dispatch) {
    instance
      .post('/login', { email: email, password: password })
      .then((response) => {
        const user_info = {
          email: response.data.email,
          nickname: response.data.nickname,
        };
        console.log(response.data);
        dispatch(logIn(user_info));
        localStorage.setItem('token', response.data.token);
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
    console.log(new_user);
    instance
      .post('/users', {
        email: new_user.user_mail,
        password: new_user.password,
        nickname: new_user.nickname,
        confirmPassword: new_user.confirm_password,
      })
      .then((response) => {
        console.log(response.data);
        window.alert('회원가입 완료!');
        history.push('/login');
      })
      .catch((err) => {
        console.log(`회원가입 에러 발생 : ${err}`);
      });
  };
};

// const logInCheckDB = 토큰 => 유저정보 api.
// 로그인 action그대로 쓰기
// const logInCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     instance
//     .get('')
//     .then((response) => {

//     .catch((err) => {
//         window.alert('로그인 정보를 확인해주세요')
//         console.log(err);
//       })
//     })
//   };
// };

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
