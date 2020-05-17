import React from "react";
import { useForm } from "react-hook-form";
import { editCurrentChannel, fetchMemberChannels } from "../actions";
import { useDispatch, useSelector } from "react-redux";

// 5ebbccefcbcb611bf3d814ce
// ch;
// 5ec00a226a0f198f1e291908

const JoinChannel = ({ history }) => {
  const {
    payload: currentChannel,
    isLoading: currChannelLoading,
  } = useSelector((state) => state.currentChannel);

  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm();
  return (
    <div
      class="row "
      style={{ height: "100vh", backgroundColor: "rgb(250, 250, 250)" }}
    >
      <div class="six wide column centered  middle aligned">
        <h2 class="ui center aligned icon header purple">
          <i class="circular users icon"></i>
          Dev Chat
        </h2>

        <div class="ui segment center aligned">
          <form
            class="ui form"
            onSubmit={handleSubmit((data) => {
              currentChannel.members.push(data.joinChanId);
              editCurrentChannel(dispatch, currentChannel._id, {
                members: currentChannel.members,
              });
              history.push("/");
              reset();
            })}
          >
            <h4>Add A Member</h4>
            <div class="field">
              <div class="ui left icon input">
                <input
                  name="joinChanId"
                  type="text"
                  placeholder="Channel Id"
                  ref={register({ required: true })}
                />
                <i class="connectdevelop icon"></i>
              </div>
            </div>
            <button class="ui button purple " type="submit">
              Submit
            </button>
            <button
              onClick={async () => {
                await fetchMemberChannels(dispatch);

                history.push("/");
              }}
              class="ui button violet "
              style={{ marginLeft: "1rem" }}
              type="submit"
            >
              Go back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinChannel;
