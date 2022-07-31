import { baseService } from "./baseService";
import { MAGRPHIM } from "../utils/Settings/config";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }
  layDanhSachHeThongRap = () => {
    return this.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MAGRPHIM}`
    );
  };
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
}

export const quanLyRapService = new QuanLyRapService();
