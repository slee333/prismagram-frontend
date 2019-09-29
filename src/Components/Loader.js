import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

// 로딩 중일 때 넣는 로더!

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
`;

// Logo는 인스타그램 로고이고, 거기다 애니메이션을 1초간격으로 지정한다음 무한반복시키는 단순한 loader입니다.
export default () => (
  <Loader>
    <Logo size={36} />
  </Loader>
);
