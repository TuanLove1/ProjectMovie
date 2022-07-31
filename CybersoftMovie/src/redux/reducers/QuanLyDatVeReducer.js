import Swal from "sweetalert2";
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import {
  DAT_VE,
  SET_CHI_TIET_PHONG_VE,
  DAT_VE_DONE,
  CHUYEN_TAB,
  CHUYEN_TAB_ACTIVE,
} from "../constants";

const stateDefault = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
  tabActive: "1",
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }
    case DAT_VE: {
      //cap nhat danh sach ghe dang dat
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index != -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        if (danhSachGheCapNhat.length < 5) {
          danhSachGheCapNhat.push(action.gheDuocChon);
        }
      }

      console.log(action.gheDuocChon, "ghe dc chon");

      console.log(danhSachGheCapNhat, "ghe cap nhat");

      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }
    case DAT_VE_DONE: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }
    case CHUYEN_TAB: {
      state.tabActive = "2";

      return { ...state };
    }
    case CHUYEN_TAB_ACTIVE: {
      state.tabActive = action.number;
    }
    default:
      return { ...state };
  }
};
