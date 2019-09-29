import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Notifications from "../Routes/Notifications"

// 일종의 라우터입니다.
// './explore'은 explore란 Component로, path "/" 는 Feed 란 component로 가는 식이죠
// src/Routes 안에 이렇게 라우팅하는 component들이 들어있습니다.

// Profile로 가는 Route이 뒤에 위치한 이유는... 
// 프로필은 /username을 입력해서 접속하게 되는데, Profile로 향하는 Route를 상위에 배치할경우 explore나 search에 접근하려 할 때 해당 컴포넌트가 아닌 search/explore란 유저를 찾게 됩니다.

// Switch: 딱 하나의 Route만 렌더링할 수 있게 도와줍니다.
const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/notifications" component={Notifications} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

// 로그아웃시 메인페이지로
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

// 로그인이 true냐 false냐 따라 LoggedInRoutes / LoggedOutRoutes를 보내줍니다.
// 로그인시 해당 url에 따른 창이 나타납니다.
const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

// AppRouter에 필요한 propTypes을 정의. isLoggedIn은 꼭 필요합니다.
AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
