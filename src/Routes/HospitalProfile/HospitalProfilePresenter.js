import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

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

const ContentRow = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 10px;
`;

const Docs = styled.div`
  min-height: 30px;
  text
`;

export default ({ loading, data, logOut }) => {
  if (loading === true) {
    //  로딩중이라면 로딩화면!
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeHospital) {
    //  로딩도 완료되고, 데이터도 넘어왔고 한다면 사용자의 프로필을 만들어줍니다.
    const {
      seeHospital: {
        id,
        name,
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

    return (
      <Wrapper>
        <Helmet>
          <title>{name} | H+ground</title>
        </Helmet>
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
        <Header>
          {/* <HeaderColumn>
             <Avatar size="lg" url={files[0].url} />
           </HeaderColumn> */}
          <HeaderColumn>
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
          <HeaderColumn>
            {isYours ? (
              <Button onClick={console.log("I'm Youurs")} text="Your HP" />
            ) : (
              //  <FollowButton isFollowing={isFollowing} id={id} />
              <Button
                onClick={console.log("Not your hospital")}
                text="Not your HP"
              />
            )}
          </HeaderColumn>
        </Header>
        <div id="Content">
          <ContentRow>
            <FatText text={"병원 소개"} />
          </ContentRow>
          <div>{bio}</div>

          <ContentRow>
            <FatText text={"선생님 프로파일"} />
            <Docs>
              <Avatar size="lg" url={admin.avatar} />
              {"원장: " + admin.fullName}
              {"\n 이력: " + admin.bio}}
              {/* {admin &&
                admin.map(adm => (<span>{adm.fullName + ":" + adm.bio}</span>))} */}
            </Docs>
            {
              <Docs>
                <Avatar size="lg" url={staffs[0].avatar} />
                {staffs &&
                  staffs.map(staff => (
                    <span>
                      {"스탭:" + staff.fullName + "\n 이력: " + staff.bio}
                    </span>
                  ))}
              </Docs>
            }
          </ContentRow>
          <ContentRow>
            <FatText text={"위치"} />
          </ContentRow>
          <bio>{"병원 위치:   " + location}</bio>
          <ContentRow>
            <FatText text={"스탭 인원"} />
          </ContentRow>
          <bio>{"Medical Staffs:" + String(staffsCount + 1)}</bio>
          <ContentRow>
            <FatText text={"환자 인원수"} />
          </ContentRow>
          <bio>{"Number of patients:" + String(patientsCount)}</bio>
        </div>
        {/* <Posts>
           {posts &&
             posts.map(post => (
               <SquarePost
                 key={post.id}
                 likeCount={post.likeCount}
                 commentCount={post.commentCount}
                 file={post.files[0]}
               />
             ))}
         </Posts> */}
      </Wrapper>
    );
  }
  return null;
};
