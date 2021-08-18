import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  // 기본 설정은 span 태그, 만약 p 태그로 사용 원할 시 props 에 p 넘기기
  const {
    p,
    children,
    color,
    fontSize,
    fontWeight,
    margin,
    padding,
    display,
    lineHeight,
    float,
    position,
    _onClick,
    bg,
    height,
    text_align,
    vertical_align,
    top,
    cursor,
    hover,
    letterSpacing,
    wordWrap,
    wlc, // -webkit-line-clamp: 콘텐츠 줄 수 제한
    wbo, // -webkit-box-orient: 콘텐츠 정렬 방향
    overflow,
    // 태블릿 사이즈(width: 768px)
    TABfontSize,
    TABmargin,
    TABlineHeight,
    TABtop,
    TABwbo,
    TABwlc,
    TABwordWrap,
    TABoverflow,
  } = props;

  const styles = {
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    margin: margin,
    padding: padding,
    display: display,
    position: position,
    lineHeight: lineHeight,
    float: float,
    bg: bg,
    height: height,
    text_align: text_align,
    vertical_align: vertical_align,
    top: top,
    cursor: cursor,
    hover: hover,
    letterSpacing: letterSpacing,
    wordWrap: wordWrap,
    wlc: wlc,
    wbo: wbo,
    overflow: overflow,
    TABfontSize: TABfontSize,
    TABmargin: TABmargin,
    TABlineHeight: TABlineHeight,
    TABtop: TABtop,
    TABwbo: TABwbo,
    TABwlc: TABwlc,
    TABwordWrap: TABwordWrap,
    TABoverflow: TABoverflow,
  };

  if (p) {
    return (
      <React.Fragment>
        <TextBoxP {...styles} onClick={_onClick}>
          {children}
        </TextBoxP>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <TextBoxS {...styles} onClick={_onClick}>
          {children}
        </TextBoxS>
      </React.Fragment>
    );
  }
};

Text.defaultProps = {
  p: false,
  children: null,
  fontSize: '1rem',
  fontWeight: '400',
  margin: null,
  padding: null,
  display: null,
  position: null,
  lineHeight: null,
  float: null,
  bg: null,
  height: null,
  text_align: null,
  vertical_align: null,
  top: null,
  _onClick: () => {},
};

const TextBoxP = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  position: ${(props) => props.position};
  line-height: ${(props) => props.lineHeight};
  float: ${(props) => props.float};
  background-color: ${(props) => props.bg};
  height: ${(props) => props.height};
  text-align: ${(props) => props.text_align};
  vertical-align: ${(props) => props.vertical_align};
  top: ${(props) => props.top};
  cursor: ${(props) => props.cursor};
  &:hover {
    ${(props) => props.hover};
  }
  letter-spacing: ${(props) => props.letterSpacing};
  word-wrap: ${(props) => props.wordWrap};
  -webkit-line-clamp: ${(props) => props.wlc};
  -webkit-box-orient: ${(props) => props.wbo};
  overflow: ${(props) => props.overflow};
  // 태블릿 사이즈(width: 768px)
  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: ${(props) => props.TABfontSize};
    margin: ${(props) => props.TABmargin};
    line-height: ${(props) => props.TABlineHeight};
    top: ${(props) => props.TABtop};
    word-wrap: ${(props) => props.TABwordWrap};
    -webkit-line-clamp: ${(props) => props.TABwlc};
    -webkit-box-orient: ${(props) => props.TABwbo};
    overflow: ${(props) => props.TABoverflow};
  }
`;

const TextBoxS = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  position: ${(props) => props.position};
  line-height: ${(props) => props.lineHeight};
  float: ${(props) => props.float};
  background-color: ${(props) => props.bg};
  height: ${(props) => props.height};
  text-align: ${(props) => props.text_align};
  vertical-align: ${(props) => props.vertical_align};
  top: ${(props) => props.top};
  cursor: ${(props) => props.cursor};
  &:hover {
    ${(props) => props.hover};
  }
  letter-spacing: ${(props) => props.letterSpacing};
  word-wrap: ${(props) => props.wordWrap};
  -webkit-line-clamp: ${(props) => props.wlc};
  -webkit-box-orient: ${(props) => props.wbo};
  overflow: ${(props) => props.overflow};
  // 태블릿 사이즈(width: 768px)
  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: ${(props) => props.TABfontSize};
    margin: ${(props) => props.TABmargin};
    line-height: ${(props) => props.TABlineHeight};
    top: ${(props) => props.TABtop};
    word-wrap: ${(props) => props.TABwordWrap};
    -webkit-line-clamp: ${(props) => props.TABwlc};
    -webkit-box-orient: ${(props) => props.TABwbo};
    overflow: ${(props) => props.TABoverflow};
  }
`;

export default Text;
