import React, { useEffect } from "react";
import "./styles/App.scss";
import { useSelector } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import MainSlack from "./MainSlack";
import FormComp from "./FormComp";
import JoinChannel from "./JoinChannel";

const App = ({ history }) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.payload.googleId) {
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, [user]);

  return (
    <>
      <div class="ui grid" style={{ height: "100vh" }}>
        <Switch>
          <Route exact path="/" component={MainSlack} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/channel" component={FormComp} />
          <Route exact path="/join" component={JoinChannel} />
        </Switch>
      </div>
    </>
  );
};

export default withRouter(App);
