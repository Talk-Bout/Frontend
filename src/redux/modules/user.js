import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';

//액션 타입
const LOG_IN = 'user/LOG_IN'; //로그인하기
const LOG_OUT = 'user/LOG_OUT'; //로그아웃하기
const SIGN_UP = 'user/SIGN_UP'; //회원가입
const STAY_LOGIN = 'user/STAY_LOGIN'; //로그인 상태 유지
const DOUBLE_EMAIL_CHECK = 'user/DOUBLE_EMAIL_CHECK'; //이메일 중복 확인
const DOUBLE_NICKNAME_CHECK = 'USER/DOUBLE_NICKNAME_CHECK'; //닉네임 중복 확인
const LOGIN_CHECK = 'user/LOGIN_CHECK'; //로그인 페이지 id, pwd 체크
const DELETE_USER = 'user/DELETE_USER'; //회원 탈퇴

// const AUTH_KAKAO = 'user/AUTH_KAKAO'; // 카카오 소셜로그인

//액션 생성함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const signUp = createAction(SIGN_UP, (user) => ({ user }));
const stayLogIn = createAction(STAY_LOGIN, (user) => ({ user }));
const doubleEmailCheck = createAction(DOUBLE_EMAIL_CHECK, (isExist) => ({
  isExist,
}));
const doubleNicknameCheck = createAction(DOUBLE_NICKNAME_CHECK, (isExist) => ({
  isExist,
}));
const loginCheck = createAction(LOGIN_CHECK, (is_error) => ({ is_error }));
const deleteUser = createAction(DELETE_USER, (is_deleted) => ({ is_deleted }));
// const authKakao = createAction(AUTH_KAKAO, (data) => ({data})); // 아직 어떤 형태의 데이터를 받을 수 있는지 모름

//기본값 정하기
const initialState = {
  user: [],
  is_error: false,
  is_login: false,
  is_deleted: false,
  email_exist: false,
  nickname_exist: null,
  one_question: null,
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
        dispatch(logIn(user_info));

        localStorage.setItem('token', response.data.token); //token이름으로 response.data.token 저장
        history.push('/');
      })
      .catch((err) => {
        console.log(`로그인 에러 발생: ${err}`);
        dispatch(loginCheck(err.response.status));
      });
  };
};

const signUpDB = (new_user) => {
  return function (dispatch) {
    instance
      .post('/users', {
        email: new_user.user_mail,
        password: new_user.password,
        nickname: new_user.nickname,
        confirmPassword: new_user.confirm_password,
      })
      .then((response) => {
        dispatch(signUp(response.data));
        history.push('/login');
      })
      .catch((err) => {
        console.log(`회원가입 에러 발생 : ${err}`);
      });
  };
};

// 토큰 => 유저정보 api.
// 로그인 action그대로 쓰기

const stayLogInDB = () => {
  return function (dispatch) {
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const token = localStorage.getItem('token'); // token이라는 이름의 저장된 것을 불러오기
    // console.log(`토큰` === token);
    if (!token) {
      return;
    }

    instance
      .get('/tokenUser', {
        headers: headers,
      })
      .then((response) => {
        // console.log(response.data); //nickname 예상
        dispatch(stayLogIn(response.data));
      })
      .catch((err) => {
        console.error(`로그인 유지 에러: ${err}`);
      });
  };
};

const emailCheckDB = (email) => {
  return function (dispatch) {
    instance
      .get(`/users/email/${email}`, {
        email: email,
      })
      .then((response) => {
        dispatch(doubleEmailCheck(response.data));
      })
      .catch((err) => {
        console.error(`이메일 중복확인 에러: ${err}`);
      });
  };
};

const nicknameCheckDB = (nickname) => {
  return function (dispatch) {
    instance
      .get(`/users/nickname/${nickname}`, {
        nickname: nickname,
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(doubleNicknameCheck(response.data));
      })
      .catch((err) => {
        console.error(`닉네임 중복확인 에러: ${err}`);
      });
  };
};

const userDeleteDB = (nickname) => {
  return function (dispatch) {
    instance
      .delete(`/users/${nickname}`, {
        nickname: nickname,
      })
      .then((response) => {
        dispatch(deleteUser(response.data));
      })
      .catch((err) => {
        console.error(`회원 탈퇴 에러: ${err}`);
        console.error(err.data);
      });
  };
};

const authKakaoDB = () => {
  // 카카오 소셜로그인
  return function (dispatch) {

      // 리프레시 토큰 발급
  //   const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
  //   const axios = require('axios');
  //   axios.post('https://kauth.kakao.com/oauth/token', formUrlEncoded({
  //     "grant_type": "refresh_token",
  //     "client_id": "544c4bf1696e4295986a43b5cd9f7f80", // rest api 키
  //     // client_id: '0af532c12971e247c7d66ed819d41c6c', // 자바스크립트 키
  //     // redirect_uri: 'http://localhost:3000/oauth/kakao/callback',
  // "refresh_token": "473nuOOErq_H-7TDMr_G_xhJYCycE4VFllnpwworDNMAAAF7WBujVw",
  //     // client_secret: 'Xa2qaAZATfPnMdY792FGAC2EcZSOVjVf',
  //   }), {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': '544c4bf1696e4295986a43b5cd9f7f80'}}).then((response) => {
  //     console.log(response);
  //   }).catch((err) => {
  //     console.error(`${err}`);
  //   })
  // };

    // 로그아웃
  const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    const axios = require('axios');
    axios.post('https://kapi.kakao.com/v1/user/logout', 
    // formUrlEncoded({
      // "grant_type": "refresh_token",
      // "client_id": "544c4bf1696e4295986a43b5cd9f7f80", // rest api 키
      // client_id: '0af532c12971e247c7d66ed819d41c6c', // 자바스크립트 키
      // redirect_uri: 'http://localhost:3000/oauth/kakao/callback',
      // "refresh_token": "473nuOOErq_H-7TDMr_G_xhJYCycE4VFllnpwworDNMAAAF7WBujVw",
      // client_secret: 'Xa2qaAZATfPnMdY792FGAC2EcZSOVjVf',
    // }), 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': "Bearer pccRReL3tetIxaVo80STmT8Epb5e0O0-gWOTeQorDNMAAAF7WBujWQ"}}).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.error(`${err}`);
    })
  };

  //   instance.get('/oauth/kakao').then((response) => {
  //     console.log(response.data); //아직 어떤 형태의 데이터를 받을 수 있는지 모름
  //   }).catch((err) => {
  //     console.error(`카카오 소셜로그인 에러: ${err} ### ${err.response}`);
  //   });
  // };
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
        localStorage.removeItem('token');
        window.alert('로그아웃 완료!');
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
    [STAY_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [DOUBLE_EMAIL_CHECK]: (state, action) =>
      produce(state, (draft) => {
        // true로 바꿔주지 말고, 그냥 서버에서 전해주는 값 전달
        draft.email_exist = action.payload.isExist.isExist;
      }),
    [DOUBLE_NICKNAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        // true로 바꿔주지 말고, 그냥 서버에서 전해주는 값 전달
        draft.nickname_exist = action.payload.isExist.isExist;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.is_error);
        if (action.payload.is_error === 400) {
          draft.is_error = true;
        }
      }),
    [DELETE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_deleted = true;
        draft.is_login = false;
      }),
  },
  initialState
);

//액션 생성자
const actionCreators = {
  logOut,
  logInDB,
  signUpDB,
  stayLogInDB,
  emailCheckDB,
  nicknameCheckDB,
  userDeleteDB,
  authKakaoDB,
};

export { actionCreators };
