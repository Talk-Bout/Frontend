import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const {
    multiLine,
    placeholder,
    type,
    width,
    borderRadius,
    border,
    _onChange,
    backgroundColor,
    fontSize,
    outline,
    margin,
    _ref,
    onSubmit,
    padding,
    height,
    color,
    _defaultValue,
    rows,
  } = props;


    const styles = {
        width: width,
        borderRadius: borderRadius,
        border: border,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        outline: outline,
        margin: margin,
        _ref: _ref,
        height: height,
        color: color,
      padding: padding,
      _defaultValue: _defaultValue,
      rows: rows,
    }

  if (multiLine) {
    return (
      <Txtarea 
        {...styles}
        type={type}
        rows={rows}
        placeholder={placeholder}
        onChange={_onChange}
        ref={_ref}
        defaultValue={_defaultValue}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e);
          }
        }}
      ></Txtarea>
    );
  }
  return (
    <React.Fragment>
      <Inputarea
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        ref={_ref}
        defaultValue={_defaultValue}
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
  border: '1px solid black',
  _onChange: () => {},
  onSubmit: () => {},
  fontSize: null,
  outline: null,
  margin: null,
  padding: null,
  height: null,
  color: null,
};

const Txtarea = styled.textarea`
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  outline:${(props) => props.outline};
  color: ${(props) => props.color};
  resize: none;
`;

const Inputarea = styled.input`
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => props.padding};
  height: ${(props) => props.height};
  outline: ${(props) => props.outline};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
`;

export default Input;
