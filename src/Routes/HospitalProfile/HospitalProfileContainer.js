import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import HospitalProfilePresenter from "./HospitalProfilePresenter";
import React from "react";

// 병원 데이터 불러오기
const GET_HOSPITAL = gql`
  query seeHospital($name: String!) {
    seeHospital(name: $name) {
      id
      name
      bio
      files {
        url
        id
      }
      location
      staffs {
        id
        avatar
        fullName
        username
        isSelf
        bio
      }
      admin {
        id
        avatar
        fullName
        username
        isSelf
        bio
      }
      isYours
      staffsCount
      patientsCount
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(({ match: { params: { name } } }) => {

  const { data, loading } = useQuery(GET_HOSPITAL, {
    variables: { name }
  });

  const logOut = useMutation(LOG_OUT);
  
  return (
    <HospitalProfilePresenter
      loading={loading}
      logOut={logOut}
      data={data}
    />
  ); // 로딩 여부, 로그아웃 기능, 데이터를 ProfilePresenter에 Prop 으로 전달.
});
