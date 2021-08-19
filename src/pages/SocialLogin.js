import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '../elements';
import { Spinner_iris } from '../image';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const SocialLogin = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(userActions.kakaoLogin());
    dispatch(userActions.googleLogin());
  }, []);

  return (
    <React.Fragment>
      <Grid is_center height='100vh' lineHeight='85vh'>
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