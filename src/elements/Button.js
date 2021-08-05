import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {
    children,
    text,
    bg,
    width,
    height,
    margin,
    _onClick,
    border_radius,
    cursor,
    border,
    color,
    font_size,
    display,
    padding,
    text_align,
    float,
    fontWeight,

  } = props;

  const styles = {
    bg: bg,
    width: width,
    height: height,
    margin: margin,
    border_radius: border_radius,
    cursor: cursor,
    border: border,
    color: color,
    font_size: font_size,
    display: display,
    padding: padding,
    text_align: text_align,
    float: float,
    fontWeight: fontWeight,

  };
  return (
    <React.Fragment>
      <ElButton {...styles} text={text} onClick={_onClick}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  text: false,
  bg: '#BCBCBC',
  width: '100%',
  height: '100%',
  margin: null,
  _onClick: () => {},
  border_radius: '0px',
  cursor: 'pointer',
  border: null,
  color: null,
  font_size: null,
  display: null,
  padding: null,
  text_align: null,
  float: null,
  fontWeight: null,

};

const ElButton = styled.button`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.border_radius};
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  font-size: ${(props) => props.font_size};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.text_align};
  float: ${(props) => props.float};
  font-weight: ${(props) => props.fontWeight};

`;

export default Button;
