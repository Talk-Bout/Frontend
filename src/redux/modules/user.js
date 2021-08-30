import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { history } from '../ConfigureStore';
import instance from '../../shared/request';
import { getCookie, setCookie, deleteCookie, } from "../../shared/cookie";
import { actionCreators as statusActions } from './status';

//액션 타입
const DELETE_USER = 'user/DELETE_USER'; //회원 탈퇴
const LOG_IN = 'user/GOOGLE_LOG_IN'; // 로그인하는 사용자 닉네임, 프로필 사진 저장
const LOGIN_CHECK = 'user/LOGIN_CHECK'; // 로그인 상태 설정
const LOGOUT_CHECK = 'user/LOGOUT_CHECK'; // 로그아웃 상태 설정
const USER_CHECK = 'user/USER_CHECK'; // 접속자 닉네임, 프로필 사진 확인
const USER_EDIT = 'user/USER_EDIT'; // 회원정보 변경

//액션 생성함수
const logIn = createAction(LOG_IN, (info) => ({ info }));
const deleteUser = createAction(DELETE_USER, (is_deleted) => ({ is_deleted }));
const loginCheck = createAction(LOGIN_CHECK, () => ({}));
const logoutCheck = createAction(LOGOUT_CHECK, () => ({}));
const userCheck = createAction(USER_CHECK, (info) => ({ info }));
const userEdit = createAction(USER_EDIT, (info) => ({ info }));

//기본값 정하기
const initialState = {
  user: { nickname: null, profilePic: null },
  is_deleted: false,
  is_login: false,
};

//액션함수
const googleLogin = () => {
  // 구글 액세스토큰, 리프레시토큰 발급
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    const accessToken_URL = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken_URL = new URL(window.location.href).searchParams.get('refreshToken');
    const idToken_URL = new URL(window.location.href).searchParams.get('idToken');
    const provider_URL = new URL(window.location.href).searchParams.get('provider');
    const nickname_URL = new URL(window.location.href).searchParams.get('nickname');
    const profilePic_URL = new URL(window.location.href).searchParams.get('profilePic');
    const user_info = {
      nickname: nickname_URL,
      profilePic: profilePic_URL,
    }
    dispatch(logIn(user_info));
    setCookie('refreshToken', refreshToken_URL);
    setCookie('accessToken', accessToken_URL);
    setCookie('idToken', idToken_URL);
    setCookie('provider', provider_URL);
    history.push('/');
    dispatch(statusActions.endLoading());
    window.location.reload();
  };
};

const googleRefresh = () => {
  // 구글 액세스토큰 갱신 및 아이디토큰 발급
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    const clientSecret = 'NEk_9kMajTMRCvE0b24vQWCh';
    const clientId = '1024289816833-ekko4or0shvl9vusetgga5rmbs5u8gla.apps.googleusercontent.com';
    const refreshToken = getCookie('refreshToken');
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    const axios = require('axios');
    axios.post('https://oauth2.googleapis.com/token', formUrlEncoded({
      grant_type: 'refresh_token',
      client_secret: clientSecret,
      client_id: clientId,
      refresh_token: refreshToken,
    }), { headers: headers }).then((response) => {
      setCookie('accessToken', response.data.access_token);
      setCookie('idToken', response.data.id_token);
      dispatch(statusActions.endLoading());
    }).catch((err) => {
      console.error(`구글 로그인 토큰 갱신 에러: ${err}`);
      dispatch(statusActions.endLoading());
    });
  };
};

const kakaoLogin = () => {
  // 카카오 액세스 토큰, 리프레시 토큰 발급
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    const accessToken_URL = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken_URL = new URL(window.location.href).searchParams.get('refreshToken');
    const provider_URL = new URL(window.location.href).searchParams.get('provider');
    const nickname_URL = new URL(window.location.href).searchParams.get('nickname');
    const profilePic_URL = new URL(window.location.href).searchParams.get('profilePic');
    const user_info = {
      nickname: nickname_URL,
      profilePic: profilePic_URL,
    };
    dispatch(logIn(user_info));
    setCookie('accessToken', accessToken_URL);
    setCookie('refreshToken', refreshToken_URL);
    setCookie('provider', provider_URL);
    history.push('/');
    dispatch(statusActions.endLoading());
    window.location.reload();
  };
};

const kakaoRefresh = () => {
  // 카카오 액세스 토큰 갱신
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    const REST_API_KEY = 'a1e045a6bd23510144e987da133f3eff';
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
    const axios = require('axios');
    axios.post('https://kauth.kakao.com/oauth/token', formUrlEncoded({
      grant_type: 'refresh_token',
      client_id: REST_API_KEY,
      refresh_token: getCookie('refreshToken'),
    }), { headers: headers }).then((response) => {
      setCookie('accessToken', response.data.access_token);
      dispatch(statusActions.endLoading());
    }).catch((err) => {
      console.error(`카카오 로그인 토큰 갱신 에러: ${err}`);
      dispatch(statusActions.setLoading());
    });
  };
};

const logOut = () => {
  // 로그아웃
  return function (dispatch) {
    dispatch(statusActions.setLoading());
    const accessToken = getCookie('accessToken');
    const provider = getCookie('provider');
    const headers = { 'authorization': `Bearer ${accessToken}` };
    const axios = require('axios');
    axios.post('https://fw3efsadfcv.shop/api/oauth/logout', {
      provider: provider,
    }, { headers: headers }).then((response) => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('idToken');
      deleteCookie('provider');
      dispatch(logoutCheck());
      dispatch(statusActions.endLoading());
      window.alert('성공적으로 로그아웃 되었습니다.');
      history.push('/');
    }).catch((err) => {
      console.error(`로그아웃 에러: ${err}`);
      dispatch(statusActions.setLoading());
    });
  };
};

const userCheckDB = () => {
  // 접속 중인 사용자 닉네임, 프로필 사진 정보 가져오기
  return function (dispatch) {
    instance.get('/oauth/tokenUser')
      .then((response) => {
        dispatch(userCheck(response.data));
      }).catch((err) => {
        console.log(`사용자 접속 정보 불러오기 에러 발생: ${err} ### ${err.response}`);
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
    [LOG_IN]: (state, action) => produce(state, (draft) => {
      draft.user_info = action.payload.info;
      draft.is_login = true;
    }),
    [LOGIN_CHECK]: (state, action) => produce(state, (draft) => {
      draft.is_login = true;
    }),
    [LOGOUT_CHECK]: (state, action) => produce(state, (draft) => {
      draft.user_info = { nickname: null, profilePic: null };
      draft.is_login = false;
    }),
    [USER_CHECK]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.info;
      draft.is_login = true;
    }),
    [USER_EDIT]: (state, action) => produce(state, (draft) => {
      draft.user_info = action.payload.info;
      draft.is_login = true;
    })
    // [DELETE_USER]: (state, action) =>
    // produce(state, (draft) => {
    //   draft.is_deleted = true;
    //   draft.is_login = false;
    // }),
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
  loginCheck,
  userCheckDB,
  userDeleteDB,
  userEdit,
};

export { actionCreators };
