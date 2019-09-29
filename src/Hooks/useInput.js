import { useState } from "react";

// React Hooks를 이용해서 state을 정의해줍니다.
// Hooks는 class를 이용해서 행하던 기존 workflow를 줄여줍니다.
// useInput은 사용자가 코멘트를 남기거나 할 때 사용됩니다.
export default defaultValue => {
  const [value, setValue] = useState(defaultValue);

  // 사용자가 코멘트를 쳐서 input 박스 안의 내용이 바뀔 때 마다 value (input value)를 변환해줍니다.
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
};
