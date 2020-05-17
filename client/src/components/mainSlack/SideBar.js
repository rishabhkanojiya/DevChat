import React from "react";

import { useDispatch } from "react-redux";
import { fetchColor } from "../../actions";

const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <div class="sideNav">
      <button
        class="sideNav__item "
        style={{ backgroundColor: "#40113f" }}
        onClick={() => {
          fetchColor(dispatch, "#40113f");
        }}
      ></button>
      <button
        class="sideNav__item"
        style={{ backgroundColor: "#311b92" }}
        onClick={() => {
          fetchColor(dispatch, "#311b92");
        }}
      ></button>
      {/* 009688 */}
      <button
        class="sideNav__item"
        style={{ backgroundColor: "#00695c" }}
        onClick={() => {
          fetchColor(dispatch, "#00695c");
        }}
      ></button>{" "}
      <button
        class="sideNav__item"
        style={{ backgroundColor: "#263238" }}
        onClick={() => {
          fetchColor(dispatch, "#263238");
        }}
      ></button>{" "}
      <button
        class="sideNav__item"
        style={{ backgroundColor: "#212121" }}
        onClick={() => {
          fetchColor(dispatch, "#212121");
        }}
      ></button>
      {/* <div class="sideNav__add">+</div> */}
    </div>
  );
};

export default SideBar;
