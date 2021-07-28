import React from "react";
import styled from "styled-components";

const Text = (props) => {
  // 기본 설정은 span 태그, 만약 p 태그로 사용 원할 시 props 에 p 넘기기

    const { p, children, color, fontSize, fontWeight, margin, padding, display, lineHeight, float, position, bg, height, text_align, vertical_align } = props;

    const styles = {color: color, fontSize: fontSize, fontWeight: fontWeight, margin: margin, padding: padding, display: display, position: position, lineHeight: lineHeight, float: float, bg: bg, height: height, text_align: text_align, vertical_align: vertical_align,};


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
    position: null,
    lineHeight: null,
    float: null,
    bg: null,
    height: null,
    text_align: null,
    vertical_align: null,

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
    background-color: ${(props) => props.bg};
    height: ${(props) => props.height};
    vertical-align: ${(props) => props.vertical_align};

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
    background-color: ${(props) => props.bg};
    height: ${(props) => props.height};
    text-align: ${(props) => props.text_align};
    vertical-align: ${(props) => props.vertical_align};

  `;

export default Text;