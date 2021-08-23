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
    height,
    textAlign,
    verticalAlign,
    top,
    cursor,
    hover,
    active,
    letterSpacing,
    wordWrap,
    wlc, // -webkit-line-clamp: 콘텐츠 줄 수 제한
    wbo, // -webkit-box-orient: 콘텐츠 정렬 방향
    overflow,
    // 태블릿 사이즈(width: ~1090px)
    TABfontSize,
    TABmargin,
    TABlineHeight,
    TABtop,
    TABwbo,
    TABwlc,
    TABwordWrap,
    TABoverflow,
    TABtextAlign,
    TABheight,
    // 모바일 사이즈(width: ~767px)
    MOBfontSize,
    MOBmargin,
    MOBlineHeight,
    MOBwlc,
    MOBwbo,
    MOBoverflow,
    MOBtextAlign,
    MOBheight,
    MOBdisplay,
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
    height: height,
    textAlign: textAlign,
    verticalAlign: verticalAlign,
    top: top,
    cursor: cursor,
    hover: hover,
    active: active,
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
    TABtextAlign: TABtextAlign,
    TABheight: TABheight,
    MOBfontSize: MOBfontSize,
    MOBmargin: MOBmargin,
    MOBlineHeight: MOBlineHeight,
    MOBwlc: MOBwlc,
    MOBwbo: MOBwbo,
    MOBoverflow: MOBoverflow,
    MOBtextAlign: MOBtextAlign,
    MOBheight: MOBheight,
    MOBdisplay: MOBdisplay,
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
  _onClick: () => { },
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
  height: ${(props) => props.height};
  text-align: ${(props) => props.textAlign};
  vertical-align: ${(props) => props.verticalAlign};
  top: ${(props) => props.top};
  cursor: ${(props) => props.cursor};
  &:hover {
    ${(props) => props.hover};
  }
  &:active {
    ${(props) => props.active};
  }
  letter-spacing: ${(props) => props.letterSpacing};
  word-wrap: ${(props) => props.wordWrap};
  -webkit-line-clamp: ${(props) => props.wlc};
  -webkit-box-orient: ${(props) => props.wbo};
  overflow: ${(props) => props.overflow};
  // 태블릿 사이즈(width: 768px~1090px)
  @media screen and (max-width: 1090px) {
    font-size: ${(props) => props.TABfontSize};
    margin: ${(props) => props.TABmargin};
    line-height: ${(props) => props.TABlineHeight};
    top: ${(props) => props.TABtop};
    word-wrap: ${(props) => props.TABwordWrap};
    -webkit-line-clamp: ${(props) => props.TABwlc};
    -webkit-box-orient: ${(props) => props.TABwbo};
    overflow: ${(props) => props.TABoverflow};
    text-align: ${(props) => props.TABtextAlign};
    height: ${(props) => props.TABheight};
  }
    // 모바일 사이즈(width: ~767px)
    @media screen and (max-width: 767px) {
    font-size: ${(props) => props.MOBfontSize};
    margin: ${(props) => props.MOBmargin};
    line-height: ${(props) => props.MOBlineHeight};
    -webkit-line-clamp: ${(props) => props.MOBwlc};
    -webkit-box-orient: ${(props) => props.MOBwbo};
    overflow: ${(props) => props.MOBoverflow};
    text-align: ${(props) => props.MOBtextAlign};
    height: ${(props) => props.MOBheight};
    display: ${(props) => props.MOBdisplay};
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
  height: ${(props) => props.height};
  text-align: ${(props) => props.textAlign};
  vertical-align: ${(props) => props.verticalAlign};
  top: ${(props) => props.top};
  cursor: ${(props) => props.cursor};
  &:hover {
    ${(props) => props.hover};
  }
  &:active {
    ${(props) => props.active};
  }
  letter-spacing: ${(props) => props.letterSpacing};
  word-wrap: ${(props) => props.wordWrap};
  -webkit-line-clamp: ${(props) => props.wlc};
  -webkit-box-orient: ${(props) => props.wbo};
  overflow: ${(props) => props.overflow};
  // 태블릿 사이즈(width: 768px~1090px)
  @media screen and (max-width: 1090px) {
    font-size: ${(props) => props.TABfontSize};
    margin: ${(props) => props.TABmargin};
    line-height: ${(props) => props.TABlineHeight};
    top: ${(props) => props.TABtop};
    word-wrap: ${(props) => props.TABwordWrap};
    -webkit-line-clamp: ${(props) => props.TABwlc};
    -webkit-box-orient: ${(props) => props.TABwbo};
    overflow: ${(props) => props.TABoverflow};
    text-align: ${(props) => props.TABtextAlign};
    height: ${(props) => props.TABheight};
  }
  // 모바일 사이즈(width: ~767px)
  @media screen and (max-width: 767px) {
    font-size: ${(props) => props.MOBfontSize};
    margin: ${(props) => props.MOBmargin};
    line-height: ${(props) => props.MOBlineHeight};
    -webkit-line-clamp: ${(props) => props.MOBwlc};
    -webkit-box-orient: ${(props) => props.MOBwbo};
    overflow: ${(props) => props.MOBoverflow};
    text-align: ${(props) => props.MOBtextAlign};
    height: ${(props) => props.MOBheight};
    display: ${(props) => props.MOBdisplay};
  }
`;

export default Text;
