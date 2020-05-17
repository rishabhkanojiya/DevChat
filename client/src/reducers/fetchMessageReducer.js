import { fetchMessageType } from "../actions/types";

export const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case fetchMessageType.STARTED:
      return { ...state, isLoading: true };

    case fetchMessageType.SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchMessageType.CREATE_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, payload],
        isLoading: false,
      };

    case fetchMessageType.FAILURE:
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
