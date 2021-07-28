import React from 'react';
import styled from "styled-components";

const Image = (props) => {

  const { 
    shape,
    src,
    size,
    top,
    left,
    width,
    height,
    margin,
    padding,
    display,
    overflow,
    border,
    border_radius,
    flex,
    float,
    position,
    align_items,
    justify_content,
    cursor, 
    background_color,
    background_size,
    background_position,
  } = props;

  const styles = {
    shape: shape,
    size: size,
    src: src,
    top: top,
    left: left,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    display: display,
    overflow: overflow,
    border: border,
    border_radius: border_radius,
    flex: flex,
    float: float,
    position: position,
    align_items: align_items,
    justify_content: justify_content,
    cursor: cursor, 
    background_color: background_color,
    background_size: background_size,
    background_position: background_position,

  };


  if (shape === "circle") {
    return <CircleLogo {...styles}></CircleLogo>;
  }

  if (shape === "rectangle") {
    return <ReviewLogo {...styles}></ReviewLogo>;
  }

  if (shape === "profile") {
    return <ProfileImage {...styles}></ProfileImage>;
  }

  if (shape === "BigProfileImage") {
    return <BigProfileImage {...styles}></BigProfileImage>;
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  )
};

Image.defaultProps = {
  shape: "circle",
  src: "https://previews.123rf.com/images/imagevectors/imagevectors1603/imagevectors160300845/53026883-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%8F%99%EA%B7%B8%EB%9D%BC%EB%AF%B8%EC%97%90-%ED%8F%89%EB%A9%B4-%EA%B2%80%EC%9D%80-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%94%84%EB%A1%9C%ED%95%84-%EC%9B%B9-%EC%95%84%EC%9D%B4%EC%BD%98.jpg",
  _onClick: () => {},
  size: null,
  top: null,
  left: null,
  width: null,
  height: null,
  margin: null,
  padding: null,
  display: null,
  overflow: null,
  border: null,
  border_radius: null,
  flex: null,
  float: null,
  position: null,
  align_items: null,
  justify_content: null,
  cursor: null, 
  background_color: null,
  background_size: null,
  background_position: null,
}; 

// 기본 이미지
const ImageDefault = styled.div`
  size: ${(props) => props.size};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  overflow: ${(props) => props.overflow};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.border_radius};
  flex: ${(props) => props.flex};
  float: ${(props) => props.float};
  position: ${(props) => props.position};
  align-items: ${(props) => props.align_items};
  justify-content: ${(props) => props.justify_content};
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.background_color};
  background-image: url("${(props) => props.src}");
  background-size: ${(props) => props.background_size};
  background-position: ${(props) => props.background_position};
  ${(props) => props.hover ? `&:hover {${props.hover}}` : ''};
  ${(props) => props.hover ? `&:active {${props.active}}` : ''};

`;

// 마이페이지(정보수정) 프로필 이미지
const BigProfileImage = styled.div`
  width: 7rem;
  height: 7rem;
  background-size: cover;
  background-position: 50% 50%;                  // 이미지의 중간 부분이 보이게
  background-color: #eee;                        // 이미지 안 뜨는 경우 배경색
  border-radius: 2.5vh;
  background-image: url("${(props) => props.src}");
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

// 프로필 이미지
const ProfileImage = styled.div`
  size: ${(props) => props.size};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  overflow: ${(props) => props.overflow};
  flex: ${(props) => props.flex};
  float: ${(props) => props.float};
  position: ${(props) => props.position};
  align-items: ${(props) => props.align_items};
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.background_color};
  background-image: url("${(props) => props.src}");
  background-size: ${(props) => props.background_size};
`;

// 메인페이지 circle 로고 이미지
const CircleLogo = styled.div`
  size: ${(props) => props.size};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  overflow: ${(props) => props.overflow};
  flex: ${(props) => props.flex};
  float: ${(props) => props.float};
  position: ${(props) => props.position};
  align-items: ${(props) => props.align_items};
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.background_color};
  background-image: url("${(props) => props.src}");
  background-size: ${(props) => props.background_size};
`;

// 리뷰페이지 card부분 로고 이미지
const ReviewLogo = styled.div`
  size: ${(props) => props.size};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  overflow: ${(props) => props.overflow};
  flex: ${(props) => props.flex};
  float: ${(props) => props.float};
  position: ${(props) => props.position};
  align-items: ${(props) => props.align_items};
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.background_color};
  background-image: url("${(props) => props.src}");
  background-size: ${(props) => props.background_size};
`;


export default Image;