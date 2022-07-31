import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Loading.css";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const dispatch = useDispatch();
  return (
    <Fragment>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <div className="parent">
            <div className="child">
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
