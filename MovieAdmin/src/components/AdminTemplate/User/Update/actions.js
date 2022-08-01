import * as ActionType from "./constants";
import {api} from "../../../../api/apiUtil"
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

export const actUpdateUser = (user) =>{
    return (dispatch) => {
        dispatch(actUpdateRequest());
        api.put('QuanLyNguoiDung/CapNhatThongTinNguoiDung',user)
        .then((result)=>{
            dispatch(actUpdateSuccess(result.data.content))
            console.log(result.data);
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Update người dùng thành công!</strong>,
                html: <i>You clicked the button!</i>,
                icon: 'success',
                show: false
            });
        })
        .catch((error)=>{
            console.log(error.response.data);
            dispatch(actUpdateFailed(error))
        })
    }
}

const actUpdateRequest = () => {
    return {
        type:ActionType.UPDATE_USER_REQUEST
    }
}
const actUpdateSuccess = (data) => {
    return {
        type:ActionType.UPDATE_USER_SUCCESS,
        payload:data,
    }
}
const actUpdateFailed = (error) => {
    return {
        type:ActionType.UPDATE_USER_FAILED,
        payload:error,
    }
}
