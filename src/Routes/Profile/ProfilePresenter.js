import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import Post from "../../Components/Post";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

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

const PostsLarge = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const STabs = styled(Tabs)``;
STabs.tabsRole = "Tabs";

const STabList = styled(TabList)`
  height: 58px;
  border-top: 2px solid #efefef;
  display: flex;
`;
STabList.tabsRole = "TabList";

const STab = styled(Tab)`
  width: 100%;
  background-color: ${props => (props.selected ? "#E5E5E5" : "#FAFAFA")};
  cursor: pointer;
  transition: background-color 0.2s linear;
`;
STab.tabsRole = "Tab";

const STabPanel = styled(TabPanel)``;
STabPanel.tabsRole = "TabPanel";

const TabMenu = styled.div`
  position: relative;
  margin: 0 auto;
`;

const TabText = styled.a`
  display: block;
  width: 100%;
  height: 24px;
  margin-top: -1px;
  padding: 16px 0 17px;
  border-top: 1px solid transparent;
  font-size: 16px;
  color: ${props => (props.selected ? "#333" : "#959595")};
  border-color: ${props => (props.selected ? "#333" : "#959595")};
  text-align: center;
  text-decoration: none;
  transition: all 0.2s linear;
`;

export default ({ loading, data, logOut }) => {
  const [currentTab, setCurrentTab] = useState(0);

  if (loading === true) {
    // 로딩중이라면 로딩화면!
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    // 로딩도 완료되고, 데이터도 넘어왔고 한다면 사용자의 프로필을 만들어줍니다.
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
        patientof
      }
    } = data;

    console.log(posts)

    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              {isSelf ? (
                <Button onClick={logOut} text="Log Out" />
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>

        <STabs defaultIndex={0} onSelect={index => setCurrentTab(index)}>
          <TabMenu>
            <STabList>
              <STab selected={currentTab === 0}>
                <TabText selected={currentTab === 0}>내 포스트</TabText>
              </STab>
              <STab selected={currentTab === 1}>
                <TabText selected={currentTab === 1}>내 포스트 (확대)</TabText>
              </STab>
              <STab selected={currentTab === 2}>
                <TabText selected={currentTab === 2}> 병원 소식 </TabText>
              </STab>
            </STabList>
          </TabMenu>
          <div>
            <STabPanel>
              <Posts>
                {posts &&
                  posts.map(post => (
                    <SquarePost
                      key={post.id}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                      file={post.files[0]}
                    />
                  ))}
              </Posts>
            </STabPanel>
            <STabPanel>
              <PostsLarge>
                {posts &&
                  posts.map(post => (
                    <Post
                      key={post.id + "_large"}
                      id={post.id}
                      location={post.location}
                      caption={post.caption}
                      user={{ id, avatar, username }}
                      files={post.files}
                      likeCount={post.likeCount}
                      isLiked={post.isLiked}
                      comments={post.comments}
                      createdAt={post.createdAt}
                    />
                  ))}
              </PostsLarge>
            </STabPanel>
            <STabPanel>
              <PostsLarge>
                {patientof &&
                  patientof.map(hospital => (
                    <>
                      {hospital.posts.map(post => (
                        <Post
                          key={post.id}
                          id={post.id}
                          location={post.location}
                          caption={post.caption}
                          user={{ id:hospital.id, avatar: hospital.avatar, username: hospital.name }}
                          files={post.files}
                          likeCount={post.likeCount}
                          isLiked={post.isLiked}
                          comments={post.comments}
                          createdAt={post.createdAt}
                        />
                      ))}
                    </>
                  ))}
              </PostsLarge>
            </STabPanel>
          </div>
        </STabs>
      </Wrapper>
    );
  }
  return null;
};
