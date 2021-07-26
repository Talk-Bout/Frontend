import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const {children, text, bg, width, height, margin, _onClick, border_radius} = props;

    const styles = {
        bg: bg,
        width: width,
        height: height,
        margin: margin,
        border_radius: border_radius,
    }
    return (
        <React.Fragment>
            <ElButton {...styles}
            text={text}
            onClick={_onClick}
            >{children}</ElButton>
        </React.Fragment>
    )
}

Button.defaultProps = {
    children: null,
    text: false,
    bg: "#BCBCBC",
    width: "100%",
    height: "100%",
    margin: "auto",
    _onClick: () => {},
    border_radius: "0px",
}

const ElButton = styled.button`
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bg};
    border-radius: ${(props) => props.border_radius};
`;

export default Button;