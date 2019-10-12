import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      patientof {
        id
        name
      }
      adminof {
        id
        name
      }
      staffof {
        id
        name
      }
    }
  }
`;
