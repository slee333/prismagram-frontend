import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

// 피드를 위한 모든 데이터들을 불러옵니다.
const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

// 마찬가지로 Wrapper를 이용해 모든걸 가운데 위치시킵니다.
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  // 상단에 FEED_QUERY에서 정의한 query의 결과값을 react-apollo-hooks에서 제공하는 useQuery를 이용해 불러옵니다.
  // return 되는 객체들은 data (query 결과값)와 loading (로딩중인지 아닌지)입니다.
  // 로딩중일땐 Loader.js를 불러옵니다.

  // data.seedFeed.map(post => ...) 를 통해서 데이터 내에 존재하는 모든 post 데이터들을 
  // 피드에 표시해줍니다.
  const { data, loading } = useQuery(FEED_QUERY); 
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
