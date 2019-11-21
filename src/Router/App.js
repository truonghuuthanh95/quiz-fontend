import React from "react";
import Quiz from "../containers/Quiz";
import Login from "../containers/Login";
import Result from "../containers/Result";
import MonitorQuiz from "../containers/MonitorQuiz";
import NotFound from "../containers/NotFound";
import { TIME_END_QUIZ } from "../utils/constants";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Test from '../containers/NotFound/indextest';
import THPTLogin from '../containers/Login/THPTLogin';
// import Auth from './Auth';
const Auth = ({path, Component}) => {
  return (
    <Route
      path={path}
      render={routeProps => {
        if (localStorage.getItem(TIME_END_QUIZ)) {
          return <Component {...routeProps} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
          {/* <THPTLogin/> */}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/resultmonitoring">
          <MonitorQuiz />
        </Route>
        <Auth path="/results" Component={Test} />
        <Route>
          <NotFound />
        </Route>
        <Redirect to="/notfound" />
      </Switch>
    </Router>
  );
}
export default App;
