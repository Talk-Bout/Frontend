import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { shape, src, size, cursor, margin, padding, align_items, _onClick } = props;

  const styles = {
    src: src,
    size: size,
    cursor: cursor,
    margin: margin,
    padding: padding,
    align_items: align_items,
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
  src: 'https://previews.123rf.com/images/imagevectors/imagevectors1603/imagevectors160300845/53026883-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%8F%99%EA%B7%B8%EB%9D%BC%EB%AF%B8%EC%97%90-%ED%8F%89%EB%A9%B4-%EA%B2%80%EC%9D%80-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%94%84%EB%A1%9C%ED%95%84-%EC%9B%B9-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
  _onClick: () => {},
  cursor: '',
  size: null,
  margin: null,
  padding: null,
  align_items: null,
};

// default로 프로필 이미지 입니다
const ImageDefault = styled.div`
  --size: ${(props) => props.size}vw;
  width: var(--size);
  height: var(--size);
  cursor: ${(props) => props.cursor};
  background-image: url('${(props) => props.src}');
  background-size: cover;
  align-items: ${(props) => props.align_items};
  margin: ${(props) => props.margin};
`;

// 마이페이지(정보수정) 프로필 이미지
const BigProfileImage = styled.div`
  --size: ${(props) => props.size}vw; 
  width: var(--size);
  height: var(--size);
  background-size: cover;
  background-position: 50% 50%; // 이미지의 중간 부분이 보이게
  background-color: #eee; // 이미지 안 뜨는 경우 배경색
  border-radius: 2.5vh;
  background-image: url('${(props) => props.src}');
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

// bootReview(MainBoot) 캠프 로고 이미지
const HeaderLogo = styled.div`
  --size: ${(props) => props.size}vw; 
  height: var(--size);
  width: var(--size);
  min-width: 150px;
  border: 1px solid #5F6368;
  align-items: center;
  text-align: center;
`;

// 메인페이지 circle 캠프 로고 이미지
const CircleLogo = styled.div`
  /* width: var(--size);
  height: var(--size);
  cursor: ${(props) => props.cursor};
  background-size: cover;
  background-image: url('${(props) => props.src}');
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding}; */
  background-color: #3C4043;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
`;

export default Image;
