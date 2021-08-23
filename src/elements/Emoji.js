import React from 'react';
import styled from 'styled-components';

const Emoji = (props) => {
  const { height, src, TABheight, MOBheight, alt, margin, TABmargin, MOBmargin, } = props;
  const styles = {
    height: height,
    TABheight: TABheight,
    MOBheight: MOBheight,
    margin: margin,
    TABmargin: TABmargin,
    MOBmargin: MOBmargin,
  }

  return (
    <Img src={src} alt={alt} {...styles} />
  )
};

const Img = styled.img`
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  @media screen and (max-width: 1090px) {
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
  @media screen and (max-width: 768px) {
    height: ${(props) => props.MOBheight};
    margin: ${(props) => props.MOBmargin};
  }
`;

export default Emoji;