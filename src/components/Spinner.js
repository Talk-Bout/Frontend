import React from 'react';
import styled from 'styled-components';
import { Spinner_iris, Spinner_web } from '../image';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  if (!props.visible) {
    return (
      <></>
    );
  };

  return (
    <React.Fragment>
      <Div>
        <SpinnerImg src={Spinner_web} />
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
`;

export default Spinner;