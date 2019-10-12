import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Button from "../../Components/Button";

import Login from "../../Components/Chat/Login";
import Chat from "../../Components/Chat/Chat";


const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ loading, data }) => {
  if (loading === true) {
    // 로딩중이라면 로딩화면!
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeRoom) {
    // 로딩도 완료되고, 데이터도 넘어왔고 한다면 사용자의 프로필을 만들어줍니다.
    const {
      seeRoom: {
        id,
        participants,
        messages,
        createdAt,
        updatedAt
      }
    } = data;
    console.log(data)
    return (
      <Wrapper>
      <Header>
     
      <Button
                onClick={() => {
                  console.log("I'm Youurs");
                }}
                text="Your HP"
              />

        </Header>
      </Wrapper>
    );
  }
  return null;
};

