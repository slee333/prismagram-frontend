import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = size => {
  let number;
  if (size === "sm") {
    number = 30;
  } else if (size === "md") {
    number = 50;
  } else if (size === "md-lg") {
    number = 80;
  } else if (size === "lg") {
    number = 150;
  }
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const Container = styled.div`
  ${props => getSize(props.size)}
  background-image:url(${props => props.url});
  background-size:cover;
  border-radius:50%;
`;

const Background = styled.div`
  ${props => getSize(props.size)}
  background-size:cover;
  background-color: ${props => props.background}
  border-radius:50%;
  margin-top: ${props => String(props.topMargin) + "px"}
`;

const Avatar = ({
  size = "sm",
  url,
  className,
  background = "transparent",
  topMargin = 0
}) => (
  <Background className={className} size={size} background={background} topMargin={topMargin}>
    <Container className={className} size={size} url={url} />
  </Background>
);

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "md-lg", "lg"]),
  url: PropTypes.string.isRequired,
  background: PropTypes.string,
  topMargin: PropTypes.number
};

export default Avatar;
