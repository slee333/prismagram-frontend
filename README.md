# H+ground Frontend


# 0. Requirements

**Node js** (버젼은 10 이상이면 괜찮습니다)

**npm** / **yarn**: 둘 다 package를 manage해주는데 역할은 같다고 알아요. npm을 써도 무방하지만 체감상 속도가 빨라서 저는 yarn을 쓰고 있어요.

**git** 터미널(VS Code 터미널, Git Bash, 윈도우 파워셸/커맨드라인 등)에서 깃허브에 Commit, Push, Pull 등을 하기위해 필요합니다. 처음에 리포지토리를 clone 하는데도 필요하고요.


위의 세 종류 프로그램은 꼭 설치해주세요!


프론트엔드가 실행되는 모습은 Netlify[https://hgroundtest.netlify.com]에서 확인하실 수 있습니다.

---

# 1. 설치하기

## 1.1 백엔드 설치하기

### 깃허브 폴더 받아오기

아직 받지 않으셨다면, 백엔드 깃허브 리포지토리[https://github.com/slee333/prismagram]에서 백엔드를 받아주세요. 방법은 다음과 같습니다.

우선 터미널 (혹 커맨드라인) 내에서 프로젝트를 집어놓고 싶은 폴더 내로 이동합니다. 


(예를 들어 저는 ~Documents/Projects 폴더에 설치했습니다.)


그리고 아래 커맨드를 실행해서 리포지토리를 다운받아주세요. 그리고 cd 커맨드를 통해 해당 리포지토리 내로 이동합니다.


```
git clone https://github.com/slee333/prismagram.git
cd prismagram
```

---
### 패키지 설치하기

이제 프로젝트를 구동하는데 필요한 패키지 (일종의 자바스크립트 라이브러리)와 프리즈마 클라이언트를 설치할 차례입니다. 우선 아래 커맨드를 실행하여 패키지를 설치합니다.


```
yarn install
OR
npm install
```

이러면 패키지들이 설치됩니다. 다소 시간이 걸릴 수 있어요. (사실 yarn install 말고 그냥 yarn만 쳐도 똑같이 패키지 인스톨 과정이 실행되요.)

---
### 프리즈마 클라이언트 설치

yarn 혹은 npm을 이용해 패키지를 설치했다면, 이제 프리즈마 클라이언트를 설치할 차례입니다. 


- **프리즈마**는 데이터베이스 관리도구 및 UI라 생각하시면 편합니다. 


- **프리즈마 클라이언트**는 프리즈마에 접근할 수 있도록 해주는 자바스크립트 라이브러리입니다.


프리즈마를 설치하기 이전, 우선 슬랙에 있는 .env 파일이 필요합니다. 슬랙 > 백엔드방에 있는 해당 파일을 다운받아서 프로젝트 폴더에 넣어주세요. (datamodel.prisma, prisma.yml 등과 같은 폴더에 넣어주시면 됩니다.)


이후 다음 커맨드를 이용해 프리즈마 클라이언트를 설치해줍니다.


```
prisma generate
```


제가 백엔드 해설 적을때는 *prisma deploy* 이후 *prisma generate*를 해야한다 적었는데요. 다시보니 prisma deploy는 현재 가지고 있는 데이터모델을 서버에다 올리는 작업을 합니다. 다시 말해 이미 데이터모델이 서버에 올라갔다면 굳이 실행할 이유가 없는 커맨드입니다. 따라서 prisma generate만 실행해줍니다.


혹시 이 과정에서 로그인을 하라고 한다면 마찬가지로 Slack에 백엔드방에 올려놓은 프리즈마 계정을 입력하시면 될 것 같습니다.


제가 이전에는 prisma.yml 파일이 prisma endpoint라는 데이터베이스에 직접적인 엑세스를 가지는 링크를 가지고 있어 깃허브에 올라가 있지 않다 말씀드렸습니다. 


그런데 지금 이 리포지토리에서 보시면 prisma.yml이 올라가 있는데요. prisma endpoint를 prisma.yml 파일 내에 직접 적어두는게 아니라 .env 파일 안에 넣어두어서 그렇습니다.

---
### 백엔드 구동하기

이제 백엔드 구동에 필요한 요소들은 설치가 완료되었습니다. 백엔드를 실행하려면 다음 커맨드를 입력하여 백엔드를 구동합니다.


```
yarn dev
```


왜 구동에 이 커맨드를 쓰는지는 백엔드 리포지토리[https://github.com/slee333/prismagram]에서 2.1.2 *package.json*에 대해 설명한 부분을 참고해주세요.


성공적으로 백엔드를 구동했다면, 이제 인터넷 URL에 localhost:4000를 쳐서 GraphQL Playground에 접속할 수 있습니다.


GraphQL playground를 통해 서버 내 데이터들을 수정도 해보고 DB를 수정하는 커맨드들을 실행도 해보고 할 수 있어요.


예를 들어 데이터베이스 내 유저를 검색하는 query를 실행해보겠습니다. localhost:4000을 들어가서 Playground를 실행해주시고 거기 뜨는 창에 다음과 같은 커맨드를 실행해주세요.

```js
query {
  seeUser (username:"ghouse") {
    id
    fullName
    bio
    createdAt
    adminof {
      id
      name
    }
    staffof {
      name
    }
  }
}
```

그러면 아마 다음과 같은 데이터를 받을겁니다.
```json
{
  "data": {
    "seeUser": {
      "id": "ck18ini0o000d071364eysphw",
      "fullName": "Gregory House",
      "bio": "Gregory House, M.D. (born 1959) is the title character of the American medical drama series House. Created by David Shore and portrayed by English actor Hugh Laurie, he leads a team of diagnosticians as the Head of Diagnostic Medicine at the fictional Princeton-Plainsboro Teaching Hospital in Princeton, New Jersey.",
      "createdAt": "2019-10-02T00:12:03.127Z",
      "adminof": [],
      "staffof": [
        {
          "name": "삼성서울병원"
        }
      ]
    }
  }
}
```


창 자체는 이렇게 뜰거에요.
![GraphQL Playground 창](https://i.imgur.com/hfmllVz.png)


이런식으로 그래프큐엘 플레이그라운드 내에서는 저희가 만든 쿼리들, 혹은 뮤테이션들을 이용해서 어떻게 데이터를 조회하거나 변형할 수 있는지 시험해 볼 수 있습니다. 나중에 이런 쿼리들을 프론트엔드에서도 실행해서 저희가 원하는 데이터를 서버로부터 불러올텐데, 어떻게 쿼리를 짜서 데이터를 원하는 모양으로 불러올지 등을 플레이그라운드를 통해 테스트할 수 있습니다.


GraphQL에 관해 자세한 내용은 백엔드[https://github.com/slee333/prismagram] 리포지토리의 README.MD 파일에서 2.2.1번 목차를 참고해주세요.

---

### 데이터 생성하기


데이터를 만드는건 GraphQL Playground를 통해서도 할 수 있지만 아니라 프리즈마 사이트에서도 만들 수 있습니다.


프리즈마 웹사이트[https://prisma.io] 접속 후 로그인 > 좌측 상단에서 드롭다운 메뉴 클릭 후 dhh10-workspace 선택 > hground-test 선택.


이렇게 해서 hground-test라는 프리즈마 서비스에 들어가면 저희 데이터베이스를 한눈에 보실 수 있습니다. 이런 창이 뜰겁니다.


![Imgur](https://i.imgur.com/4SS6wWo.jpg)


여기에서 저희 데이터를 직접 만져줄 수 있는데요. 10/02일 현재 사용자의 프로필 사진을 바꿀 수 있는 기능이 저희 프론트엔드에 아직 없습니다. 따라서 제 경우 아래와 같이 프로필 사진을 직접 바꾸어주었습니다.


![Imgur](https://i.imgur.com/b01Jrqy.jpg)



## 1.2 프론트엔드 설치하기


프론트엔드도 마찬가지로 설치합니다. 


백엔드 때와 마찬가지로, 프로젝트 파일을 생성하고 싶은 디렉토리 내에서 다음 커맨드를 실행하여 프론트엔드 폴더를 다운받은 후 해당 폴더 내로 이동합니다.


```
git clone https://github.com/slee333/prismagram-frontend.git

cd prismagram-frontend
```


프론트앤드도 마찬가지로 패키지 설치가 필요합니다. 백엔드 때와 같이 yarn, 혹은 npm을 이용해 패키지를 설치해줍니다.

```
yarn install
or 
npm install
```

모든 패키지 설치가 완료되었다면, 다음 커맨드를 이용해 프런트엔드를 실행해줍니다.


```
yarn start
```


성공적으로 완료되면 터미널에 다음과 같은 메시지가 뜨며 프론트엔드가 실행됩니다. 

[Imgur](https://i.imgur.com/lp1BUsh.jpg)


여기까지 완료하시면 localhost:3000 주소를 통해 로컬에서 프런트엔드에 접속하실 수 있습니다. 이때 백엔드를 구동하고 있는 상황이셔야 해요! 


그러지않으면 프런트엔드가 localhost:4000에 접속할 수 없어 **400 NOT FOUND** 에러가 뜰 수 있습니다.


### 접속하기

프런트엔드를 실행하면 다음과 같은 화면이 뜹니다.

![Imgur](https://i.imgur.com/CfcSyKr.png)

아마 이메일을 입력하면 (전에 회원가입하지 않은 이상) 없는 회원이라며 회원가입을 하라 할텐데요.


회원가입 후 로그인을 시도하면 Secret을 적으라는 창이 뜨고, 로그인시 입력했던 이메일로 secret을 담고 있는 이메일이 오게 됩니다.


![Imgur](https://i.imgur.com/dSdOvuv.png)


이메일로 받은 secret을 입력 후 접속해주시면 됩니다. 이후에는 자유롭게 둘러보실 수 있을텐데, 상단 서치바에 "slee333"을 검색하면 제 계정을 확인하실 수 있고, 제 계정을 팔로우하실 시 제가 올려놓은 포스트를 피드에서 보실 수 있을겁니다.


만일 접속하는 과정이 오래 걸린다면 백엔드와 연결되는 프리즈마 서버가 구동되는 중이라 그럴 수 있습니다. (2시간 정도 활동이 없으면 프리즈마 서버가 자동으로 꺼집니다..) 

![Imgur](https://i.imgur.com/GLXdBCq.png)

계속 접속이 안된다면 프리즈마 워크스페이스(dhh10-workspace)에서 hground-test 의 status를 확인해주세요. Not reachable이라고 뜰 때가 있는데 접속을 누군가 시도하면 조금 시간이 지나고 다시 활성화될겁니다.


### 로그아웃


로그아웃은 상단 맨 오른쪽 프로필 페이지 > 로그아웃 버튼을 통해 하실 수 있습니다.


또는 저희가 로그인시 받아온 JWT token을 삭제함으로서 행하실수도 있습니다. 토큰이 무엇이었는지 궁금하시면 백엔드[https://github.com/slee333/prismagram] 리포지토리에서 목차 **2.3.1**, **2.3.4**를 살펴보아주세요.


저희가 로그인시 받아온 토큰은 localStorage에 저장됩니다. 아마 웹 브라우저들은 다들 localStorage에 접근하는 방법이 있을텐데, 저는 크롬을 사용하니 일단 크롬 기준으로 설명하겠습니다.


크롬에서 F12를 눌러 Developer tool을 실행 - Application - LocalStorage - https://localhost:3000를 클릭하시면 해당 url 안의 localStorage에 저장된 내용들을 볼수 있습니다.

![Imgur](https://i.imgur.com/1Oq5cls.png)


여기서 token을 선택해서 지운 후 다시 페이지를 새로고침하면 로그아웃된 상태가 될거에요.


이 방법을 굳이 왜 알아야 하냐 하실수도 있지만 GraphQL Playground에서 로그인한 상태로 mutation을 실행해야 하는 경우, 예를 들어 어떤 포스트에 댓글을 단다거나 포스트를 새로 올리는 경우에는 이런 token을 playground 내에서 정의해줘야지 포스트가 올라갑니다. 이 내용은 아래 병원 프로필 만들기에서 더 자세히 다루어 보겠습니다.



---

# 2.  병원 프로필 만들기


일단 제가 만들어놓은 병원 프로필 페이지 레이아웃은 (프런트엔드와 백엔드를 둘 다 구동중이시라면) http://localhost:3000/#/hospital/삼성서울병원 에서 확인하실 수 있습니다. 또는 제가 프론트엔드를 배포중인 링크인 https://hgroundtest.netlify.com/#/hospital/삼성서울병원 에서도 확인하실 수 있고요.



To-do-list

1. 설치 ~ 실행 후 로그인. 이하 기능들.
  - [X] 백엔드 실행법
  - [X] 프론트엔드 실행법
2. hospital profile 만든 과정
  - [ ] datamodel 새로 만들기. Hosptial 데이터모델, 그에 따른 데이터모델 수정
  - [ ] Resolver 만들기
  - [ ] Hosptial.js computed field 만들기 + 그에 따른 models.graphql 수정
  - [ ] 이후 Front end로 넘어옴
  - [ ] Routes에서 hosptial profile로 넘어가는 route 만들기
  - [ ] Header에서 해당 route로 연결해주는 링크 만들기?
  - [ ] ProfilePresenter, Container 역할 + 디자인

---
# 1. 설치하기

백엔드를 우선 실행해주세요. (백엔드 실행 관련해서는 백엔드 리포를 참조해주세요)
그러면 GraphQL 백엔드가 localhost:4000에서 돌아갈텐데요.


그럼 프론트엔드가 설치된 폴더 내에서 다음과 같은 커맨드를 실행해줍니다.
```
yarn install
yarn start
```


이렇게 하고 나면 프론트엔드가 localhost:3000에서 실행될겁니다.

/.Apollo/Client.js 파일을 보시면

``` js
export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://hground-backend.herokuapp.com", 
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}` 
  }
});
```
이렇게 생긴 부분이 있어요. 이 말은 우리가 개발중일때는 (process.env.NODE_ENV === "development") ["http://localhost:4000"](http://localhost:4000)을 서버 url로 삼아 통신하고, 그렇지 않을 경우에는 ["https://hground-backend.herokuapp.com"](https://hground-backend.herokuapp.com)을 통해 통신한단 소리입니다. (이 자리엔 저희 서버가 들어올거에요. 지금은 제가 임시로 heroku로 만들어놓았습니다.)


#### 1.1 로그인 프로세스

이 예제에서는 로그인이 조금 이상한 방식으로 되어있어요.

계정을 만들고 로그인을 누르면, 해당 계정 이메일로 secret 키가 발송이 됩니다. 이 secret key를 입력하는 방식으로 로그인을 하게됩니다.


#### Feed, Profile

피드랑 프로파일 등 메뉴가 있는걸 확인할 수 있어요. 그런데 Post가 아무것도 안 올라와서 그런지 지금 들어가보면 상당히 휑할거에요. 이 부분은 좀 더 작업해서 업데이트드리겠습니다.



---

아폴로 클라이언트:
Apollo Client를 시작하는것. ApolloClient는 GraphQL API와 앱을 연결합니다.
Apollo는 graphql을 기반으로 한 상태관리 플랫폼이다. 클라이언트에서 graphql을 사용하여 데이터를 가져오는 UI를 만들 때 사용하기 좋다.
특히 React하고 결합이 좋다. => 컴포넌트 자체에 Query를 녹여서 구현하기가 쉬워진다
그리고 App.js와 Apollo Client를 연결해준다.

Dog라는 component에서 GET_DOGS라는 query를 이용해볼게요.

```js
const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);
```

#### LocalState

원래는 post가 열리고 닫히고 이런걸 다 LocalState에서 조절하는데
일단 지금은 로그인만 조절해봅시다.
웹사이트의 LocalStorage:
크롬에서 F12를 누른다음 localStorage를 쳐보세요. 말 그래도 서버가 아닌 사용자가 프론트엔드를 이용하는데 필요한것들이 이거에요. 저희가 사용하는 기기 (로컬)에 쓰이는 정보들이 여기 저장됩니다.

#### Apollo Chorme Extension

Apollo Client를 보다 편하게 사용할 수 있게 해주는 크롬 확장도구.
GraphQL playground와 유사하게 query들을 만져보거나 확인하거나 할 수 있다.

#### 프론트엔드에서의 GraphQL query

```js
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

// GraphQL query isLoggedIn을 정의해줍니다.
// @client: 설명은 아래에
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const {
  data: { isLoggedIn }
} = useQuery(QUERY);
```

여기서 isLoggedIn에 @client는 왜 붙어있느냐. 이걸 붙여놓지 않을 시 Apollo는 우리 서버쪽에 접근해서 isLoggedIn에 접근하려 합니다. 로그인 유무는 서버가 아니라 클라이언트쪽에 저장되므로 @client를 넣어줍니다. (아폴로 클라이언트 내에서만 사용하는 느낌인듯)

query는 userQuery (react-apollo-hooks)를 통해 사용하게 됩니다.
위에 적어놓은 JS 코드를 보면 알겠지만 그냥 저런식으로 사용하면 되요! 


# Styling

Theme ~ Themeprovider

Glboalstyles: Global Styles.
- 안에서 props.theme.XXX 와 같은 식으로 theme.js 내 style들을 활용가능


# Components 살펴보기


Hooks: Hooks는 src/Hooks에서 가져옴. 애초에 useInputs.js밖에 없음



## heroku
```
heroku login
heroku git:remote -a hground-backend
git push heroku master
```