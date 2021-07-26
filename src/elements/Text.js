import React from "react";
import styled from "styled-components";

const Text = (props) => {
  // 기본 설정은 span 태그, 만약 p 태그로 사용 원할 시 props 에 p 넘기기

    const { p, children, color, fontSize, fontWeight, margin, padding, display } = props;

    const styles = {color: color, fontSize: fontSize, fontWeight: fontWeight, margin: margin, padding: padding, display: display};

    if (p) {                                     
      return (                                  
        <React.Fragment>
            <TextBoxP {...styles}>{children}</TextBoxP>
        </React.Fragment>
    )  
    } else {
      return (
        <React.Fragment>
            <TextBoxS {...styles}>{children}</TextBoxS>
        </React.Fragment>
      )
    }
}

Text.defaultProps = {
    p: false,
    children: null,
    color: 'black',
    fontSize: '1rem',
    fontWeight: '400',
    margin: null,
    padding: null,
    display: null,
  };
  
  const TextBoxP = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    display: ${(props) => props.display};
  `;

  const TextBoxS = styled.span`
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    display: ${(props) => props.display};
  `;

export default Text;