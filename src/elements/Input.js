import React from 'react';
import styled from 'styled-components';

const Input = (props) => {

  const {
    multiLine,
    placeholder,
    type,
    width,
    border_radius,
    border,
    _onChange,
    bg,
    font_size,
    outline,
    margin,
    _ref,
    onSubmit,
    padding,
    height, color,
  } = props;


    const styles = {
        width: width,
        border_radius: border_radius,
        border: border,
        bg: bg,
        font_size: font_size,
        outline: outline,
        margin: margin,
        _ref: _ref,
        height: height,
        color: color,
      padding: padding,
        
    }

  if (multiLine) {
    return (
      <ElTextarea
        {...styles}
        type={type}
        rows={5}
        placeholder={placeholder}
        onChange={_onChange}
        ref={_ref}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onsubmit(e);
          }
        }}
      ></ElTextarea>
    );
  }
  return (
    <React.Fragment>
      <ElInput
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        ref={_ref}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e);
          }
        }}
      />
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  placeholder: '텍스트를 입력해주세요',
  type: 'text',
  width: '90%',
  border_radius: '',
  border: '1px solid black',
  _onChange: () => {},
  onSubmit: () => {},
  bg: null,
  font_size: null,
  outline: null,
  margin: null,
  padding: null,
  height: null,
  color: null,
 
  // is_submit: false,
  // onSubmit: () => {} // form 태그 안에서 전송전 입력된 데이터의 유효성 체크
};

const ElTextarea = styled.textarea`
  font-size: ${(props) => props.font_size};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.border_radius};
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  outline:${(props) => props.outline};
  color: ${(props) => props.color};
  resize: none;
`;

const ElInput = styled.input`
  font-size: ${(props) => props.font_size};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.border_radius};
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.padding};
  height: ${(props) => props.height};
  outline: ${(props) => props.outline};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
`;

export default Input;
