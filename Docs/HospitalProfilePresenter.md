```js
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
      </Docs>
      {
        <Docs>
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
</Wrapper>
```