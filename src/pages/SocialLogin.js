import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { Spinner_iris } from '../image';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/ConfigureStore';

const SocialLogin = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const provider_URL = new URL(window.location.href).searchParams.get('provider');
    if (provider_URL === 'google') {
      dispatch(userActions.googleLogin());
    } else if (provider_URL === 'kakao') {
      dispatch(userActions.kakaoLogin());
    } else {
      window.alert('예기치 못한 오류가 발생했습니다! 메인페이지로 돌아갑니다 :(');
      history.push('/');
    }
  }, []);

  return (
    <React.Fragment>
      <Grid is_center height='100vh' lineHeight='85vh' backgroundColor='#17181B'>
        <SpinnerImg src={Spinner_iris} />
      </Grid>
    </React.Fragment>
  )
};

const SpinnerImg = styled.img`
  margin-top: 25vh;
  vertical-align: middle;
`;

export default SocialLogin;