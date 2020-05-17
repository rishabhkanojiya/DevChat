import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchCurrentChannel,
  deleteChannel,
  editCurrentChannel,
  createMessage,
  fetchMessage,
} from "../../actions";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const MainMessage = ({ history }) => {
  const [Starred, setStarred] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const channels = useSelector((state) => state.channels.payload);
  const user = useSelector((state) => state.user.payload);
  const { payload: messages, isLoading: mLoading } = useSelector(
    (state) => state.messages
  );
  const { register, handleSubmit, reset, watch } = useForm();
  watch("search");
  const {
    payload: currentChannel,
    isLoading: currChannelLoading,
  } = useSelector((state) => state.currentChannel);
  const {
    _id: id,
    name,
    description,
    isStarred,
    owner: channelOwner,
    members,
  } = currentChannel;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchMemberChannels(dispatch);
  // }, []);
  // useEffect(() => {
  //   if (members && members.includes(user._id)) {
  //     fetchChannel(dispatch, id);
  //   }
  // }, []);

  useEffect(() => {
    if (firstLoad && channels.length > 0) {
      const { _id } = channels[0];
      fetchCurrentChannel(dispatch, _id);
      fetchMessage(dispatch, _id);
      setFirstLoad(false);
    }
  }, [firstLoad]);
  // useEffect(() => {
  //   console.log(currentChannel);
  //   if (Object.keys(currentChannel).length) {
  //     const { id } = currentChannel[0];
  //     console.log(id);
  //     fetchMessage(dispatch, id);
  //     setActive(false);
  //   }
  // }, [Active]);

  const deleteChannelHelper = () => {
    deleteChannel(dispatch, id);
    setFirstLoad(true);
  };

  const setStarHelper = () => {
    setStarred(!Starred);
    editCurrentChannel(dispatch, id, { isStarred: Starred });
  };
  const renderMessage = () => {
    return messages.map(({ message, owner, memName, member, _id }) => {
      return (
        <div
          key={_id}
          // className="msg__item msg__item--left"
          class={`msg__item ${
            user._id === member ? "msg__item--right" : "msg__item--left"
          } `}
        >
          <div class="msg__item--user">
            {memName.split(" ")[0].toUpperCase()}
          </div>
          <div class="msg__item--message">{message}</div>
        </div>
      );
    });
  };

  if (currChannelLoading) {
    return <Spinner />;
  } else if (currentChannel.length) {
    history.push("/channel");
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "1rem",
        }}
      >
        <div>
          <Link to="/channel">Create A Channel</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div class="MainChat">
        <div class="sheader">
          <div class="sheader__title">
            #{name}
            <i
              onClick={setStarHelper}
              class={`${isStarred ? "star " : "star outline"} icon`}
              style={{ marginLeft: "1rem" }}
            ></i>
          </div>
          <button className="sheader__delete" onClick={deleteChannelHelper}>
            Delete
          </button>

          <span className="sheader__user">{description}</span>
          <input
            className="sheader__input"
            type="text"
            name="search"
            placeholder="Search"
            ref={register}
          />
        </div>
        <div class="msg">
          <div class="msg__box">{renderMessage()}</div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            createMessage(dispatch, {
              channelId: id,
              member: user._id,
              memName: user.name,
              message: data.message,
            });

            // setActive(true);
            reset();
          })}
          class="input"
        >
          <input
            className="input__msg"
            type="text"
            name="message"
            placeholder="Write a Message"
            ref={register({ required: true })}
          />
          <button class="input__btn">Send</button>
        </form>
      </div>
    );
  }
};

export default MainMessage;
