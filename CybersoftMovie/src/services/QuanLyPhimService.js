import { baseService } from "./baseService";
import { MAGRPHIM } from "../utils/Settings/config";

export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }
  layDanhSachBanner = () => {
    return this.get(`api/QuanLyPhim/LayDanhSachBanner`);
  };
  layDanhSachPhim = () => {
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${MAGRPHIM}`);
  };
}

export const quanLyPhimService = new QuanLyPhimService();
