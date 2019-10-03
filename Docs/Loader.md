Loader.js는 아래와 같습니다.

```js

import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
`;

// Logo는 인스타그램 로고이고, 거기다 애니메이션을 1초간격으로 지정한다음 무한반복시키는 단순한 loader입니다.
export default () => (
  <Loader>
    <Logo size={36} />
  </Loader>
);
```

구조를 하나하나 살펴볼게요.

---
```js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";
```


못보던 요소들이 몇가지 있는데요. 한가지는 keyframe입니다. 저희가 사용하는 요소의 애니메이션을 정의할 때 쓰는데, keyframe의 몇 %가 지남에 따라 엘리먼트의 스타일을 어떻게 변화시킬 수 있는지 정의할 수 있도록 해줍니다. 나머지 코드를 살펴보면 이해가 보다 쉬울겁니다.


`Logo`는 Icons.js에서 불러온 인스타그램 로고입니다. Icons.js에 들어가시면 우리가 사용하는 아이콘들(ex. 프로필 아이콘, 인스타그램 아이콘, Like 버튼 아이콘 등)을 모아놓았습니다. `<svg>` 라고 하는데, standard vector graphics란 뜻입니다. SVG가 무엇인지는 [이 링크](https://datadesign-ybigta.github.io/slides/2017-d3study/ch3/index.html)를 참고해주세요.


나머지 코드를 한번 볼게요.

```js

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
`;
```

보시면 변수 `Animation`을 keyframes를 이용해 정의한 것을 보실 수 있습니다. keyframe이 몇초건 간에 시작에는 불투명도를 0으로, 50%가 지나면 불투명도를 1로, 다시 100%일땐 불투명도를 0으로 만들어줍니다.


밑에 Loader라는 `div`의 style을 정의해주는 부분에서 이 `Animation`이 쓰이게 됩니다. 


`animation: ${Animation} 1s linear infinite;`라는 부분이 있는데, 여기서:


- 1s는 keyframe의 길이를 의미합니다.


- linear은 animation을 어떤 식으로 행할지?를 결정합니다. 저희는 앞서 Animation에서 keyframe이 지남에 따라 불투명도를 0에서 100으로, 다시 0으로 바꾸었잖아요? 이 과정을 선형으로 해서 변화의 정도가 일정하도록 할지, 아니면 다른 옵션 (ex. ease-in) 을 통해서 천천히 시작했다가 변화가 빨라지게 할지 결정하는거죠.


- infinite: 애니메이션이 계속 반복되게 해줍니다.


결과적으로, `Loader`라는 `div` 안에 있는 요소들은 전부 1초에 한번씩 깜빡이게 됩니다.


```js
export default () => (
  <Loader>
    <Logo size={36} />
  </Loader>
);
```

그리고 이 `Loader` 라는 `div` 안에 앞서 불러온 인스타그램 로고를 넣어줌으로서, 로딩 중에 인스타그램 로고를 계속 깜빡이게 하는 Loader 컴포넌트가 완성되게 됩니다.