import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/Request';

//액션 타입
const STAY_LOGIN = 'user/STAY_LOGIN'; //로그인 상태 유지
const DELETE_USER = 'user/DELETE_USER'; //회원 탈퇴
const GOOGLE_LOG_IN = 'user/GOOGLE_LOG_IN'; // 구글 accessToken, provider, nickname, profilePic 저장
const GOOGLE_RE_FRESH = 'user/GOOGLE_RE_FRESH'; // 구글 accessToken 갱신 및 idToken 발급
const KAKAO_LOG_IN = 'user/KAKAO_LOG_IN'; // 카카오 accessToken, provider, nickname, profilePic 저장
const KAKAO_RE_FRESH = 'user/KAKAO_RE_FRESH'; // 카카오 accessToken 갱신
const REMOVE_TOKENS = 'user/REMOVE_TOKENS'; // 구글&카카오 로그아웃 및 토큰 삭제
const LOGIN_CHECK = 'user/LOGIN_CHECK'; 

//액션 생성함수
const stayLogIn = createAction(STAY_LOGIN, (user) => ({ user }));
const deleteUser = createAction(DELETE_USER, (is_deleted) => ({ is_deleted }));
const googleLogIn = createAction(GOOGLE_LOG_IN, (google_info) => ({google_info}));
const googleReFresh = createAction(GOOGLE_RE_FRESH, (google_tokens) => ({google_tokens}));
const kakaoLogIn = createAction(KAKAO_LOG_IN, (kakao_info) => ({kakao_info}));
const kakaoReFresh = createAction(KAKAO_RE_FRESH, (kakao_token) => ({kakao_token}));
const removeTokens = createAction(REMOVE_TOKENS, () => ({}));
const loginCheck = createAction(LOGIN_CHECK, () => ({}));

//기본값 정하기
const initialState = {
  user: [],
  is_deleted: false,
  // one_question: null, // 왜 여기 있는지 모르겠음..
  user_info: null,
  is_login: false,
};

//액션함수
const googleLogin = () => {
  // 구글 액세스토큰, 리프레시토큰 발급
  return function (dispatch) {
    const accessToken_URL = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken_URL = new URL(window.location.href).searchParams.get('refreshToken');
    const provider_URL = new URL(window.location.href).searchParams.get('provider');
    const nickname_URL = new URL(window.location.href).searchParams.get('nickname');
    const profilePic_URL = new URL(window.location.href).searchParams.get('profilePic');
    sessionStorage.setItem('accessToken', accessToken_URL);
    sessionStorage.setItem('refreshToken', refreshToken_URL);
    sessionStorage.setItem('provider', provider_URL);
    sessionStorage.setItem('nickname', nickname_URL);
    sessionStorage.setItem('profilePic', profilePic_URL);
    const google_info = {
      accessToken: accessToken_URL,
      provider: provider_URL,
      nickname: nickname_URL,
      profilePic: profilePic_URL,
    };
    dispatch(googleLogIn(google_info));
    history.push('/');
  };
};

const googleRefresh = () => {
  // 구글 액세스토큰 갱신 및 아이디토큰 발급
  return function (dispatch) {
    const clientSecret = 'NEk_9kMajTMRCvE0b24vQWCh';
    const clientId = '1024289816833-ekko4or0shvl9vusetgga5rmbs5u8gla.apps.googleusercontent.com';
    const refreshToken = sessionStorage.getItem('refreshToken');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    const axios = require('axios');
    axios.post('https://oauth2.googleapis.com/token', formUrlEncoded({
      grant_type: 'refresh_token',
      client_secret: clientSecret,
      client_id: clientId,
      refresh_token: refreshToken,
    }), {headers: headers}).then((response) => {
      sessionStorage.removeItem('accessToken');
      sessionStorage.setItem('accessToken', response.data.access_token);
      sessionStorage.removeItem('idToken');
      sessionStorage.setItem('idToken', response.data.access_token);
      const tokens = {
        accessToken: response.data.access_token,
        idToken: response.data.id_token,
      };
      dispatch(googleReFresh(tokens));
    }).catch((err) => {
      console.error(`구글 로그인 토큰 갱신 에러: ${err}`);
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
    sessionStorage.setItem('accessToken', accessToken_URL);
    sessionStorage.setItem('refreshToken', refreshToken_URL);
    sessionStorage.setItem('provider', provider_URL);
    sessionStorage.setItem('nickname', nickname_URL);
    sessionStorage.setItem('profilePic', profilePic_URL);
    const kakao_info = {
      accessToken: accessToken_URL,
      provider: provider_URL,
      nickname: nickname_URL,
      profilePic: profilePic_URL,
    };
    dispatch(kakaoLogIn(kakao_info));
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
      refresh_token: sessionStorage.getItem('refreshToken'),
    }), {headers: headers}).then((response) => {
      sessionStorage.removeItem('accessToken');
      sessionStorage.setItem('accessToken', response.data.access_token);
      const kakao_token = {
        accessToken: response.data.access_token
      }
      dispatch(kakaoReFresh(kakao_token));
    }).catch((err) => {
      console.error(`카카오 로그인 토큰 갱신 에러: ${err}`);
    });
  };
};

const logOut = () => {
  // 로그아웃
  return function (dispatch) {
    const accessToken = sessionStorage.getItem('accessToken');
    const provider = sessionStorage.getItem('provider');
    const headers = {'authorization': `Bearer ${accessToken}`};
    const axios = require('axios');
    axios.post('http://13.209.12.249/oauth/logout', {
      provider: provider,
    }, {headers: headers}).then((response) => {
      console.log(response);
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('idToken');
      sessionStorage.removeItem('provider');
      sessionStorage.removeItem('nickname');
      sessionStorage.removeItem('profilePic');
      dispatch(removeTokens());
      history.push('/');
    }).catch((err) => {
      console.log(`로그아웃 에러: ${err}`);
    });
  };
};

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

export default handleActions(
  { 
    // [LOGIN_CHECK]: (state, action) =>
    //   produce(state, (draft) => {
    //     if (action.payload.is_error === 400) {
    //       draft.is_error = true;
    //     }
    //   }),
    [DELETE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_deleted = true;
        draft.is_login = false;
      }),
    [GOOGLE_LOG_IN]: (state, action) => produce(state, (draft) => {
      draft.user_info = action.payload.google_info;
      draft.is_login = true;
    }),
    [GOOGLE_RE_FRESH]: (state, action) => produce(state, (draft) => {
      draft.user_info['accessToken'] = action.payload.google_tokens.accessToken;
      draft.user_info['idToken'] = action.payload.google_tokens.idToken;
      draft.is_login = true;
    }),
    [KAKAO_LOG_IN]: (state, action) => produce(state, (draft) => {
      draft.user_info = action.payload.kakao_info;
      draft.is_login = true;
    }),
    [KAKAO_RE_FRESH]: (state, action) => produce(state, (draft) => {
      draft.user_info['accessToken'] = action.payload.kakao_token.accessToken;
      draft.is_login = true;
    }),
    [REMOVE_TOKENS]: (state, action) => produce(state, (draft) => {
      draft.user_info = null;
      draft.is_login = false;
    }),
    [LOGIN_CHECK]: (state, action) => produce(state, (draft) => {
      draft.is_login = true;
    }),
  },
  initialState
);

//액션 생성자
const actionCreators = {
  googleLogin,
  googleRefresh,
  kakaoLogin,
  kakaoRefresh,
  logOut,
  stayLogInDB,
  userDeleteDB,
  loginCheck,
};

export { actionCreators };
