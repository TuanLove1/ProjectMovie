import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import _ from "lodash";

export default function Booking(props) {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  console.log({ thongTinNguoiDung });
  const renderTicket = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const diaDiem = _.first(ticket.danhSachGhe);
      return (
        <div
          className="flex justify-around w-1/2 border-b pb-10 mb-10 border-gray-200"
          key={index}
        >
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center  bg-indigo-100 text-indigo-500 flex-shrink-0">
            <img src={ticket.hinhAnh} alt={ticket.hinhAnh} />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              {ticket.tenPhim}
            </h2>
            <p className="leading-relaxed text-base">
              Ngày đặt: {moment(ticket.ngayDat).format("hh:mm A DD-MM-YYYY")}
            </p>
            <p className="leading-relaxed text-base">{ticket.tenHeThongRap}</p>
            <p className="leading-relaxed text-base">
              Địa Điểm: {diaDiem.tenHeThongRap} - {diaDiem.tenCumRap}
            </p>
            <p className="leading-relaxed text-base">
              Số Ghế:{" "}
              {ticket.danhSachGhe.map((ghe, index) => {
                return (
                  <span key={index} className="ml-2 text-green-600 text-md">
                    {ghe.tenGhe}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="text-center">
        <h3 className="text-purple-700 text-2xl">Kết Quả Đặt Vé</h3>
        <h2> Chúc bạn xem phim vui vẻ</h2>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          {renderTicket()}
        </div>
      </section>
    </div>
  );
}
