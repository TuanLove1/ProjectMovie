import { GET_LIST_MOVIE } from "../constants/index";
import { quanLyPhimService } from "../../services/QuanLyPhimService";

export const getListMovieAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim();
      dispatch({
        type: GET_LIST_MOVIE,
        arrListMovie: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
