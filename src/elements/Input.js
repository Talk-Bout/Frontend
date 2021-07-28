import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const {
    placeholder,
    type,
    width,
    border_radius,
    border,
    _onChange,
    bg,
    multiLine,
  } = props;

  const styles = {
    width: width,
    border_radius: border_radius,
    border: border,
    bg: bg,
  };

  if (multiLine) {
    return (
      <ElTextarea
        {...styles}
        type={type}
        rows={5}
        placeholder={placeholder}
        onChange={_onChange}
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
  bg: null,
  // is_submit: false,
  // onSubmit: () => {} // form 태그 안에서 전송전 입력된 데이터의 유효성 체크
};

const ElTextarea = styled.textarea`
  font-size: 15px;
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.border_radius};
  background-color: ${(props) => props.bg};
  padding: 2%;
`;

const ElInput = styled.input`
  font-size: 15px;
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.border_radius};
  background-color: ${(props) => props.bg};
  padding: 2%;
`;

export default Input;
