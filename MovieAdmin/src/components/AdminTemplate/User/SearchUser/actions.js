import { api } from "../../../../api/apiUtil"
import * as ActionType from "./constants"

export const actSearchUser = (name) => {
    return (dispatch) => {
        dispatch(actSearchUserRequest())
        api.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP10&tuKhoa=${name}`)
        .then((result)=>{
            console.log(result.data.content);
            dispatch(actSearchUserSuccess(result.data.content))
        })
        .catch((error)=>{
            console.log(error);

            dispatch(actSearchUserFailed(error))
        })
    }
}

const actSearchUserRequest = () => {
    return {
        type:ActionType.SEARCH_USER_REQUEST,
    }
}
const actSearchUserSuccess = (data) => {
    return {
        type:ActionType.SEARCH_USER_SUCCESS,
        payload:data
    }
}
const actSearchUserFailed = (error) => {
    return {
        type:ActionType.SEARCH_USER_FAILED,
        payload:error
    }
}