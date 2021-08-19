import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const KakaoLogin = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(userActions.kakaoLogin());
    dispatch(userActions.googleLogin());
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>구글 로그인이 잘 되고 있습니다</h1>
      </div>
    </React.Fragment>
  )
};

export default KakaoLogin;