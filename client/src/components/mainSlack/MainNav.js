import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentChannel, fetchMessage } from "../../actions";

const MainNav = ({ history }) => {
  const { user, channels } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchMemberChannels(dispatch);
  // }, []);

  const renderChannelList = () => {
    return channels.payload.map(({ name, _id }) => {
      return (
        <div
          key={_id}
          class="MessageNav__item"
          onClick={() => {
            fetchCurrentChannel(dispatch, _id);
            fetchMessage(dispatch, _id);
          }}
        >
          #{name}
        </div>
      );
    });
  };

  const renderStarred = () => {
    return channels.payload.map(({ name, _id, isStarred }) => {
      if (isStarred) {
        return (
          <div
            key={_id}
            class="MessageNav__item"
            onClick={() => {
              fetchCurrentChannel(dispatch, _id);
            }}
          >
            #{name}
          </div>
        );
      }
    });
  };
  return (
    <div class="MessageNav">
      <div class="MessageNav__header">
        <i class="terminal icon"></i> Dev Chat
      </div>
      <div class="dropdown">
        <span className="dropdown__header">{user.payload.name}</span>
        <div class="dropdown__content">
          <a href="/api/logout" className="dropdown__content--item">
            Sign Out
          </a>
        </div>
      </div>
      <div
        class="MessageNav__title"
        onClick={() => {
          history.push("/channel");
        }}
      >
        Channels({channels.payload.length})
      </div>
      {renderChannelList()}
      <div class="MessageNav__end"></div>
      <div class="MessageNav__title">Starred</div>
      {renderStarred()}
      <div class="MessageNav__end"></div>
    </div>
  );
};

export default MainNav;
