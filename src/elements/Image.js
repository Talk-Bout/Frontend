import React from 'react';
import styled from "styled-components";

const Image = (props) => {

  const { shape, src, size, cursor, margin, padding} = props;

  const styles = {
    src: src,
    size: size,
    cursor: cursor,
    margin: margin,
    padding: padding,

  };


  if (shape === "ProfileImage") {
    return <ProfileImage {...styles}></ProfileImage>;
  }

  if (shape === "BigProfileImage") {
    return <BigProfileImage {...styles}></BigProfileImage>;
  }

  if (shape === "HeaderLogo") {
    return <HeaderLogo {...styles}></HeaderLogo>;
  }

  if (shape === "CircleLogo") {
    return <CircleLogo {...styles}></CircleLogo>;
  }

  if (shape === "ReviewLogo") {
    return <ReviewLogo {...styles}></ReviewLogo>;
  }

  if (shape === "CampBigLogo") {
    return <CampBigLogo {...styles}></CampBigLogo>;
  }

  if (shape === "CampSmallLogo") {
    return <CampSmallLogo {...styles}></CampSmallLogo>;
  }

  if (shape === "LoginLogo") {
    return <LoginLogo {...styles}></LoginLogo>;
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
  cursor: "",
  size: 36,
  margin: false,
  padding: false,
};

// 기본 이미지
const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  cursor: ${(props) => props.cursor};
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

// 마이페이지 프로필 이미지
const ProfileImage = styled.div`
  position: "absolute";
  width: "72px";
  height: "72px";
  left: "109px";
  top: "56px";
  
  background-image: url("${(props) => props.src}");
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
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
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
`;

// Header 로고 이미지
const HeaderLogo = styled.div`
  position: absolute;
  width: 66px;
  height: 32px;
  left: 363px;
  top: 24px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */

  display: flex;
  align-items: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #121212;

  cursor: ${(props) => props.cursor};
  background-image: url("${(props) => props.src}");
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
`;

// 메인페이지 circle 로고 이미지
const CircleLogo = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  left: 24px;
  top: 22px;
  cursor: ${(props) => props.cursor};
  background-size: cover;
  background-image: url("${(props) => props.src}");
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
`;

// 리뷰페이지 card부분 로고 이미지
const ReviewLogo = styled.div`
position: absolute;
width: 66px;
height: 32px;
left: calc(50% - 66px/2);
top: calc(50% - 32px/2);

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 32px;
/* identical to box height, or 133% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.2px;
text-transform: uppercase;
color: #121212;

background-image: url("${(props) => props.src}");
${(props) => (props.margin ? `margin: ${props.margin}` : "")};
${(props) => (props.padding ? `padding: ${props.padding}` : "")};
`;

// 부트캠프 상세페이지 각 캠프의 로고 이미지
const CampBigLogo = styled.div`
  position: absolute;
  width: 190px;
  height: 112px;
  left: 365px;
  top: 104px;
  background: #FAFAFA;
  
  background-image: url("${(props) => props.src}");
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
`;

// 부트캠프 상세페이지 '다른 부트캠프' circle 이미지
const CampSmallLogo = styled.div`
  position: static;
  width: 80px;
  height: 80px;
  left: 0px;
  top: 0px;

  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 16px;
  
  background-image: url("${(props) => props.src}");
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};

`;

//로그인, 회원가입페이지 로고 이미지
const LoginLogo = styled.div`
  position: absolute;
  width: 87px;
  height: 40px;
  left: 819px;
  top: 288px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  /* identical to box height, or 125% */

  display: flex;
  align-items: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #101010;
  
  background-image: url("${(props) => props.src}");
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
`;

export default Image;