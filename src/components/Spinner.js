import React from 'react';
import styled from 'styled-components';
import { Spinner_iris } from '../image';
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
        <SpinnerImg src={Spinner_iris} />
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
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const SpinnerImg = styled.img`
  vertical-align: middle;
`;

export default Spinner;