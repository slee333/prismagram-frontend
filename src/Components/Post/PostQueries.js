import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
export const ADD_POST = gql`
  mutation upload($caption: String!, $files: [String!]!, $location:String) {
    upload(caption:$caption, files:$files, location:$location) {
      id
      caption
      location
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;