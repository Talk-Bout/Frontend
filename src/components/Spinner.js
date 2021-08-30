import React from 'react';
import styled from 'styled-components';
import { Spinner_web } from '../image';
import PropTypes from 'prop-types';

const Spinner = (props) => {

  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  if (!props.visible) {
    return (
      <></>
    );
  };

  return (
    <React.Fragment>
      <Div>
        <SpinnerImg src={Spinner_web} windowHeight={height} />
      </Div>
    </React.Fragment>
  )
};

Spinner.propTypes = {
  visible: PropTypes.bool
}

const Div = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  height: ${(props) => props.windowHeight};
  line-height: 85vh;
  text-align: center;
  background: #17181B;
  z-index: 100;
  overflow: hidden;
`;

const SpinnerImg = styled.img`
  vertical-align: middle;
  width: 250px;
  height: 250px;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

export default Spinner;