import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Input from "./Input";
import useInput from "../Hooks/useInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const onSearchSubmit = e => {
    // * Search를 눌렀을 때, `/search?term=${search.value}`로 갑니다. 
    // Search component를 불러오는거죠.
    // 근데 이 과정에서 페이지가 새로고침되길 우린 원하지 않으니 e.preventDefault();를 해줍니다.
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };


export default () => {
  const search = useInput("");
  return (
    <Wrapper>
      <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
    </Wrapper>
  );
};
