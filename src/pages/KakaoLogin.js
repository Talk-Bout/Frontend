import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const KakaoLogin = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.kakaoLogin());
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>카카오 로그인</h1>
      </div>
    </React.Fragment>
  )
};

export default KakaoLogin;