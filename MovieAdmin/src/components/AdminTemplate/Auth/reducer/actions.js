import * as ActionType from "./constants";
import { api } from '../../../../api/apiUtil';
// import { history } from '../../../../history.js';
import { Navigate } from "react-router-dom";
import Loading from "../../../../Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export const actLoginFetchData = (user) => {
    return (dispatch) => {
        dispatch(actLoginMovieRequest())
        api.post(`QuanLyNguoiDung/DangNhap`, user)
            .then((result) => {
                if (result.data.content.maLoaiNguoiDung === "KhachHang") {
                    //Bao Loi
                    return Promise.reject({
                        response: {
                            data: {
                                content: "Tài Khoản Không Có Quyền Truy Cập!",
                            },
                        },
                    });
                }
                console.log(result.data.content);
                dispatch(actLoginMovieSuccess(result.data.content));
                localStorage.setItem('TOKEN', JSON.stringify(result.data.content.accessToken));
                localStorage.setItem('user', JSON.stringify(result.data.content));
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Đăng nhập thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success',
                    show: false
                });
                // history.push("/admin");
                <Navigate replace to="/admin" />
                // console.log("ADMIn")
                // window.location.replace('/admin');
            })
            .catch((error) => {
                dispatch(actLoginMovieFailed(error));
            })
    }
}
const actLoginMovieRequest = () => {
    return {
        type: ActionType.LOGIN_MOVIE_REQUEST
    }
}
const actLoginMovieSuccess = (data) => {
    return {
        type: ActionType.LOGIN_MOVIE_SUCCESS,
        payload: data,
    }
}
const actLoginMovieFailed = (error) => {
    return {
        type: ActionType.LOGIN_MOVIE_FAILED,
        payload: error
    }
}