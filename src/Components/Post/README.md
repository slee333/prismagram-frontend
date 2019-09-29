# Post Component

가끔 커다란 component들은 이런식으로 여러 파일들로 구분되어 있습니다. (단독으로 넣기엔 너무 크니까)

## 1. 구성

1. index.js: 안에 별 거 없습니다. PostContainer를 export합니다.
2. PostContainer: Post를 구성하는데 필요한 변수들을 받아오고, Post와 관련된 여러 함수들을 정의합니다.
    - 이런 함수들을 바탕으로 PostPresenter를 return합니다.
3. PostPresenter: 실제로 Post를 구성하고 스타일링하는 부분입니다. CSS와 Post의 구성이 담겨있습니다.
4. PostQueries: Post에서 쓰는 GraphQL queries들을 모아둔 파일입니다.

Post 관련 디테일한 내용들은 각 문서 안에 코멘트 형식으로 남겨두었습니다.