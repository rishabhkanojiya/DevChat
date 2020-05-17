import {
  fetchUserType,
  fetchColorType,
  fetchMessageType,
  fetchChannelType,
  fetchCurrentChannelType,
} from "./types";
import axios from "axios";

export const fetchUserStarted = () => ({
  type: fetchUserType.STARTED,
});

export const fetchUserSuccess = (term) => ({
  type: fetchUserType.SUCCESS,
  payload: term,
});

export const fetchUserFailure = (error) => ({
  type: fetchUserType.FAILURE,
  payload: error,
});

export const fetchUser = async (dispatch) => {
  dispatch(fetchUserStarted());

  try {
    const response = await axios.get("/api/current_user");

    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure(error));
  }
};

export const fetchMessageStarted = () => ({
  type: fetchMessageType.STARTED,
});

export const fetchMessageSuccess = (term) => ({
  type: fetchMessageType.SUCCESS,
  payload: term,
});

export const createMessageSuccess = (term) => ({
  type: fetchMessageType.CREATE_SUCCESS,
  payload: term,
});

export const fetchMessageFailure = (error) => ({
  type: fetchMessageType.FAILURE,
  payload: error,
});

export const fetchMessage = async (dispatch, id) => {
  dispatch(fetchMessageStarted());

  try {
    const response = await axios.get(`/api/messages/channelId/${id}`);
    dispatch(fetchMessageSuccess(response.data));
  } catch (error) {
    dispatch(fetchMessageFailure(error));
  }
};

export const createMessage = async (dispatch, term) => {
  dispatch(fetchMessageStarted());

  try {
    const response = await axios.post("/api/messages", {
      ...term,
    });
    dispatch(createMessageSuccess(response.data));
  } catch (error) {
    dispatch(fetchMessageFailure(error));
  }
};

export const fetchChannelStarted = () => ({
  type: fetchChannelType.STARTED,
});

export const fetchChannelsSuccess = (term) => ({
  type: fetchChannelType.SUCCESS,
  payload: term,
});

export const fetchChannelSuccess = (term) => ({
  type: fetchChannelType.FETCH_SUCCESS,
  payload: term,
});

export const fetchMemberChannelSuccess = (term) => ({
  type: fetchChannelType.FETCH_MEMBER_SUCCESS,
  payload: term,
});

export const CreateChannelSuccess = (term) => ({
  type: fetchChannelType.CREATE_SUCCESS,
  payload: term,
});

export const EditChannelSuccess = (term) => ({
  type: fetchChannelType.EDIT_SUCCESS,
  payload: term,
});

export const DeleteChannelSuccess = (id) => ({
  type: fetchChannelType.DELETE_SUCCESS,
  payload: id,
});

export const fetchChannelFailure = (error) => ({
  type: fetchChannelType.FAILURE,
  payload: error,
});

export const fetchChannels = async (dispatch) => {
  dispatch(fetchChannelStarted());

  try {
    const response = await axios.get("/api/channels");
    dispatch(fetchChannelsSuccess(response.data));
  } catch (error) {
    dispatch(fetchChannelFailure(error));
  }
};

export const fetchMemberChannels = async (dispatch) => {
  dispatch(fetchChannelStarted());

  try {
    const response = await axios.get(`/api/channelsMemeber`);
    dispatch(fetchMemberChannelSuccess(response.data));
  } catch (error) {
    dispatch(fetchChannelFailure(error));
  }
};

export const fetchChannel = async (dispatch, id) => {
  dispatch(fetchChannelStarted());
  try {
    const response = await axios.get(`/api/channels/${id}`);
    // 5ebd44af1062b26a48cd0eb5

    dispatch(fetchChannelSuccess(response.data));
  } catch (error) {
    dispatch(fetchChannelFailure(error));
  }
};

export const createChannel = async (dispatch, term) => {
  dispatch(fetchChannelStarted());

  try {
    const response = await axios.post("/api/channels", {
      name: term.channelName,
      description: term.channelDetail,
      members: term.members,
    });
    dispatch(CreateChannelSuccess(response.data));
  } catch (error) {
    dispatch(fetchChannelFailure(error));
  }
};

export const editChannel = async (dispatch, term) => {
  dispatch(fetchChannelStarted());

  try {
    const response = await axios.get("/api/channels", {});
    dispatch(EditChannelSuccess(response.data));
  } catch (error) {
    dispatch(fetchChannelFailure(error));
  }
};

export const deleteChannel = async (dispatch, id) => {
  dispatch(fetchChannelStarted());

  try {
    const response = await axios.delete(`/api/channels/${id}`);
    dispatch(DeleteChannelSuccess(response.data._id));
  } catch (error) {
    dispatch(fetchChannelFailure(error));
  }
};

export const fetchCurrentChannelStarted = () => ({
  type: fetchCurrentChannelType.STARTED,
});

export const fetchCurrentChannelSuccess = (term) => ({
  type: fetchCurrentChannelType.SUCCESS,
  payload: term,
});

export const EditCurrentChannelSuccess = (term) => ({
  type: fetchCurrentChannelType.EDIT_SUCCESS,
  payload: term,
});

export const editMemberCurrentChannelSuccess = (term) => ({
  type: fetchCurrentChannelType.EDIT_MEMBER_SUCCESS,
  payload: term,
});

export const fetchCurrentChannelFailure = (error) => ({
  type: fetchCurrentChannelType.FAILURE,
  payload: error,
});

export const fetchCurrentChannel = async (dispatch, id) => {
  dispatch(fetchCurrentChannelStarted());

  try {
    const response = await axios.get(`/api/channels/${id}`);

    dispatch(fetchCurrentChannelSuccess(response.data));
  } catch (error) {
    dispatch(fetchCurrentChannelFailure(error.message));
  }
};

export const editCurrentChannel = async (dispatch, id, term) => {
  dispatch(fetchCurrentChannelStarted());
  try {
    const response = await axios.patch(`/api/channels/${id}`, {
      ...term,
    });

    dispatch(EditCurrentChannelSuccess(response.data));
  } catch (error) {
    dispatch(fetchCurrentChannelFailure(error.message));
  }
};

export const fetchColorStarted = () => ({
  type: fetchColorType.STARTED,
});

export const fetchColorSuccess = (term) => ({
  type: fetchColorType.SUCCESS,
  payload: term,
});

export const fetchColorFailure = (error) => ({
  type: fetchColorType.FAILURE,
  payload: error,
});

export const fetchColor = async (dispatch, term) => {
  dispatch(fetchColorStarted());

  try {
    dispatch(fetchColorSuccess(term));
  } catch (error) {
    dispatch(fetchColorFailure(error.message));
  }
};
