import { fetchChannelType } from "../actions/types";

export const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case fetchChannelType.STARTED:
      return { ...state, isLoading: true };

    case fetchChannelType.SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchChannelType.FETCH_MEMBER_SUCCESS:
      return {
        ...state,
        payload: payload,
        isLoading: false,
      };

    case fetchChannelType.FETCH_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, payload],
        isLoading: false,
      };

    case fetchChannelType.CREATE_SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchChannelType.EDIT_SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchChannelType.DELETE_SUCCESS:
      return {
        ...state,
        payload: state.payload.filter((item) => payload !== item._id),
        isLoading: false,
      };

    case fetchChannelType.FAILURE:
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
