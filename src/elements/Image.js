import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const {
    width,
    height,
    maxWidth,
    maxHeight,
    shape,
    src,
    cursor,
    margin,
    padding,
    alignItems,
    _onClick,
    borderRadius,
    display,
    //태블릿 사이즈(768px~1090px)
    TABwidth,
    TABheight,
    TABmargin,
    //모바일 사이즈(~767px)
    MOBwidth,
    MOBheight,
    MOBmargin,
  } = props;

  const styles = {
    width: width,
    height: height,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    src: src,
    cursor: cursor,
    margin: margin,
    padding: padding,
    alignItems: alignItems,
    borderRadius: borderRadius,
    display: display,
    //태블릿 사이즈(768px~1090px)
    TABwidth: TABwidth,
    TABheight: TABheight,
    TABmargin: TABmargin,
    //모바일 사이즈(~767px)
    MOBwidth: MOBwidth,
    MOBheight: MOBheight,
    MOBmargin: MOBmargin,
  };

  if (shape === 'BigProfileImage') {
    return <BigProfileImage {...styles} onClick={_onClick}></BigProfileImage>;
  }

  if (shape === 'HeaderLogo') {
    return <HeaderLogo {...styles} onClick={_onClick}></HeaderLogo>;
  }

  if (shape === 'CircleLogo') {
    return <CircleLogo {...styles} onClick={_onClick}></CircleLogo>;
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles} onClick={_onClick}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: 'circle',
  src: '',
  _onClick: () => { },
};

// default로 프로필 이미지 입니다
const ImageDefault = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  cursor: ${(props) => props.cursor};
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-repeat: no-repeat;
  align-items: ${(props) => props.alignItems};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  display: ${(props) => props.display};
  // 태블릿 사이즈(768~1090px)
  @media screen and (max-width: 1090px) {
    width: ${(props) => props.TABwidth};
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
  // 모바일 사이즈(~768px)
  @media screen and (max-width: 767px) {
    width: ${(props) => props.MOBwidth};
    height: ${(props) => props.MOBheight};
    margin: ${(props) => props.MOBmargin};
  }
`;

// 마이페이지(정보수정) 프로필 이미지
const BigProfileImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-size: cover;
  background-position: 50% 50%; // 이미지의 중간 부분이 보이게
  background-color: #eee; // 이미지 안 뜨는 경우 배경색
  border-radius: 2.5vh;
  background-image: url('${(props) => props.src}');
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  // 태블릿 사이즈(768~1090px)
  @media screen and (max-width: 1090px) {
    width: ${(props) => props.TABwidth};
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
  // 모바일 사이즈(~768px)
  @media screen and (max-width: 767px) {
    width: ${(props) => props.MOBwidth};
    height: ${(props) => props.MOBheight};
    margin: ${(props) => props.MOBmargin};
  }
`;

// bootReview(MainBoot) 캠프 로고 이미지
const HeaderLogo = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-width: 150px;
  border: 1px solid #5f6368;
  align-items: center;
  text-align: center;
  // 태블릿 사이즈(768~1090px)
  @media screen and (max-width: 1090px) {
    width: ${(props) => props.TABwidth};
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
  // 모바일 사이즈(~768px)
  @media screen and (max-width: 767px) {
    width: ${(props) => props.MOBwidth};
    height: ${(props) => props.MOBheight};
    margin: ${(props) => props.MOBmargin};
  }
`;

// 메인페이지 circle 캠프 로고 이미지
const CircleLogo = styled.div`
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-color: #3c4043;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  // 태블릿 사이즈(768~1090px)
  @media screen and (max-width: 1090px) {
    width: ${(props) => props.TABwidth};
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
  // 모바일 사이즈(~768px)
  @media screen and (max-width: 767px) {
    width: ${(props) => props.MOBwidth};
    height: ${(props) => props.MOBheight};
    margin: ${(props) => props.MOBmargin};
  }
`;

export default Image;
