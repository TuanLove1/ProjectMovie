import React, { useEffect } from "react";
import HomeMenu from "../HomePageMenu";
import { useSelector, useDispatch } from "react-redux";
import { getListMovieAction } from "../../../../redux/actions/ListMovieAction";
import MultipleRow from "../../../../components/Rslick/MultipleRow";
import { layDanhSachHeThongRapAction } from "../../../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../../../components/HomeCarousel";

const contentStyle = {
  backgroundPosition: "top",
  backgroundsize: "cover",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
};

export default function HomePage() {
  const { arrListMovie } = useSelector((state) => state.ListMovieReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  console.log("heThongRapChieu", heThongRapChieu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListMovieAction());

    dispatch(layDanhSachHeThongRapAction());
  }, []);

  // const renderListMovie = () => {
  //   return arrListMovie.map((item, index) => {
  //     console.log(item);
  //     return (

  //     );
  //   });
  // };
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500"
      style={{

        ...contentStyle,
        // backgroundImage:
        //   "url(https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100)",
      }}
    >
      <HomeCarousel />
      <div className="container mx-auto">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto max-w-[80vw]">
            <MultipleRow arrFilm={arrListMovie} />
          </div>
        </section>

        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
