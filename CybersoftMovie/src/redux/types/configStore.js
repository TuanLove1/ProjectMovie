import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "../reducers/CarouselReducer";
import { ListMovieReducer } from "../reducers/ListMovieReducer";
import { QuanLyRapReducer } from "../reducers/QuanLyRapReducer";
import { QuanLyNguoiDungReducer } from "../reducers/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducer } from "../reducers/QuanLyDatVeReducer";
import { LoadingReducer } from "../reducers/LoadingReducer";
const rootReducers = combineReducers({
  // state
  CarouselReducer,
  ListMovieReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
