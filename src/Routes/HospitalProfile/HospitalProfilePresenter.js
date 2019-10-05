import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import { Link } from "react-router-dom";
import FollowButton from "../../Components/FollowButton";
import Post from "../../Components/Post";
import Button from "../../Components/Button";

// Tab을 import
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
  margin-top: 180px;
`;

const HeaderColumn = styled.div`
  flex-basis: ${props => props.length};
`;

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

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const Files = styled.div`
  position: absolute;
  left: 20%;
  top: 0%;
  width: 60%;
  z-index: -100;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Content = styled.div``;

const ContentRow = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 10px;
`;

const CRowTitle = styled(FatText)`
  font-size: 16px;
`;

const CRowText = styled.p`
  padding-top: ${props => (props.padding ? String(props.padding) : "0px")};
  font-weight: 200;
  font-size: 13px;
  line-height: 24px;
  color: #666;
`;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   max-height: 200px;
const Docs = styled.div`
  min-height: 30px;
  margin-top: 22px;
  display: flex;
`;

const Doc = styled.div`
  height: 100px;
  flex-basis: 50%;
  display: flex;
  align-items: center;
  padding: 5px;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const DocName = styled.div`
  flex-direction: column;
  padding-left: 10px;
  width: 100%;
`;

const DocVatar = styled(Avatar)`
  flex-basis: 25%;
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

const HPLink = styled(Link)`
  display: flex;
`;

export default ({ loading, data }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeHospital) {
    const {
      seeHospital: {
        id,
        name,
        avatar,
        posts,
        bio,
        files,
        location,
        staffs,
        admin,
        isYours,
        staffsCount,
        patientsCount
      }
    } = data;

    console.log(data);

    const [currentItem, setCurrentItem] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    const slide = () => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
        setTimeout(() => setCurrentItem(0), 3000);
      } else {
        setTimeout(() => setCurrentItem(currentItem + 1), 3000);
      }
    };
    useEffect(() => {
      slide();
    }, [currentItem]);

    // Admin과 Staff를 전부 포함하는 리스트를 만듭니다.
    const medicalStaffs = [];
    medicalStaffs.push(admin);
    staffs.forEach(element => {
      medicalStaffs.push(element);
    });

    const truncateText = (text, maxLength, link) => {
      if (text.length > maxLength) {
        const truncated = text.substr(0, maxLength) + "...";
        return truncated;
      } else {
        return text;
      }
    };

    return (
      <Wrapper>
        {/* 병원 이름 및 타이틀 */}
        <Helmet>
          <title> {name} | H+ground</title>
          <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=08b2b81a0be7786891d433f049e9a944&libraries=services,clusterer"></script>
        </Helmet>
        {/* 병원 사진 슬라이드 */}
        <Files>
          {files &&
            files.map((file, index) => (
              <File
                key={file.id}
                src={file.url}
                showing={index === currentItem}
              />
            ))}
        </Files>
        {/* 병원 프로필 사진, 이름, 및 버튼 (팔로우용? 수정용?) */}
        <Header>
          <HeaderColumn length="25%">
            <Avatar size="lg" url={avatar} background="white" topMargin={-80} />
          </HeaderColumn>
          <HeaderColumn length="60%">
            <UsernameRow>
              <Username>{name}</Username>{" "}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(staffsCount)} /> Staffs
              </Count>
              <Count>
                <FatText text={String(patientsCount)} /> Pts
              </Count>
              <Count>
                위치: <FatText text={String(location)} />
              </Count>
            </Counts>
            <Username text={location} />
          </HeaderColumn>
          {/* 버튼. 지금은 내가 admin으로 있는 병원인지 아닌지를 보여주는 용도만 존재 */}
          <HeaderColumn length="15%">
            {isYours ? (
              <Button
                onClick={() => {
                  console.log("I'm Youurs");
                }}
                text="Your HP"
              />
            ) : (
              //  <FollowButton isFollowing={isFollowing} id={id} />
              <Button
                onClick={() => {
                  console.log("Not your hospital");
                }}
                text="Not your HP"
              />
            )}
          </HeaderColumn>
        </Header>

        <STabs defaultIndex={0} onSelect={index => setCurrentTab(index)}>
          <TabMenu>
            <STabList>
              <STab selected={currentTab === 0}>
                <TabText selected={currentTab === 0}>병원 소개</TabText>
              </STab>
              <STab selected={currentTab === 1}>
                <TabText selected={currentTab === 1}>포스트</TabText>
              </STab>
              <STab selected={currentTab === 2}>
                <TabText selected={currentTab === 2}>커뮤니티</TabText>
              </STab>
            </STabList>
          </TabMenu>

          <Content>
            <STabPanel>
              <ContentRow key="intro">
                <CRowTitle text={"병원 소개"} />
                <CRowText padding="22px">{bio}</CRowText>
              </ContentRow>
              <ContentRow key="staffProfile">
                <CRowTitle text={"주 의료진"} />
                <Docs>
                  {medicalStaffs &&
                    medicalStaffs.map(staff => (
                      <Doc>
                        <HPLink to={`/user/${staff.username}`}>
                          <DocVatar size="md-lg" url={staff.avatar} />
                          <DocName>
                            <FatText text={staff.fullName} />
                            <CRowText>{" 원장"}</CRowText>
                            <CRowText>{truncateText(staff.bio, 100)}</CRowText>
                          </DocName>
                        </HPLink>
                      </Doc>
                    ))}
                </Docs>
              </ContentRow>
              <ContentRow key="location">
                <CRowTitle text={"위치"} />
                <Bio>{"병원 위치:   " + location}</Bio>
              </ContentRow>
            </STabPanel>
            <STabPanel>
              <Posts>
                {posts &&
                  posts.map(post => (
                    <Post
                      key={post.id}
                      id={post.id}
                      location={post.location}
                      caption={post.caption}
                      user={{ id, avatar, username: name }}
                      files={post.files}
                      likeCount={post.likeCount}
                      isLiked={post.isLiked}
                      comments={post.comments}
                      createdAt={post.createdAt}
                    />
                  ))}
              </Posts>
            </STabPanel>
            <STabPanel>
              <h2>Any content 3</h2>
            </STabPanel>
          </Content>
        </STabs>
      </Wrapper>
    );
  }
  return null;
};
