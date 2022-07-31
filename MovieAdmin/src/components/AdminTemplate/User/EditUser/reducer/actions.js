import { api } from "../../../../../api/apiUtil";
import * as ActionType from "./constants";

export const actEditUser = (user) => {
    return (dispatch) => {
        dispatch(actEditRequest())
        api.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung',user)
        .then((result)=>{
            dispatch(actEditSuccess(result.data.content))
        })
        .catch((error)=>{
            dispatch(actEditFailed(error))
        })
    }
}

const actEditRequest = () => {
    return {
        type:ActionType.EDIT_USER_REQUEST
    }
}
const actEditSuccess = (data) => {
    return {
        type:ActionType.EDIT_USER_SUCCESS,
        payload:data
    }
}
const actEditFailed = (error) => {
    return {
        type:ActionType.EDIT_USER_FAILED,
        payload:error
    }
}