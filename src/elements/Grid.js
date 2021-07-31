import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  // onClick 함수는 _onClick 으로 전달
  // is_center, is_left, is_right 는 세부 단위 지정 없이 넘기기(정렬 방향)

  const {
    children,
    _onClick,
    is_center,
    is_left,
    is_right,
    is_flex,
    flex_wrap,
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
    justify_content,
    fontSize,
    align_items,
    vertical_align,
    fontWeight,
    borderBottom,
    zIndex,
  } = props;

  const styles = {
    is_center: is_center, // 가운데 정렬
    is_left: is_left, // 왼쪽 정렬
    is_right: is_right, // 오른쪽 정렬
    is_flex: is_flex,
    flex_wrap: flex_wrap,
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
    postion: position,
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
    justify_content: justify_content,
    fontSize: fontSize,
    align_items: align_items,
    vertical_align: vertical_align,
    fontWeight: fontWeight,
    borderBottom: borderBottom,
    zIndex: zIndex,
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
  _onClick: () => {},
  is_center: false,
  is_right: false,
  is_left: false,
  is_flex: false,
  flex_wrap: null,
  width: '100%',
  margin: null,
  padding: null,
  backgroundColor: null,
  backgroundImageUrl: null,
  top: null,
  right: null,
  bottom: null,
  left: null,
  position: null,
  display: null,
  flexDirection: null,
  minWidth: null,
  minHeight: null,
  boxShadow: null,
  border: null,
  borderStyle: null,
  borderRadius: null,
  borderColor: null,
  borderBottom: null,
  hover: null,
  active: null,
  float: null,
  overflow: null,
  flex: null,
  justify_content: null,
  fontSize: null,
  align_items: null,
  vertical_align: null,
  fontWeight: null,
};

const GridBox = styled.div`
  ${(props) =>
    props.is_center
      ? `display: block; text-align: center; align-items: center; justify-content:space-between`
      : ''};
  ${(props) =>
    props.is_left
      ? `display: block; align-items: center; text-align: left;`
      : ''};
  ${(props) =>
    props.is_right
      ? `display: block; align-items: center; text-align: right;`
      : ''};
  ${(props) =>
    props.is_flex
      ? `display: block; align-items: center; text-align: center;`
      : ''};
  font-weight: ${(props) => props.fontWeight};
  vertical-align: ${(props) => props.vertical_align};
  align-items: ${(props) => props.align_items};
  justify-content: ${(props) => props.justify_content};
  flex: ${(props) => props.flex};
  flex-wrap: ${(props) => props.wrap};
  float: ${(props) => props.float};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  ${(props) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor};` : ''};
  ${(props) =>
    props.backgroundImageUrl
      ? `background-image: url(${props.backgroundImageUrl});`
      : ''};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  position: ${(props) => props.position};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.fd};
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
`;

export default Grid;
