import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    children,
    _onClick,
    is_center,
    is_left,
    is_right,
    is_flex,
    flexWrap,
    width,
    height,
    margin,
    padding,
    backgroundColor,
    backgroundImageUrl,
    top,
    right,
    bottom,
    left,
    position,
    display,
    flexDirection,
    minHeight,
    minWidth,
    boxShadow,
    border,
    borderStyle,
    borderRadius,
    borderColor,
    hover,
    active,
    float,
    overflow,
    flex,
    justifyContent,
    fontSize,
    alignItems,
    verticalAlign,
    fontWeight,
    borderBottom,
    borderTop,
    zIndex,
    borderCollapse,
    alignSelf,
    cursor,
    opacity,
    userSelect,
    wordBreak,
    // 태블릿 사이즈(width: 768px~1150px)
    TABheight,
    TABwidth,
    TABmargin,
    TABpadding,
    TABdisplay,
    TABopacity,
    TABminHeight,
    TABtop,
    TABbottom,
    // 모바일 사이즈(width: ~767px)
    MOBdisplay,
    MOBheight,
    MOBwidth,
    MOBmargin,
    MOBpadding,
    MOBjustifyContent,
    MOBbackgroundColor,
    MOBborderBottom,
    MOBtop,
    MOBbottom,
    MOBopacity,
    MOBminHeight,
  } = props;

  const styles = {
    is_center: is_center, // 가운데 정렬
    is_left: is_left, // 왼쪽 정렬
    is_right: is_right, // 오른쪽 정렬
    is_flex: is_flex,
    flexWrap: flexWrap,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    backgroundColor: backgroundColor,
    backgroundImageUrl: backgroundImageUrl, // 배경 이미지 있을 경우 url
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    position: position,
    display: display,
    flexDirection: flexDirection,
    minWidth: minWidth,
    minHeight: minHeight,
    boxShadow: boxShadow, // 그림자
    border: border,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    borderColor: borderColor,
    hover: hover, // 마우스 올렸을 때 효과
    active: active, // 마우스 클릭 시 효과
    float: float,
    overflow: overflow,
    flex: flex,
    justifyContent: justifyContent,
    fontSize: fontSize,
    alignItems: alignItems,
    verticalAlign: verticalAlign,
    fontWeight: fontWeight,
    borderBottom: borderBottom,
    zIndex: zIndex,
    borderTop: borderTop,
    borderCollapse: borderCollapse,
    alignSelf: alignSelf,
    cursor: cursor,
    opacity: opacity,
    userSelect: userSelect,
    wordBreak: wordBreak,
    // 태블릿 사이즈(width: ~1150px)
    TABheight: TABheight,
    TABwidth: TABwidth,
    TABmargin: TABmargin,
    TABpadding: TABpadding,
    TABdisplay: TABdisplay,
    TABopacity: TABopacity,
    TABminHeight: TABminHeight,
    TABtop: TABtop,
    TABbottom: TABbottom,
    // 모바일 사이즈(width: ~767px)
    MOBdisplay: MOBdisplay,
    MOBheight: MOBheight,
    MOBwidth: MOBwidth,
    MOBmargin: MOBmargin,
    MOBpadding: MOBpadding,
    MOBjustifyContent: MOBjustifyContent,
    MOBbackgroundColor: MOBbackgroundColor,
    MOBborderBottom: MOBborderBottom,
    MOBtop: MOBtop,
    MOBbottom: MOBbottom,
    MOBopacity: MOBopacity,
    MOBminHeight: MOBminHeight,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  _onClick: () => { },
  width: '100%',
};

const GridBox = styled.div`
  ${(props) => props.is_center ? `display: block; text-align: center; align-items: center; justify-content: space-between` : ''};
  ${(props) => props.is_left ? `display: block; align-items: center; text-align: left;` : ''};
  ${(props) => props.is_right ? `display: block; align-items: center; text-align: right;` : ''};
  ${(props) => props.is_flex ? `display: block; align-items: center; text-align: center;` : ''};
  font-weight: ${(props) => props.fontWeight};
  vertical-align: ${(props) => props.verticalAlign};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  justify-content: ${(props) => props.justifyContent};
  flex: ${(props) => props.flex};
  flex-wrap: ${(props) => props.wrap};
  float: ${(props) => props.float};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  ${(props) => props.backgroundColor ? `background-color: ${props.backgroundColor}` : ''};
  ${(props) => props.backgroundImageUrl ? `background-image: url(${props.backgroundImageUrl});` : ''};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  position: ${(props) => props.position};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  box-sizing: border-box;
  box-shadow: ${(props) => props.boxShadow};
  border: ${(props) => props.border};
  border-style: ${(props) => props.borderStyle};
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) => props.borderColor};
  overflow: ${(props) => props.overflow};
  font-size: ${(props) => props.fontSize};
  ${(props) => (props.hover ? `&:hover {${props.hover}}` : '')}
  ${(props) => (props.hover ? `&:active {${props.active}}` : '')}
  border-bottom: ${(props) => props.borderBottom};
  z-index: ${(props) => props.zIndex};
  border-top: ${(props) => props.borderTop};
  border-collapse: ${(props) => props.borderCollapse};
  cursor: ${(props) => props.cursor};
  opacity: ${(props) => props.opacity};
  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: ${(props) => props.userSelect ? props.userSelect : 'none'};
  word-break: ${(props) => props.wordBreak};
  // 태블릿 사이즈(width: ~1150px)
  @media screen and (max-width: 1150px) {
    height: ${(props) => props.TABheight};
    width: ${(props) => props.TABwidth};
    margin: ${(props) => props.TABmargin};
    padding: ${(props) => props.TABpadding};
    display: ${(props) => props.TABdisplay};
    opacity: ${(props) => props.TABopacity};
    min-height: ${(props) => props.TABminHeight};
    top: ${(props) => props.TABtop};
    bottom: ${(props) => props.TABbottom};
  }
  // 모바일 사이즈(width: ~767px)
  @media screen and (max-width: 767px) {
    display: ${(props) => props.MOBdisplay};
    height: ${(props) => props.MOBheight};
    width: ${(props) => props.MOBwidth};
    margin: ${(props) => props.MOBmargin};
    padding: ${(props) => props.MOBpadding};
    justify-content: ${(props) => props.MOBjustifyContent};
    background-color: ${(props) => props.MOBbackgroundColor};
    border-bottom: ${(props) => props.MOBborderBottom};
    top: ${(props) => props.MOBtop};
    bottom: ${(props) => props.MOBbottom};
    opacity: ${(props) => props.MOBopacity};
    min-height: ${(props) => props.MOBminHeight};
  }
`;

export default Grid;
