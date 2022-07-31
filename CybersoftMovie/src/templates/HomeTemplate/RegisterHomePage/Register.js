import React from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import {
  dangKy,
  dangNhapAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const contentStyle = {
  backgroundPosition: "top",
  backgroundsize: "cover",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
};

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(userLogin, "userLogin");
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      const action = dangKy(values, navigate);
      dispatch(action);
      console.log("value", values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        style={{
          ...contentStyle,
          backgroundImage:
            "url(https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/movie-details-bg.jpg)",
        }}
      >
        <NavLink
          to="/"
          className="py-12 w-full bg-transparent lg:bg-transparent flex justify-center lg:justify-start lg:px-12 absolute "
        >
          <div className="cursor-pointer flex items-center">
            <div>
              <svg
                className="w-10 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 225 225"
                style={{ enableBackground: "new 0 0 225 225" }}
                xmlSpace="preserve"
              >
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                  }}
                />
                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                  <g>
                    <path
                      id="Layer0_0_1_STROKES"
                      className="st0"
                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              Cinema
            </div>
          </div>
        </NavLink>

        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  ĐĂNG KÝ{" "}
                </h3>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Tài Khoản
                  </label>
                  <input
                    name="taiKhoan"
                    onChange={formik.handleChange}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    placeholder="nhập tài khoản"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Mật khẩu
                  </label>
                  <input
                    name="matKhau"
                    type="password"
                    onChange={formik.handleChange}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    placeholder="Nhập email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Số Điện Thoại
                  </label>
                  <input
                    name="soDT"
                    type="text"
                    onChange={formik.handleChange}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Họ Tên
                  </label>
                  <input
                    name="hoTen"
                    type="text"
                    onChange={formik.handleChange}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    placeholder="Nhập họ tên"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Đăng Ký
                  </button>
                </div>
                <div className="pt-2 bg-white mx-auto rounded-2xl w-100">
                  Ban đã có tài khoản?
                  <NavLink
                    to=""
                    className="ml-1 cursor-pointer text-green-400 hover:text-green-600"
                  >
                    Đăng Nhập
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
