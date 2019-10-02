# H+ground Frontend


# 0. Requirements

**Node js** (버젼은 10 이상이면 괜찮습니다)

**npm** / **yarn**: 둘 다 package를 manage해주는데 역할은 같다고 알아요. npm을 써도 무방하지만 체감상 속도가 빨라서 저는 yarn을 쓰고 있어요.

**git** 터미널(VS Code 터미널, Git Bash, 윈도우 파워셸/커맨드라인 등)에서 깃허브에 Commit, Push, Pull 등을 하기위해 필요합니다. 처음에 리포지토리를 clone 하는데도 필요하고요.


위의 세 종류 프로그램은 꼭 설치해주세요!


프론트엔드가 실행되는 모습은 [Netlify](https://hgroundtest.netlify.com)에서 확인하실 수 있습니다.

---

# 1. 설치하기

## 1.1 백엔드 설치하기

### 깃허브 폴더 받아오기

아직 받지 않으셨다면, 백엔드 [깃허브 리포지토리](https://github.com/slee333/prismagram)에서 백엔드를 받아주세요. 방법은 다음과 같습니다.

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


왜 구동에 이 커맨드를 쓰는지는 [백엔드 리포지토리](https://github.com/slee333/prismagram)에서 2.1.2 *package.json*에 대해 설명한 부분을 참고해주세요.


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


부가설명을 조금 해놓겠습니다. 
```js
query {
  seeUser (username:"ghouse") { 
    // seeUser는 username이란 input 값을 받아 User를 찾아오는 query입니다.
    // 여기서는 input 인 username 값은 "ghouse"입니다. 이제 쿼리를 실행하면 "ghouse"란 사용자명을 가진 유저를 찾아옵니다.
    // 이 아래로는 찾은 사용자의 어떤 필드를 받을지를 결정합니다.
    // 보시면 저는 ghouse란 사용자 이름을 가진 유저의 id, fullName, bio(소개) 등을 받아옵니다.
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


이런식으로 그래프큐엘 플레이그라운드 내에서는 저희가 만든 쿼리들, 혹은 뮤테이션들을 이용해서 어떻게 데이터를 조회하거나 변형할 수 있는지 시험해 볼 수 있습니다. 나중에 이런 쿼리들을 프론트엔드에서도 실행해서 저희가 원하는 데이터를 서버로부터 불러올텐데, 어떻게 쿼리를 짜서 데이터를 원하는 모양으로 불러올지 등을 플레이그라운드를 통해 테스트할 수 있습니다.


GraphQL에 관해 자세한 내용은 [백엔드 리포지토리](https://github.com/slee333/prismagram)의 README.MD 파일에서 2.2.1번 목차를 참고해주세요.

---

### 데이터 생성하기


데이터를 만드는건 GraphQL Playground를 통해서도 할 수 있지만 아니라 프리즈마 사이트에서도 만들 수 있습니다.


[프리즈마 웹사이트](https://prisma.io) 접속 후 로그인 > 좌측 상단에서 드롭다운 메뉴 클릭 후 dhh10-workspace 선택 > hground-test 선택.


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


또는 저희가 로그인시 받아온 JWT token을 삭제함으로서 행하실수도 있습니다. 토큰이 무엇이었는지 궁금하시면 [백엔드 리포지토리](https://github.com/slee333/prismagram)에서 목차 **2.3.1**, **2.3.4**를 살펴보아주세요.


저희가 로그인시 받아온 토큰은 localStorage에 저장됩니다. 아마 웹 브라우저들은 다들 localStorage에 접근하는 방법이 있을텐데, 저는 크롬을 사용하니 일단 크롬 기준으로 설명하겠습니다.


크롬에서 F12를 눌러 Developer tool을 실행 - Application - LocalStorage - https://localhost:3000를 클릭하시면 해당 url 안의 localStorage에 저장된 내용들을 볼수 있습니다.

![Imgur](https://i.imgur.com/1Oq5cls.png)


여기서 token을 선택해서 지운 후 다시 페이지를 새로고침하면 로그아웃된 상태가 될거에요.


이 방법을 굳이 왜 알아야 하냐 하실수도 있지만 GraphQL Playground에서 로그인한 상태로 mutation을 실행해야 하는 경우, 예를 들어 어떤 포스트에 댓글을 단다거나 포스트를 새로 올리는 경우에는 이런 token을 playground 내에서 정의해줘야지 포스트가 올라갑니다. 이 내용은 아래 병원 프로필 만들기에서 더 자세히 다루어 보겠습니다.



---

# 2.  병원 프로필 만들기


일단 제가 만들어놓은 병원 프로필 페이지 레이아웃은 (프런트엔드와 백엔드를 둘 다 구동중이시라면) http://localhost:3000/#/hospital/삼성서울병원 에서 확인하실 수 있습니다. 또는 제가 프론트엔드를 배포중인 링크인 https://hgroundtest.netlify.com/#/hospital/삼성서울병원 에서도 확인하실 수 있고요.

---
## 2.1 참고용 레이아웃

우선 제가 참고한 레이아웃은 [브런치](https://brunch.co.kr/@soyuly)입니다. 브런치에서 개인 프로필에 들어가면

1. 작가소개
2. 글
3. 작품

이렇게 3가지 상단 탭이 존재하는데요. 이와 유사한 구조로 병원 프로필 페이지 역시

1. 병원 소개
2. 병원 포스트
3. 병원 내 커뮤니티 기능?

등으로 구성을 목표했습니다.

또한 어플리케이션 중 '강남언니'에서 병원 정보를 찾아봤을 시 나오는 정보 페이지 역시 참고했습니다.

---

## 2.2 데이터모델 만들기

**Prisma**에 들어갈 데이터모델을 만듭니다.


우선 병원 프로필 페이지를 구성하는데 필요한 데이터를 구성해야합니다. 먼저 병원이란 객체가 어떻게 구성되어 있을지를 정의해야 하는데요.


병원이란 객체가 가져야 할 기능들 및 정보는 다음과 같습니다.

- 이름
- 주소
- 소개
- 연락처 (이메일 혹은 전화번호)
- 병원 사진 (배경사진)
- (병원 측에서 올리는) 포스트
- 병원 프로필 사진
- 병원 관리자, 소속 의료진, 소속 환자 명단

일단 이 정도가 있겠는데요.


병원 데이터에 이런 요소들이 포함되어야 한다는 사실을 알았으니 이제 병원 데이터모델을 한번 짜 보겠습니다.

### 2.2.1 datamodel.prisma

**백엔드** 폴더 안에서 datamodel.prisma를 찾아 열어줍니다. [백엔드 리포지토리](https://github.com/slee333/prismagram)에 2.1.3 부분을 보시면 이해에 도움되실거에요.


우선 병원이라는 데이터 객체를 정의해주겠습니다.


```js
type Hospital {
  id: ID! @id
}
```


여기서 id는 병원이라는 객체가 생성될 시 자동으로 생성되는 객체의 고유번호입니다.


#### 이름, 소개, 병원 연락처 필드 추가


앞서 병원이라는 데이터 객체 안에 들어갈 요소들로 이름, 주소, 병원 소개, 병원 연락처 (이메일 혹은 전화번호)가 있었는데요. 해당 요소들을 추가해주겠습니다.


```js
type Hospital {
  id: ID! @id
  location: String
  bio: String
  name: String! @unique
  email: String @unique
  contact: String @unique
}
```

> location: String


위치는 "모모시 모모구 모모동..." 과 같이 `String`으로 정의될테니 `String`이라 정의해줍니다. 병원 소개글을 뜻하는 `bio` 역시 마찬가지입니다.

> name: String! @unique

병원 이름 역시 `String`인데 끝에 `unique`가 붙어 있습니다. 


병원 이름은 고유해야 하니 붙여 놓았습니다. 이렇게 할 시 같은 이름을 가진 병원을 또 하나 더 만들려 하면 "이미 존재하는 병원 이름입니다"며 에러가 뜨게 됩니다.


또한 `String` 뒤에 느낌표 (!) 가 붙어있는데, 이는 해당 요소가 필수라는 사실을 의미합니다. 병원이라는 데이터 객체를 만들 때엔 `name`이라는 필드에 무엇인가 반드시 필요하다는 의미입니다.


이메일과 연락처 역시 고유해야 하지만 필수는 아니기에 !는 붙이지 않았습니다.


#### 병원 사진 추가

데이터모델 파일 내에는 `file`이란 객체가 있습니다. 이 객체를 살펴보면 

```js
type File {
  id: ID! @id
  url: String!
  post: Post @relation(name: "FilesOfPost")
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
```

이렇게 되어있는데요. 파일 url을 저장하고 있는, `post`와 연결되는 객체입니다. 파일 url을 전달하는 객체라 생각하시면 됩니다. 이론적으론 어떤 종류의 파일이건 url을 통해 전달할 수 있겠지만 일단은 이미지 url을 집어넣어 사진을 전달하는 용도로 쓸 수 있다 정도만 알면 될 것 같습니다.


병원 내 인테리어 사진 등을 정보 페이지에 띄워야 하니 병원 객체 안에 파일이라는 필드도 추가해줍니다. 마찬가지로 파일 객체 안에도 병원이라는 필드를 추가해줍니다. 


```js
type Hospital {
  id: ID! @id
  location: String
  bio: String
  name: String! @unique
  email: String @unique
  contact: String @unique
  files: [File!]! @relation(name: "FilesOfHospital", onDelete: CASCADE)
}

type File {
  id: ID! @id
  url: String!
  post: Post @relation(name: "FilesOfPost")
  hospital: Hospital @relation(name: "FilesOfHospital")
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
```

병원과 파일 객체 안에 파일과 병원 필드를 추가했습니다. 하지만 `relation`을 비롯해서 생소한 내용들이 보이는데요. 더 자세히 살펴보겠습니다.


>     files: [File!]! @relation(name: "FilesOfHospital", onDelete: CASCADE)

- 병원이란 객체 안에 files란 필드는 파일들의 array를 가집니다. 따라서 `File`이 아닌 `[File!]!`을 사용해서 `array` 형태로 정의해줍니다.

- 여기서 우리는 `Hospital`과 `File` 간의 관계를 정의한다 볼 수 있는데요. 이렇게 한 객체를 다른 객체의 field로서 정의할 경우에 **prisma**에서 이 관계를 보다 명확히 정의해줄 수 있습니다.

- 관계의 정의는 `@relation(name: "~~~~~")`을 통해 이루어집니다. 각 관계에는 이 경우와 같이 이름이 필요합니다. 용도를 알 수 있도록 적당히 지어줍니다. 

- 이 경우 병원 객체 내 `files`와 `File` 객체 내 `hospital`에 관계를 동일한 이름으로 (`@relation(name: "FilesOfHospital")`) 추가해줍니다.

- 사실 같은 종류의 관계가 여러개 있지 않는 이상 관계를 반드시 이름으로 정의해줄 필요는 없습니다. 예를 들어, 이따 소개할 두 필드 `staffs`와 `patients`는 둘 다 `User`의 `array`라서 관계 정의가 필요하지만, 병원이 참여하고 있는 채팅방들을 뜻하는 `rooms`는 `Room`이라는 객체의 `array`이지만 `Hospital`이 `Room`과 맺는 유일한 종류의 관계이기 때문에 별도의 관계 정의가 필요하지 않습니다.

- 그럼 우리는 왜 `files` 필드에 굳이 관계지정을 해주었느냐. `onDelete`기능을 활용하기 위해서입니다.

- `onDelete: CASCADE` 부분은 병원 데이터 객체가 삭제되었을 시 이 병원과 관계를 맺고 있던 파일들을 어떻게 처리할지를 정의합니다. 이 경우 `CASCADE`라 정의하였는데, 병원이 삭제될 시 이 병원과 관계를 맺고 있든 파일들도 함께 삭제한다는 의미입니다.



#### 병원 포스트 추가

마찬가지로 병원에서 올리는 포스트들도 있을테니 앞에서 파일을 추가한 것과 같은 요령으로 추가해줍니다.

```js
type Hospital {
  id: ID! @id
  location: String
  bio: String
  name: String! @unique
  email: String @unique
  contact: String @unique
  files: [File!]! @relation(name: "FilesOfHospital", onDelete: CASCADE)
  posts: [Post!]! @relation(name:"PostsOfHospital", onDelete: CASCADE)
}

type Post {
  id: ID! @id
  location: String
  caption: String!
  user: User @relation(name: "PostsOfUser")
  hospital: Hospital @relation(name:"PostsOfHospital")
  files: [File!]! @relation(name: "FilesOfPost", onDelete: CASCADE)
  
  (...이하 생략)
  }
}
```

마찬가지로 files 필드를 추가한 것과 같은 요령으로 Hospital 객체 내에 Post를 추가해줍니다.

이 경우 `@relation(name: "PostsOfHospital")`라는 관계를 추가해주었네요.

#### 병원 프로필 사진 추가


이제 병원의 프로필 사진을 추가할 차례입니다. `avatar`라는 이름으로 병원 객체 내에 필드를 하나 추가해줍니다.


```js
type Hospital {
  id: ID! @id
  avatar: String 
    @default(
      value:"https://image.flaticon.com/icons/svg/1546/1546074.svg"
    )
  location: String
  bio: String
  name: String! @unique
  email: String @unique
  contact: String @unique
  files: [File!]! @relation(name: "FilesOfHospital", onDelete: CASCADE)
  posts: [Post!]! @relation(name:"PostsOfHospital", onDelete: CASCADE)
}
```

`avatar`은 `String`으로 병원 프로필 사진 url을 보관하는 필드입니다.


여기서 `@default(value: XXX)`은 해당 필드의 기본값을 지정해주는데, 저는 병원의 [벡터 이미지](https://image.flaticon.com/icons/svg/1546/1546074.svg)를 하나 골라서 넣어놓았어요.


#### 병원 소속 관리자, 의료진, 환자 명단


병원 소속 관리자나 의료진 명단, 환자 명단은 사용자, 혹은 사용자의 `array`로 정의할 수 있습니다 


다음 필드들을 `Hospital` 객체 안에 넣어줍니다.


```js
  admin: User! @relation(name: "AdminOfHospital")
  staffs: [User!]! @relation(name: "StaffOfHospital")
  patients: [User!]! @relation(name: "PatientOfHospital")
```

- `admin`: 관리자입니다. 기본적으로 Hospital 객체를 만든 사용자를 해당 병원의 관리자로 설정합니다. (이 부분은 추후 `addhospital` mutation에서 설명하겠습니다.)
- `staffs` / `patients`: `User`의 `array`로 설정합니다.


이렇게 `Hospital`과 `User`간의 관계를 세개 만들었으니, `User` 객체 역시 수정해줍니다. `User`객체의 마지막 부분에 다음과 같은 필드 3개를 추가하였습니다.

```js
adminof: [Hospital!]! @relation(name: "AdminOfHospital")
staffof: [Hospital!]! @relation(name: "StaffOfHospital")
patientof: [Hospital!]! @relation(name: "PatientOfHospital")
```
- `adminof`: 사용자가 `admin`으로 있는 병원들의 array입니다.
- `staffof`: 사용자가 `staff`로 있는 병원들의 array입니다.
- `patientof`: 사용자가 `patient`로 있는 병원들의 array입니다.

---

#### 병원 데이터모델 (완성)

완성된 병원 데이터모델입니다.
(Post, File, User의 변경내용은 생략했습니다)


```js
type Hospital {
  id: ID! @id
  avatar: String 
    @default(
      value:"https://image.flaticon.com/icons/svg/1546/1546074.svg"
    )
  location: String
  bio: String
  posts: [Post!]! @relation(name:"PostsOfHospital", onDelete: CASCADE)
  files: [File!]! @relation(name: "FilesOfHospital", onDelete: CASCADE)
  rooms: [Room!]!
  name: String! @unique
  email: String @unique
  contact: String @unique
  admin: User! @relation(name: "AdminOfHospital")
  staffs: [User!]! @relation(name: "StaffOfHospital")
  patients: [User!]! @relation(name: "PatientOfHospital")
}
```


이후 `prisma deploy`를 이용해 이 데이터모델을 프리즈마에 올리고 `prisma generate`를 통해 현 데이터모델에 상응하는 prisma client를 다시 생성했습니다.


### 2.2.2 models.graphql


이제 프리즈마에서 인지하는 데이터모델을 만들었으면, 이 데이터모델에서 정의한 데이터 type들을 똑같이 GraphQL에서도 정의해주어야 합니다.

`./api/models.graphql`:
 
 이 파일에서는 우리가 GraphQL에서 사용하는 type들(User, Post, Like, 등등)을 정의합니다. 이때까지 만든 datamodel.prisma 파일과 거의 같습니다. 다만 `@relation`, `@unique` 와 같은 것들은 **GraphQL**이 아니라 **Prisma**의 문법이기 때문에 빼주어야합니다. 

따라서 `./api/models.graphql`에 다음과 같은 type을 추가해줍니다.

```js
type Hospital {
  id: ID!
  avatar: String
  location: String
  bio: String
  files: [File!]!
  posts: [Post!]!
  rooms: [Room!]!
  name: String!
  email: String
  contact: String
  admin: User
  staffs: [User!]!
  patients: [User!]!
}
```

사실상 데이터모델에서 정의한 내용에서 프리즈마 문법만 뺀 내용입니다. `Hospital` 타입 말고도 변경된 다른 `type`들 (`User`, `Post`, `File`)에도 변화된 데이터모델을 반영하여 `models.graphql`을 수정해줍니다


그런데 실제 `models.graphql` 파일을 보면 다음과 같은 필드들이 더 있을겁니다.

```
patientsCount: Int!
staffsCount: Int!
isYours: Boolean!
```

이 필드들이 왜 들어가있고, 어디서 왔고, 무엇을 의미하는진 이따 computed field에 대해 설명할 때 추가로 설명하겠습니다.


---


## 2.3 Resolver 만들기


이제 데이터 모델을 완성하였으니 이 데이터들을 불러오거나 주무를 수 있는 **Resolver**들을 만들어보겠습니다. Resolver는 데이터 Query나 Mutation을 행하는 함수입니다. 아까 **GraphQL Playground**에서 다음과 같은 query를 실험해봤던 것 기억하시나요?

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

여기서 사용한 seeUser가 query를 해주는 resolver입니다. username이란 입력을 받아 해당 user의 데이터를 돌려주는 query를 만들 수 있도록 해주는거죠.


Resolver에는 두 종류가 있습니다.


1. Query: 데이터를 찾아옵니다. 위에 있는 seeUser의 경우가 대표적입니다.
2. Mutation: 데이터를 변화시킵니다. 삭제하거나, 수정하거나, 두 데이터를 연결해서 관계를 설정해주거나 할 수 있을겁니다.


이런 resolver들은 백엔드 폴더 내의 `./api/` 폴더 안에 다 정리되어 습니다. 저는 `./api/Hosptial` 폴더를 만들어 이 안에 병원과 관련된 모든 Resolver들을 넣어주겠습니다.


우선 새 병원을 추가하는 `addHospital` resolver를 만들어보겠습니다. 

---

Resolver는 자바스크립트 코드와 GraphQL 코드 하나씩으로 이루어지는데, 저는 이 두 코드들을 포함할 `./api/Hosptial/addHospital` 폴더를 만들었습니다. (꼭 이렇게 Resolver별로 폴더를 만들 필요는 없는걸로 압니다. 하지만 이 편이 정리가 편한 것 같아요.)

### 2.3.1 addHospital.graphql


기본적으로 graphql 파일에서는 resolver의 input과 output을 정의합니다. 구조를 정의한다고 볼 수 있을 것 같습니다.


 `./api/Hospital/addHospital/addHospital.graphql` 파일을 보시면 이렇게 되어있습니다:

```js
type Mutation {
  addHospital(
    name: String!
    email: String
    location: String
    contact: String
    bio: String
  ): Hospital!
}
```

- 새 병원을 추가하는 행위. 즉 기존 데이터베이스에 변화를 주는 행위를 하기 때문에 `type`은 `Mutation`입니다.


- Resolver의 이름을 정의해줍니다 (addHospital)


- Resolver의 input을 정의해줍니다. 이 경우엔 `name`, `email`, `location`, `contact`, `bio` 가 `String` 형태로 들어가네요. 여기서 `name`에는 `!` 표시가 붙어있어서 이 항목이 필수적으로 요구됨을 알 수 있습니다.
    - 저희가 아까 데이터모델의 정의할때 `Hospital` 타입에서 `name` 필드를 필수적으로 요구했던걸 기억하시나요? 그러니 마찬가지로 여기서도 `name`을 필수적으로 요구해줍니다. 그러지 않는다면 `Hospital` 데이터를 추가하려고 할때 필수항목인 name이 부재하다고 에러가 뜰거에요.

- Resolver의 output을 또 정의해줍니다. 이 경우에는 `Hospital!`입니다. 만들어진 병원 데이터를 `return`하여서 옳게 만들어졌는지 확인할 수 있도록 해보겠습니다.


이렇게 어떤 input이 addHospital resolver안에 들어가고 어떤 output을 받는지 그 구조를 정의했습니다. 이제 이 구조대로 input을 넣고 output을 받는 자바스크립트 함수를 만들어보겠습니다.

---

### 2.3.2 addHospital.js

`addHospital.js` 파일은 다음과 같이 되어있습니다:


```js
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addHospital: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { name, email = "", location = "", contact = "", bio = "" } = args;
      const { user } = request;
      console.log(user.id)
      return prisma.createHospital({
        name,
        admin: {
          connect: {
            id: user.id
          }
        },
        email,
        location,
        contact,
        bio
      });
    }
  }
};
```

하나하나 뜯어서 살펴볼게요.

```js
import { prisma } from "../../../../generated/prisma-client";
```

프리즈마 클라이언트를 불러오는 코드입니다.

```js
export default {
  Mutation: {
    addHospital: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
```

- `export default`는 해당 자바스크립트에서 기본적으로 `export`하는 함수 혹은 객체 등을 정의해줍니다. 이 경우에는 당연히 `addHospital`이란 `mutation`이겠죠? 따라서 이런 식으로 정의해줍니다.


- `async`: `addHospital`은 asynchronous한 함수입니다. 자바스크립트에서 **비동기 처리** 란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.
  - 페이스북 페이지 등을 로드할 때 먼저 로드되는 애들이 있고 아닌 애들이 있습니다. 어떤 부분들이 로드되지 않았다 해서 로드된 부분의 기능에는 영향을 주지 않습니다. 이는 **비동기 처리**로 데이터를 불러 처리하기 때문에 가능한 일입니다.


- `async()` 안의 세 요소는 각각 ( `parent`, `args`, `context` ) 입니다.
  1. `parent`는 아래에서 computed field에 대해 이야기할 때 추가로 설명하겠습니다. 이 함수가 속한 객체의 상위 객체를 가져오는데, 이 경우엔 그런 상위객체가 존재하지 않습니다. 따라서 변수 이름도 딱히 없고 `_`로 되어있죠.
  2. `args`: 저희가 받아오는 input들이 모아져있는 객체입니다.
  3. `context`: `GraphQL Context`는 현 execution에서의 모든 resolver들에서 공유되는 객체들입니다. 주로 authentication이나 사용자 정보 같은 정보들을 주로 여기 담아 공유합니다. 저희 경우엔 `isAuthenticated`라는 함수와 `request`가 context로 전해졌습니다. 보다 자세한 내용이 궁금하시면 [GraphQL Context](https://graphql-modules.com/docs/introduction/context) 문서를 참고해주세요.


- `isAuthenticated`: 간단히 설명하자면 사용자에게서 온 요청을 받아서 이것이 로그인된 사용자에 의한 요청인지 아닌지를 판별해주는 함수입니다. 로그인을 요하는 기능들에 전부 붙어있습니다. (예를 들어 코멘트를 로그인 없이 남기면 안되니 해당 기능을 수행하는 resolver에도 이게 붙어있습니다.)


- `request`: 사용자에게서 온 요청입니다. 사용자가 누구인지 판별할 수 있는 JWT Token이 요청의 'header'에 담겨 오게 되는데요. header에 담긴 토큰을 해독해서 사용자가 로그인된 사용자인지 아닌지를 판별합니다. 자세한 내용은 [백엔드 리포지토리](https://github.com/slee333/prismagram)에서 **2.3.4** 를 참고해주세요.


이제 사용자가 로그인된 사용자인지 아닌지를 판별했습니다. 코드의 다음 부분으로 넘어가겠습니다.


```js
const { name, email = "", location = "", contact = "", bio = "" } = args;
const { user } = request;
console.log(user.id)
```

- `args`에서 input 값들을 다 가져옵니다. args 객체는 대충 `{ name="~~", email ="~~~" }` 이런 구조일텐데요. 자바스크립트 문법상 이런 경우 

```js
const { name, email = "", location = "", contact = "", bio = "" } = args;
```

이런 방법으로 객체 안에 있는 필드들을 변수로 간편하게 빼와줄 수 있습니다.

햇갈리실거 같아 크롬 Developer Tool (구글 크롬 - F12)에서 간단한 예제를 만들어보았습니다.

![Imgur](https://i.imgur.com/clJ91vo.png)


여기서 a,b는 test라는 객체 안의 field입니다. 당연히 외부에는 a, b라는 변수가 존재하지 않죠. 하지만 test 내의 필드 a와 우리가 정의하고자 하는 변수 a의 이름이 일치하기 때문에, `const {a,b} = test` 라는 코드로 변수 a,b를 간편히 정의해줄 수 있습니다.


- 마찬가지로 `request`라는 객체 안에서 `user` 필드를 가져옵니다.

- console.log 부분은 제가 코드 잘 돌아가는지 보려고 넣은거니 무시해주세요. 나머지를 보겠습니다.


```js
return prisma.createHospital({
        name,
        admin: {
          connect: {
            id: user.id
          }
        },
        email,
        location,
        contact,
        bio
      });
```

- Prisma client는 데이터모델이 만들어지면 기본적으로 각 데이터 타입을 (우리 경우엔 User, Hospital 등을) 만들거나, 업데이트하거나, 없애거나 하는 함수들을 만들어놓습니다. 

- Prisma endpoint 링크로 들어가시면 어떤 기능들이 만들어져있는지 확인하실 수 있습니다.

![Imgur](https://i.imgur.com/LcCE9HS.png)


- Prisma endpoint 링크로 들어갔을 때 보이는 화면인데요. 오른쪽의 DOCS 버튼을 누르면 **Prisma client**에서 어떤 기본적인 함수들을 제공하는지 보실 수 있습니다.

- 여기서 `createHospital(...)`을 눌러보았습니다. 그러면 오른쪽 상단에서 `createHospital`이란 함수는 `HospitalCreateInput`, 즉 `Hospital` 객체를 구성하는 요소들을 `input`으로 받고, `Hospital` 객체를 return함을 알 수 있습니다.


- `prisma.createHospital()` 기능을 통해 `Hospital` 객체를 만들어주겠습니다. 안에 들어가는 데이터는 우리가 input으로 받은 내용들을 넣고요. 이 `addHospital`이란 `mutation`을 실행한 유저를 또 `admin`으로 포함시킵니다.


```js
  admin: {
    connect: {  
      id: user.id     
    }
  },
```


이 코드를 보시면 `connect`라는걸 볼 수 있는데요. `admin` 필드에는 `User`가 들어가지요? 간단히 생각하면 `user.id`를 가진 사용자를 admin 필드에 들어가는 사용자로 넣어주는 작업입니다. 단순한 definition이 아니라 connect인 이유는 relation 때문인데요.


`Hospital`의 `admin` 필드와 `User`의 `adminof` 필드는 연결되어 있습니다. 따라서 유저를 병원의 `admin`에 **`connect`** 시키면, 해당 `User`의 `adminof`에는 이 `Hospital`이 자동으로 들어가게 됩니다.


- createHospital() 함수는 Hospital 객체를 return해줍니다. 따라서 


```js
return prisma.createHospital({ .... }) 
```


이런식으로 써주게 되면 prisma.createHospital로 만들어진 `Hospital` 객체가 자동으로 `return` 되게 됩니다.


정리하자면, `addHospital.js`는 우리가 graphql 파일에서 정의한 input들을 받고 프로세싱해서 output을 만들어주는 함수입니다. 이로서 Resolver 구성이 끝났습니다.


### 2.3.3 addHospital.js 시험해보기 (GraphQL playground)


이제 Resolver를 만들었으니 GraphQL playground에서 이 resolver가 잘 돌아가는지 시험해보겠습니다. localhost:4000을 통해 GraphQL playground에 접속합니다.


그리고 addHosptial resolver를 시험해봅니다. 예를 들어,


```js
mutation {
  addHospital(name: "Testopital", bio: "This is test") {
    id
    name
  }
}
```

이런 식의 mutaiton을 playground 내에 넣고 실행시켜볼 수 있겠죠. 한번 실행시켜 보겠습니다.

![Imgur](https://i.imgur.com/jJDJLum.png)

에러 메시지가 뜹니다. 잘 안보이실까봐 따로 적어보면:

```js
{
  "data": null,
  "errors": [
    {
      "message": "You need to log in to perform this action",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "addHospital"
      ]
    }
  ]
}
```

로그인을 해야 한다 합니다. 저희가 보낸 request의 header에 유저를 의미하는 Token이 없기 때문입니다.


하지만 GraphQL playground에는 이런 header를 만들수 있는 기능이 내장되어 있습니다. 방법은 다음과 같습니다.


![Imgur](https://i.imgur.com/zUPuIIR.png)


저희가 GraphQL mutatino이나 query를 입력하는 칸 아래에 http headers라 써진 부분이 보이시나요? 여기다


```
{
  "Authorization": "Bearer <JWT>"
}
```

여기서 `<JWT>` 자리에 Token을 집어넣어줍니다. Token은 어디서 받느냐면


#### **To-do-list**

1. 설치 ~ 실행 후 로그인. 이하 기능들.
  - [X] 백엔드 실행법
  - [X] 프론트엔드 실행법


2. hospital profile 만든 과정


  - 백엔드
  - [X] 레이아웃 설명
  - [X] datamodel 새로 만들기. Hosptial 데이터모델, 그에 따른 데이터모델 수정
  - [ ] Resolver 만들기
  - [ ] Hosptial.js computed field 만들기 + 그에 따른 models.graphql 수정


  - 프론트앤드
  - [ ] Routes에서 hosptial profile로 넘어가는 route 만들기
  - [ ] Header에서 해당 route로 연결해주는 링크 만들기?
  - [ ] ProfilePresenter, Container 역할 + 디자인

---
# 1. 설치하기

백엔드를 우선 실행해주세요. (백엔드 실행 관련해서는 [백엔드 리포지토리](https://github.com/slee333/prismagram)를 참조해주세요)
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