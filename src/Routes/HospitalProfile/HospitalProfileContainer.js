import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
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
        profession
        posts {
          id
          location
          caption
          files {
            id
            url
          }
          user {
            id
            avatar
            username
          }
          likeCount
          isLiked
          comments {
            id
            text
            user {
              id
              username
            }
          }
          createdAt
        }
      }
      admin {
        id
        avatar
        fullName
        username
        isSelf
        bio
        profession
        posts {
          id
          location
          caption
          files {
            id
            url
          }
          user {
            id
            avatar
            username
          }
          likeCount
          isLiked
          comments {
            id
            text
            user {
              id
              username
            }
          }
          createdAt
        }
      }
      patients {
        posts {
          id
          location
          caption
          files {
            id
            url
          }
          user {
            id
            avatar
            username
          }
          likeCount
          isLiked
          comments {
            id
            text
            user {
              id
              username
            }
          }
          createdAt
        }
      }
      isYours
      address
      staffsCount
      patientsCount
      avatar
      posts {
        id
        location
        caption
        files {
          id
          url
        }
        likeCount
        isLiked
        comments {
          id
          text
          user {
            id
            username
          }
        }
        createdAt
      }
    }
  }
`;

export default withRouter(({ match: { params: { name } } }) => {
  const { data, loading } = useQuery(GET_HOSPITAL, {
    variables: { name }
  });

  return <HospitalProfilePresenter loading={loading} data={data} />; // 로딩 여부, 로그아웃 기능, 데이터를 ProfilePresenter에 Prop 으로 전달.
});
