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
        console.log(response.data);
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

const kakaoLogin = () => {
  // 카카오 액세스 토큰, 리프레시 토큰 발급
  return function (dispatch) {
    const accessToken_URL = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken_URL = new URL(window.location.href).searchParams.get('refreshToken');
    const provider_URL = new URL(window.location.href).searchParams.get('provider');
    const nickname_URL = new URL(window.location.href).searchParams.get('nickname');
    const profilePic_URL = new URL(window.location.href).searchParams.get('profilePic');
    console.log(accessToken_URL, refreshToken_URL, provider_URL, nickname_URL, profilePic_URL);
    localStorage.setItem('accessToken', accessToken_URL);
    localStorage.setItem('refreshToken', refreshToken_URL);
    localStorage.setItem('provider', provider_URL);
    localStorage.setItem('nickname', nickname_URL);
    localStorage.setItem('profilePic', profilePic_URL);
    history.push('/');
  };
};

const kakaoRefresh = () => {
  // 카카오 액세스 토큰 갱신
  return function (dispatch) {
    const REST_API_KEY = 'a1e045a6bd23510144e987da133f3eff';
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    const axios = require('axios');
    axios.post('https://kauth.kakao.com/oauth/token', formUrlEncoded({
      grant_type: 'refresh_token',
      client_id: REST_API_KEY,
      refresh_token: localStorage.getItem('refreshToken'),
    }), {headers: headers}).then((response) => {
      localStorage.setItem('Atoken', response.data.access_token);
    }).catch((err) => {
      console.error(`카카오 로그인 토큰 갱신 에러: ${err}`);
    });
  };
};

const LogOut = () => {
  // 로그아웃
  instance.post('/oauth/logout', {
    provider: localStorage.getItem('provider')
  }).then((response) => {
    // console.log(response);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('provider');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profilePic');
    history.push('/');
  }).catch((err) => {
    console.log(`로그아웃 에러: ${err}`);
  });
};

const googleLogin = () => {
  // 구글 소셜로그인 테스트용
  return function (dispatch) {
    const accessToken_URL = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken_URL = new URL(window.location.href).searchParams.get('refreshToken');
    const provider_URL = new URL(window.location.href).searchParams.get('provider');
    const nickname_URL = new URL(window.location.href).searchParams.get('nickname');
    const profilePic_URL = new URL(window.location.href).searchParams.get('profilePic');
    console.log(accessToken_URL, refreshToken_URL, provider_URL, nickname_URL, profilePic_URL);
    localStorage.setItem('accessToken', accessToken_URL);
    localStorage.setItem('refreshToken', refreshToken_URL);
    localStorage.setItem('provider', provider_URL);
    localStorage.setItem('nickname', nickname_URL);
    localStorage.setItem('profilePic', profilePic_URL);
    history.push('/');
  };
};

const googleRefresh = () => {
  // 구글 액세스 토큰 갱신
  return function (dispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    const axios = require('axios');
    axios.post('https://oauth2.googleapis.com/token', formUrlEncoded({
      grant_type: 'refresh_token',
      client_secret: 'NEk_9kMajTMRCvE0b24vQWCh',
      client_id: '1024289816833-ekko4or0shvl9vusetgga5rmbs5u8gla.apps.googleusercontent.com',
      refresh_token: refreshToken,
    }), {headers: headers}).then((response) => {
      console.log(response.data);
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.removeItem('idToken');
      localStorage.setItem('idToken', response.data.id_token);
    }).catch((err) => {
      console.error(`구글 로그인 토큰 갱신 에러: ${err}`);
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
  logInDB,
  signUpDB,
  stayLogInDB,
  emailCheckDB,
  nicknameCheckDB,
  userDeleteDB,
  kakaoLogin,
  kakaoRefresh,
  LogOut,
  googleLogin,
  googleRefresh,
};

export { actionCreators };
