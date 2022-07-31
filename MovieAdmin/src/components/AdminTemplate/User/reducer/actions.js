import * as ActionType from "./constants";
import { api } from '../../../../api/apiUtil';

export const fectDataListUser = (param) => {
    return (dispatch) => {
        dispatch(actListUserRequest());
        api.get(`QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP10&${param}&soPhanTuTrenTrang=10`)
            .then((result) => {
                dispatch(actListUserSuccess(result.data.content))
            })
            .catch((error) => {
                dispatch(actListUserFailed(error))
            })
    }
}

const actListUserRequest = () => {
    return {
        type: ActionType.LIST_USER_REQUEST,
    }
}
const actListUserSuccess = (data) => {
    return {
        type: ActionType.LIST_USER_SUCCESS,
        payload: data
    }
}
const actListUserFailed = (error) => {
    return {
        type: ActionType.LIST_USER_FAILED,
        payload: error
    }
}