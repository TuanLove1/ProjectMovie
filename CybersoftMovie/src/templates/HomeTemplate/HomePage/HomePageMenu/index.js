import React, { Fragment, useState } from "react";
import { Tabs } from "antd";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;
export default function HomeMenu(props) {
  let [tabPosition] = useState("left");
  const { heThongRapChieu } = props;

  console.log(props, "prop123");

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane
          tab={<img src={heThongRap.logo} className="rounded-full w-14" />}
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div className="w-80 flex">
                      <img
                        src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
                        className="w-14"
                      />
                      <div className="ml-3 text-left text-white">
                        {cumRap.tenCumRap}
                        <p className="my-0 ">{cumRap.diaChi}</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="flex my-2">
                          <img
                            style={{ width: 100, height: 100 }}
                            src={phim.hinhAnh}
                            alt={phim.hinhAnh}
                          />
                          <div className="ml-3">
                            <div className="text-[#A78BFA] text-lg">
                              {phim.tenPhim}
                            </div>
                            <p className="my-2 text-white">{cumRap.diaChi}</p>
                            <div className="grid grid-cols-6 gap-6">
                              {phim.lstLichChieuTheoPhim
                                ?.slice(0, 12)
                                .map((lichChieu, index) => {
                                  return (
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                      key={index}
                                      className="mt-4"
                                    >
                                      <button className="font-bold rounded-sm border border-gray-200 p-2 text-green-700  text-xs bg-[#fafafa] hover:text-[#fb4226] mr-2">
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </button>
                                    </NavLink>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
}
