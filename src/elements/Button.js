import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {children, backgroundColor, width, height, margin, _onClick, borderRadius, cursor, border, display, padding, float,} = props;

  const styles = {
    backgroundColor: backgroundColor,
    width: width,
    height: height,
    margin: margin,
    borderRadius: borderRadius,
    cursor: cursor,
    border: border,
    display: display,
    padding: padding,
    float: float,
  };

  return (
    <React.Fragment>
      <Btn {...styles} onClick={_onClick}>
        {children}
      </Btn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  margin: 0,
  _onClick: () => {},
};

const Btn = styled.button`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  float: ${(props) => props.float};
`;

export default Button;
