import { fetchColorType } from "../actions/types";

export const initialState = {
  payload: "#40113f",
  isLoading: false,
  error: {},
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case fetchColorType.STARTED:
      return { ...state, isLoading: true };

    case fetchColorType.SUCCESS:
      return { ...state, payload, isLoading: false };

    case fetchColorType.FAILURE:
      return { ...state, error: error, isLoading: false };

    default:
      return state;
  }
};
