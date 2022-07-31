import React, { Fragment, useEffect } from "react";
import { TOKEN, USER_LOGIN } from "../../../utils/Settings/config";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Dropdown, Menu, Space } from "antd";
import style from "./Checkout.module.css";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../../redux/actions/QuanLyDatVeAction";
import { useParams } from "react-router-dom";
import { CloseOutlined, HomeOutlined } from "@ant-design/icons";
import { CHUYEN_TAB_ACTIVE, DAT_VE } from "../../../redux/constants";
import { ThongTinDatVe } from "../../../_core/models/ThongTinDatVe";
import _ from "lodash";
import "./Checkout.css";
import { layThongTinNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import Swal from "sweetalert2";
import Booking from "../../../components/BookingHistory/Booking";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  let { id } = useParams();
  useEffect(() => {
    const action = layChiTietPhongVeAction(id);
    dispatch(action);
  }, []);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  console.log({ danhSachGhe, danhSachGheKhachDat });

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let classGheDaDuocDat = "";

      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD != -1) {
        classGheDaDat = "gheDangDat";
      }

      if (danhSachGheDangDat.length === 5) {
        let timerInterval;
        Swal.fire({
          title: "Lưu ý!!!",
          html: "Bạn chỉ được phép đặt tối đa 5 ghế cùng một lúc thôi nhé :)",
          timer: 3000,
          timerProgressBar: false,
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
      console.log(danhSachGheDangDat.length, "ghe length");

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDangDat} ${classGheDaDat} ${classGheDaDuocDat}`}
          >
            {ghe.daDat ? (
              <CloseOutlined
                className="font-black"
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  let tienVePhim = danhSachGheDangDat
    .reduce((tongTien, ghe, index) => {
      return (tongTien += ghe.giaVe);
    }, 0)
    .toLocaleString();

  if (!localStorage.getItem(USER_LOGIN))
    return <Navigate replace to="/login" />;
  return (
    <div className="container min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div className="bg-green-400" style={{ width: "80%", height: 30 }}>
              <h1
                className="text-white text-center"
                style={{ lineHeight: "30px" }}
              >
                Màn hình
              </h1>
            </div>
            <div className={`${style["trapezoid"]} text-center`}></div>
            <div className="mt-5"></div>
            <div>{renderSeats()}</div>
            <div className="container lg:ml-8">
              <h1>Ghi chú:</h1>
              <div className="grid grid-cols-2">
                <div className="flex items-center">
                  <button className="ghe"></button>
                  <span>Ghế trống</span>
                </div>
                <div className="flex items-center">
                  <button className="ghe gheDangDat"></button>
                  <span>Ghế bạn đang chọn</span>
                </div>
                <div className="flex items-center">
                  <button className="ghe gheDaDuocDat"></button>
                  <span>Ghế bạn đã đặt</span>
                </div>
                <div className="flex items-center">
                  <button className="ghe gheVip"></button>
                  <span>Ghế VIP </span>
                </div>
                <div className="flex items-center">
                  <button className="ghe gheDaDat"></button>
                  <span>Ghế đã bán</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="text-green-400 text-center text-2xl">{tienVePhim}đ</h1>
          <hr />
          <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
          <p>
            Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            {" "}
            Ngày Chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400">Ghế</span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span key={index} className="text-green-600 text-xl ml-2">
                    {gheDD.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">{tienVePhim}đ</span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Số Điện Thoại</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="my-5">
            <i>Tài Khoản</i> <br />
            {userLogin.taiKhoan}
          </div>
          <hr />
          <div className="mb-0 flex flex-col justify-center items-center">
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                if (_.isEmpty(danhSachGheDangDat)) {
                  Swal.fire({
                    title: "Chọn tối thiểu 1 ghế để đặt vé",
                    icon: "error",
                    confirmButtonText: "Đã hiểu",
                  });
                } else {
                  dispatch(datVeAction(thongTinDatVe));
                }
              }}
              className="bg-red-600 text-white w-full text-center py-3 text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;
// const onChange = (key) => {
//   console.log(key);
// };

export default function CheckoutTabs(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: CHUYEN_TAB_ACTIVE,
        number: "1",
      });
    };
  }, []);

  const menu = (
    <Menu
      items={[
        {
          label: <NavLink to="/profile">Thông tin tài khoản</NavLink>,
          key: "0",
        },
        {
          label: (
            <NavLink
              to="login"
              onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                window.location.reload();
              }}
            >
              Đăng Xuất
            </NavLink>
          ),
          key: "1",
        },
      ]}
    />
  );

  const operations = (
    <div className="mr-4 flex justify-center items-center">
      <NavLink to="/">
        <HomeOutlined className="text-3xl" />
      </NavLink>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()} className="ml-3">
          <Space>Hello!{userLogin.taiKhoan}</Space>
        </a>
      </Dropdown>
    </div>
  );
  console.log("tabActive", tabActive);
  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHUYEN_TAB_ACTIVE,
            number: key,
          });
        }}
        tabBarExtraContent={operations}
      >
        <TabPane tab="01 CHỌN GHẾ - THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <Booking {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

// function BookingHistory(props) {
//   const { thongTinNguoiDung } = useSelector(
//     (state) => state.QuanLyNguoiDungReducer
//   );
//   const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const action = layThongTinNguoiDungAction();
//     dispatch(action);
//   }, []);

//   console.log({ thongTinNguoiDung });
//   const renderTicket = () => {
//     return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
//       const diaDiem = _.first(ticket.danhSachGhe);
//       return (
//         <div
//           className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col"
//           key={index}
//         >
//           <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center  bg-indigo-100 text-indigo-500 flex-shrink-0">
//             <img src={ticket.hinhAnh} alt={ticket.hinhAnh} />
//           </div>
//           <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
//             <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
//               {ticket.tenPhim}
//             </h2>
//             <p className="leading-relaxed text-base">
//               Ngày đặt: {moment(ticket.ngayDat).format("hh:mm A DD-MM-YYYY")}
//             </p>
//             <p className="leading-relaxed text-base">{ticket.tenHeThongRap}</p>
//             <p className="leading-relaxed text-base">
//               Địa Điểm: {diaDiem.tenHeThongRap} - {diaDiem.tenCumRap}
//             </p>
//             <p className="leading-relaxed text-base">
//               Số Ghế:{" "}
//               {ticket.danhSachGhe.map((ghe, index) => {
//                 return (
//                   <span key={index} className="ml-2 text-green-600 text-md">
//                     {ghe.tenGhe}
//                   </span>
//                 );
//               })}
//             </p>
//           </div>
//         </div>
//       );
//     });
//   };
//   return (
//     <div>
//       <div className="text-center">
//         <h3 className="text-purple-700 text-2xl">Kết Quả Đặt Vé</h3>
//         <h2> Chúc bạn xem phim vui vẻ</h2>
//       </div>
//       <section className="text-gray-600 body-font">
//         <div className="container px-5 py-24 mx-auto">{renderTicket()}</div>
//       </section>
//     </div>
//   );
// }
