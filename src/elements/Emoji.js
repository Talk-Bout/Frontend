import React from 'react';
import styled from 'styled-components';

const Emoji = (props) => {
  const {height, src, TABheight, alt, margin, TABmargin, } = props;
  const styles = {
    height: height,
    TABheight: TABheight,
    margin: margin,
    TABmargin: TABmargin,
  }

  return (
    <Img src={src} alt={alt} {...styles} />
  )
};

const Img = styled.img`
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: ${(props) => props.TABheight};
    margin: ${(props) => props.TABmargin};
  }
`;

export default Emoji;