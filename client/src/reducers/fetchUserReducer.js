import { fetchUserType } from "../actions/types";

export const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case fetchUserType.STARTED:
      return { ...state, isLoading: true };

    case fetchUserType.SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchUserType.FAILURE:
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
