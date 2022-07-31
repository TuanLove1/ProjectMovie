import Swal from "sweetalert2";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { DANG_NHAP, SET_THONG_TIN_NGUOUI_DUNG } from "../constants";

export const dangNhapAction = (thongTinDangNhap, navigate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        console.log("result", result);
        dispatch({
          type: DANG_NHAP,
          thongTinDangNhap: result.data.content,
        });
        // chuyen huong dang nhap
        navigate(-1, { replace: true });
      }
    } catch (errors) {
      console.log(errors, "errors");
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        console.log("result", result);
        dispatch({
          type: SET_THONG_TIN_NGUOUI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (errors) {
      console.log(errors, "errors");
    }
  };
};

export const capNhatNguoiDungActionForUser = (user, navigate) => {
  return async () => {
    const result = await quanLyNguoiDungService.capNhatNguoiDung(user);
    try {
      if (result.data.statusCode === 200) {
        await Swal.fire({
          title: "cập nhật thành công!!",
          text: "đăng nhập lại để xem thay đổi",
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log("result123", result);

        navigate(-1, { replace: true });
      }
    } catch (errors) {
      Swal.fire({
        title: "có lỗi xảy ra!!!",
        text: errors.response.data.content,
        icon: "error",
        confirmButtonText: "đã hiểu",
      });
    }
  };
};

export const dangKy = (thongTinDangKy, navigate) => {
  return async () => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      if (result.data.statusCode === 200) {
        Swal.fire({
          title: "Đăng Ký thành công!!",
          icon: "success",
          confirmButtonText: "đăng nhập ngay",
        });
        navigate("/login", { replace: true });
      }
    } catch (error) {
      Swal.fire({
        title: "có lỗi xảy ra!!!",
        text: error.response.data.content,
        icon: "error",
        confirmButtonText: "đã hiểu",
      });
    }
  };
};
