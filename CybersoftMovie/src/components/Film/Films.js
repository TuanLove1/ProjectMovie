import React from "react";

export default function Films(props) {
  const { phim } = props;
  return (
    <div className="mt-6 p-2 w-[350px] h-[520px] border-2 border-gray-200 border-opacity-60 rounded-lg ">
      <div
        style={{
          background: `url(${phim.hinhAnh})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="rounded-lg"
      >
        <img
          className="h-[400px] w-full opacity-0 rounded-lg"
          src={phim.hinhAnh}
          alt={phim.tenPhim}
        />
      </div>
      <div className="px-3">
        <h1 className="title-font text-lg font-medium text-gray-900 pt-2">
          {phim.tenPhim}
        </h1>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg">
          Đặt vé
        </button>
      </div>
    </div>
  );
}
