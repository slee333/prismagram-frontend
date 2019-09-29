# H+ground Frontend

TO-DO LIST:
- [ ] 병원 관련 데이터모델 만들기
  1. 병원 소개글 (bio))
  2. 병원 위치
  3. 병원 사진/로고 등
  4. 병원 선생님들 (~user와 연계)
  5. 병원 예약
  6. 병원과의 DM 기능 ~ 메시징.
    - Rooms 데이터모델을 User간에만 가능하게가 아니라 hospital과도 주고받을 수 있게
- [ ] 병원 프로필 
- [ ] 병원 피드 / 포스트 페이지 구분
- [ ] 유저: 사이드바: 내가 소속된 병원, 내가 다니는 병원 등이 뜬다 (...더보기 가능)


## 1. 설치하기

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



# 주석 읽는 순서

1. Components/App.js
2. Components/Routes.js
3. Routes/Feed.js
4. Components/Post
5. Components/Header > Routes/Search
6. Profile


이런 식으로 주석을 대강 적어봤는데 이해가 되시려나 모르겠네요 ㅜㅜ 일단 이 순서로 보시면 될거같아요.

일단 중요하다 여겨지는 부분들에는 주석을 달아놓았어요. 아마 부족한 부분이 있을텐데 잘 이해 안가는 부분이 있으면 말씀주세요.


이 아래쪽엔 (제가 공부하는 목적으로) 이 앱에 쓰인 개념들을 몇개 적어놓았습니다.


---

# 아폴로 클라이언트

ApolloClient는 GraphQL API와 앱을 연결합니다.


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

## LocalState

원래는 post가 열리고 닫히고 이런걸 다 LocalState에서 조절하는데
일단 지금은 로그인만 조절해봅시다.
웹사이트의 LocalStorage:
크롬에서 F12를 누른다음 localStorage를 쳐보세요. 말 그래도 서버가 아닌 사용자가 프론트엔드를 이용하는데 필요한것들이 이거에요. 저희가 사용하는 기기 (로컬)에 쓰이는 정보들이 여기 저장됩니다.

## Apollo Chorme Extension

Apollo Client를 보다 편하게 사용할 수 있게 해주는 크롬 확장도구.
GraphQL playground와 유사하게 query들을 만져보거나 확인하거나 할 수 있다.

## 프론트엔드에서의 GraphQL query

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
