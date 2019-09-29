import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

// * Authorization: 아폴로에서 GraphQL API에다 request를 보낼 때 Header에 token을 담아서 보냅니다. 
// Token은 User의 ID를 specify하기에 어떤 유저가 로그인했는지 알수있죠.

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


//"https://prismagram-backend.herokuapp.com",
