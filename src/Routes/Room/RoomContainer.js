import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import RoomPresenter from "./RoomPresenter";
import React, {useState} from "react";
import Chat from "../../Components/Chat/Chat"
import Login from "../../Components/Chat/Login"

import { NotificationContainer } from "react-notifications";


import { tokenUrl, instanceLocator } from '../../config'



// 채팅방 데이터 불러오기
const GET_ROOM = gql`
  query seeRoom($id: String!) {
    seeRoom(id: $id) {
      id
      participants{
        id
        avatar
        username
        email
        fullName
      }
      messages{
        id
        text
        from
        to
        room
        createdAt
        updatedAt
      }
    }
  }
`;


export default withRouter(({ match: { params: { id } } }) => {

    const { data, loading } = useQuery(GET_ROOM, {
      variables: { id }
    });

    const [user, setUser] = useState(null);
  
    const renderApp = () => {
      // Render Chat component when user state is not null
      if (user) {
        return <Chat user={user} />;
      } else {
        return <Login setUser={setUser} />;
      }
    };
    return (
      <div className='container'>
      <NotificationContainer />
      {renderApp()}  
      
      <RoomPresenter
        loading={loading}
        data={data}
      />
       </div>
    ); 
  });
  

