import React from "react";
import { useForm } from "react-hook-form";
import { createChannel, fetchMemberChannels } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const FormComp = ({ history }) => {
  const user = useSelector((state) => state.user.payload);
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
              createChannel(dispatch, { ...data, members: [user._id] });
              reset();
            })}
          >
            <h4>Create a channel</h4>
            <div class="field">
              <div class="ui left icon input">
                <input
                  name="channelName"
                  type="text"
                  placeholder="Channel Name"
                  ref={register({ required: true })}
                />
                <i class="file icon"></i>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <input
                  name="channelDetail"
                  type="text"
                  placeholder="Channel Detail"
                  ref={register({ required: true, minLength: 6 })}
                />
                <i class="info circle icon"></i>
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

export default FormComp;
