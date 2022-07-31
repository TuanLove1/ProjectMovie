import React from "react";
import { NavLink } from "react-router-dom";
import "./FilmsHover.css";
import Swal from "sweetalert2";

export default function FilmsHover(props) {
  const { phim } = props;
  return (
    <section className="page-contain">
      <div className="data-card bg-fuchsia-100">
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
            className="h-[320px] w-full opacity-0 rounded-lg"
            src={phim.hinhAnh}
            alt={phim.tenPhim}
          />
        </div>
        <h4 className="text-center font-medium">{phim.tenPhim}</h4>
        <p className="mt-[-1em] desmotA">
          {phim.moTa.split(" ").length > 20 ? (
            <span>{phim.moTa.split(" ").slice(0, 8).join(" ")} ...</span>
          ) : (
            <span>{phim.moTa}</span>
          )}
        </p>
        <div className="grid grid-cols-2 mt-[-4rem]">
          <NavLink
            to={`/detail/${phim.maPhim}`}
            className="cardin bg-transparent py-2 px-4 border rounded text-center"
          >
            <button>Đặt Vé</button>
          </NavLink>
          <button
            className="cardin bg-transparent py-2 px-4 border rounded"
            onClick={() => {
              Swal.fire({
                html: `<iframe allowfullscreen=${true} width=${1000} height=${600} src=${phim.trailer
                  }  iframeborder=${0}></iframe> `,

                width: "1000px",
                height: "600px",
              });
            }}
          >
            Xem Trailer
          </button>
        </div>
      </div>
    </section>
  );
}
