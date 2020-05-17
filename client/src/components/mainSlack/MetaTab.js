import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MetaTab = () => {
  const user = useSelector((state) => state.user.payload);

  const {
    payload: currentChannel,
    isLoading: currChannelLoading,
  } = useSelector((state) => state.currentChannel);

  return (
    <div class="MetaTab">
      <div class="MetaTab__heading">About #{currentChannel.name}</div>
      <div class="box">
        <div class="MetaTab__head">Channel Details</div>
        <div class="MetaTab__item">User ID : {user._id}</div>

        <div class="MetaTab__item">{currentChannel.description}</div>
        <div class="MetaTab__item">Channel Link : {currentChannel._id}</div>
        <div class="MetaTab__item">
          <Link to="/join">Add Member</Link>
        </div>
      </div>
    </div>
  );
};

export default MetaTab;
