import { SET_HE_THONG_RAP_CHIEU } from "../constants";

const initialState = {
  heThongRapChieu: [],
};

export const QuanLyRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      state.heThongRapChieu = action.heThongRapChieu;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
