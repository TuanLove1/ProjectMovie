import { SET_CAROUSEL } from "../constants/index";
import { quanLyPhimService } from "../../services/QuanLyPhimService";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();
      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
