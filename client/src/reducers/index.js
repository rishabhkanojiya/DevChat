import { combineReducers } from "redux";
import fetchUserReducer from "./fetchUserReducer";
import fetchChannelReducer from "./fetchChannelReducer";
import fetchMessageReducer from "./fetchMessageReducer";
import fetchCurrentChannelReducer from "./fetchCurrentChannelReducer";
import fetchColorReducer from "./fetchColorReducer";

export default combineReducers({
  color: fetchColorReducer,
  user: fetchUserReducer,
  channels: fetchChannelReducer,
  currentChannel: fetchCurrentChannelReducer,
  messages: fetchMessageReducer,
});
