import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    // thong tin dang nhap tai khoan, mat khuan
    return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };

  layThongTinNguoiDung = () => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  capNhatNguoiDung = (user) => {
    return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
