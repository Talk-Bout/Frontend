import React from 'react';
import styled from 'styled-components';
import { Text } from '.';
import { BiCaretUpCircle } from 'react-icons/bi';

const ToTopBtn = (props) => {
  const { _onClick, active, } = props;

  const styles = {
    active: active,
  }

  return (
    <React.Fragment>
      <FloatBtn onClick={_onClick} {...styles}>
        <Text fontSize='32px' MOBfontSize='24px' color='#dadce0'>
          <BiCaretUpCircle />
        </Text>
      </FloatBtn>
    </React.Fragment>
  )
};

ToTopBtn.defaultProps = {
  _onClick: () => { },

};

const FloatBtn = styled.button`
  height: 36px;
  width: 36px;
  border: none;
  border-radius: 32px;
  background-color: #5F6368;
  position: fixed;
  z-index: 10;
  bottom: 10px;
  left: 12px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
  @media screen and (max-width: 767px) {
    height: 48px;
    width: 48px;
    bottom: 70px;
  }
`;

export default ToTopBtn;