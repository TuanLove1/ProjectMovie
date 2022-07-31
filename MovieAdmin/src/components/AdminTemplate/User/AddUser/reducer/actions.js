import { api } from "../../../../../api/apiUtil";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as ActionType from "./constants";

export const actAddUser = (user,navigate) => {
    return (dispatch) => {
        dispatch(actAddUserRequest());
        api.post('QuanLyNguoiDung/ThemNguoiDung',user)
        .then((result)=>{
            dispatch(actAddUserSuccess(result.data.content))
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Thêm người dùng thành công!</strong>,
                html: <i>You clicked the button!</i>,
                icon: 'success',
                show: false
            });
            navigate("/admin/user");
        })
        .catch((error)=>{
            dispatch(actAddUserFailed(error))
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

const actAddUserRequest = () => {
    return {
        type:ActionType.ADD_USER_REQUEST
    }
}
const actAddUserSuccess = (data) => {
    return {
        type:ActionType.ADD_USER_SUCCESS,
        payload:data,
    }
}
const actAddUserFailed = (error) => {
    return {
        type:ActionType.ADD_USER_FAILED,
        payload:error,

    }
}