import React from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import HospitalProfilePresenter from "./HospitalProfilePresenter";

// 병원 데이터 불러오기
const GET_HOSPITAL = gql`
  query seeUser($name: String!) {
    seeUser(name: $name) {
      id 
      name
      bio
      files {
        url
      }
      location
      # posts {
      #   id
      #   files {
      #     url
      #   }
      #   likeCount
      #   commentCount
      }
    }
  }
`;

// 사용자가 Medical Staff인지 환자인지 확인
const CHECK_USER = gql`
  query isStaff($username: String!) {
    isStaff(username: $name)
  }
`
export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

// props: { match: { params : { username }}} 형식으로 Routes에서 받기 때문에 input을 이런식으로 정의해줍니다.
export default withRouter(({ match: { params: { hospitalname } } }) => {
  // 바로 username으로 query하는데 써먹어주기 위해서요.
  const { data, loading } = useQuery(GET_HOSPITAL, { variables: { hospitalname } }); 
  const logOut = useMutation(LOG_OUT);
  const isStaff = useMutation (CHECK_USER)
  return <HospitalProfilePresenter loading={loading} isStaff logOut={logOut} data={data} />; // 로딩 여부, 로그아웃 기능, 데이터를 ProfilePresenter에 Prop 으로 전달.
});
