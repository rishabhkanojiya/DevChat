import { fetchCurrentChannelType } from "../actions/types";

export const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case fetchCurrentChannelType.STARTED:
      return { ...state, isLoading: true };

    case fetchCurrentChannelType.SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchCurrentChannelType.EDIT_SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchCurrentChannelType.EDIT_MEMBER_SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchCurrentChannelType.FAILURE:
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
