import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Dropdown, Menu, Space } from "antd";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../utils/Settings/config";
import { FcFilmReel } from 'react-icons/fc'

const { Option } = Select;

export default function Header() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { t, i18n } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(`${value}`);
    console.log(`selected ${value}`);
  };

  console.log(userLogin, "taokhoan");
  const menu = (
    <Menu
      items={[
        {
          label: <NavLink to="profile">Thông tin tài khoản</NavLink>,
          key: "0",
        },
        {
          label: (
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                window.location.reload();
              }}
            >
              Đăng Xuất
            </NavLink>
          ),
          key: "1",
        },
      ]}
    />
  );

  return (
    <header className="p-4 bg-black">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <FcFilmReel className="text-[48px]" />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent transition duration-500 text-gray-100"
                  : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-red-600"
              }
            >
              {t("Trang Chủ")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent transition duration-500 text-gray-100"
                  : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-red-600"
              }
            >
              {t("Tin Tức")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent transition duration-500 text-gray-100"
                  : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-red-600"
              }
            >
              {t("Liên Hệ")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {/* {renderLogin()} */}
          {_.isEmpty(userLogin) ? (
            <Fragment>
              <NavLink to="register">
                <button className="self-center px-8 py-3 rounded">
                  {t("Đăng Ký")}
                </button>
              </NavLink>
              <NavLink className="mr-3" to="login">
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
                  {t("Đăng Nhập")}
                </button>
              </NavLink>
            </Fragment>
          ) : (
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()} className="mr-2">
                <Space>Hello!{userLogin.taiKhoan}</Space>
              </a>
            </Dropdown>
          )}

          <Select
            defaultValue="vi"
            style={{ width: 70 }}
            onChange={handleChange}
          >
            <Option value="en">EN</Option>
            <Option value="vi">VN</Option>
          </Select>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
