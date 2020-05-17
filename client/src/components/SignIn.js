import React, { useEffect } from "react";
import Welcome from "../static/signin.svg";
import { fetchUser } from "../actions";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);
  return (
    <div
      class="row "
      style={{ height: "100vh", backgroundColor: "rgb(250,250,250)" }}
    >
      <div
        class="three wide column  centered middle aligned"
        style={{ margin: "auto" }}
      >
        <a href="auth/google" class="ui google plus button">
          <i class="google icon"></i>
          Log In With Google
        </a>
      </div>
      <div class="eight wide column centered middle aligned">
        <img
          src={Welcome}
          alt="please sign in"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default SignIn;
