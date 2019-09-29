import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

// 아까 Header에서 서치박스에서 `/search?term=${search.value}` 이런식으로 url을 리다이렉트했죠.
export default withRouter(({ location: { search } }) => {
  
  // `/search?term=${search.value} 를 split해서 search.value만 얻어줍니다.
  const term = search.split("=")[1];

  // term이 undefined인 경우엔 아무것도 하지 말고,
  // 그렇지 않은 경우에는 term을 input으로 해 SEARCH query를 실행해서
  // data, loading을 받아옵니다.
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });

  // 이후 SearchPresenter를 렌더
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
