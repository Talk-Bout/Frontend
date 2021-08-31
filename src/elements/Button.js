import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { children, backgroundColor, width, height, margin, _onClick, borderRadius, cursor, border, display, padding, float, TABheight, TABwidth, TABmargin, } = props;

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
    // 태블릿 사이즈(768px~1150px)
    TABheight: TABheight,
    TABwidth: TABwidth,
    TABmargin: TABmargin,
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
  _onClick: () => { },
};

const Btn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
  display: ${(props) => props.display};
  float: ${(props) => props.float};
  // 태블릿 사이즈(768px~1150px)
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: ${(props) => props.TABwidth};
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
`;

export default Button;
