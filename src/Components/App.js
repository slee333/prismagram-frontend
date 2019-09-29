import React from "react";

// GraphQL query를 사용하기 위한 아폴로를 떙겨오구요
import { gql } from "apollo-boost";

//미리 정의된 styled component들을 불러옵니다 (버튼 등이 이미 스타일링되어있음)
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";

// 아폴로와 리액트를 hook (일종의 연결? 쓰기 편하게) 해주는 react-apollo-hooks 역시 데려와줍니다.
import { useQuery } from "react-apollo-hooks";

// 로그인하고 아웃하고 할 때 옆에 작은 창이 뜹니다. 성공했다 안했다 알려주는. 그걸 Toastify가 해줘요
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 우리가 게속해서 쓰는 style들을 GlobalStyles로 저장해서 데려옵니다.
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";

// Routes (앱에서 향하는 Routes. 처음 로그인 후 이동하는 곳들입니다. 피드, 프로필, 검색창 등이 있겠죠)
import Routes from "./Routes";

// Footer와 Header입니다. 페이지의 아래쪽과 윗쪽
import Footer from "./Footer";
import Header from "./Header";

// GraphQL query를 아폴로를 이용해 웹 개발시 사용하는 방식입니다. 
// 사용자 사이드에서 로그인이 되었는지 확인하는 query입니다.
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

// 앱 자체를 싸는 Wrapper입니다. 모든걸 가운데 위치시킴.
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn}/>
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
