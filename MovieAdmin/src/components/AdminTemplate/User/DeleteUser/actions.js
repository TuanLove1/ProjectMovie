import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { api } from '../../../../api/apiUtil';
import * as ActionType from "./constants";

export const actDeleteUser = (taiKhoan) => {
    return (dispatch) => {
        dispatch(actDeleteUserRequest());
        api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
        .then((result)=>{
            dispatch(actDeleteUserSuccess(result.data.content))
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Xóa người dùng thành công!</strong>,
                html: <i>You clicked the button!</i>,
                icon: 'success',
                show: false
            });
        })
        .catch((error)=>{
            dispatch(actDeleteUserFailed(error))
            console.log(error);
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>{error.response.data.content}</strong>,
                html: <i>Something went wrong!</i>,
                icon: 'error',
                show: false
            });
        })
    }
}

const actDeleteUserRequest = () => {
    return {
        type:ActionType.DELETE_USER_REQUEST
    }
}
const actDeleteUserSuccess = (data) => {
    return {
        type:ActionType.DELETE_USER_SUCCESS,
        payload:data,
    }
}
const actDeleteUserFailed = (error) => {
    return {
        type:ActionType.DELETE_USER_FAILED,
        payload:error,

    }
}