import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../redux/actions/CarouselActions";

const contentStyle = {
  height: "800px",
  color: "#fff",
  // lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition: "center",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
};
export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  console.log("arrImg", arrImg);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img
              className="w-full opacity-0"
              src={item.hinhAnh}
              alt={item.hinhAnh}
            />
          </div>
        </div>
      );
    });
  };

  return <Carousel autoplay>{renderImg()}</Carousel>;
}
