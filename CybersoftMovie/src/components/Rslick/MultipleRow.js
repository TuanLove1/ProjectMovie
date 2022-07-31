import React, { Component } from "react";
import Slider from "react-slick";
import Films from "../Film/Films";
import styleSlick from "./MultipleRow.module.css";
import FilmsHover from "../Film/FilmsHover";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.ListMovieReducer
  );
  const dispatch = useDispatch();
  const renderFilm = () => {
    return props.arrFilm.map((item, index) => {
      return (
        <div className={styleSlick["width-item"]} key={index}>
          {/* <Films phim={item} /> */}
          <FilmsHover phim={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    preArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  return (
    <div>
      <button
        type="button"
        className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded-full dark:bg-[#753BBD] dark:text-white mr-2`}
        onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU };
          dispatch(action);
        }}
      >
        Phim Đang Chiếu
      </button>
      <button
        type="button"
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800`}
        onClick={() => {
          const action = { type: SET_FILM_SAP_CHIEU };
          dispatch(action);
        }}
      >
        Phim Sắp Chiếu
      </button>
      <Slider {...settings}>{renderFilm()}</Slider>
    </div>
  );
};

export default MultipleRows;
