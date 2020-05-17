import React, { useEffect } from "react";
import SideBar from "./mainSlack/SideBar";
import MainNav from "./mainSlack/MainNav";
import MainMessage from "./mainSlack/MainMessage";
import MetaTab from "./mainSlack/MetaTab";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemberChannels } from "../actions";

const MainSlack = ({ history }) => {
  const color = useSelector((state) => state.color.payload);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchMemberChannels(dispatch);
    //  (dispatch);
  }, []);
  return (
    <div class="row " style={{ height: "100%" }}>
      <div class="one wide column" style={{ backgroundColor: color }}>
        <SideBar />
      </div>
      <div
        class="three wide column"
        style={{ backgroundColor: color, filter: "brightness(120%)" }}
      >
        <MainNav history={history} />
      </div>
      <div class="eight wide column">
        <MainMessage history={history} />
      </div>
      <div class="three wide column">
        <MetaTab />
      </div>
    </div>
  );
};

export default MainSlack;
