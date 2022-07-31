import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { api } from "../../../../../../api/apiUtil";
import * as ActionType from "./constants";
import { FetchDataListMovie } from "../../../reducer/actions";

export const actUpdateMovie = (movie, navigate) => {
    return (dispatch) => {
        dispatch(actUpdateRequest());
        api.post('QuanLyPhim/CapNhatPhimUpload', movie)
            .then((result) => {
                console.log(result.data.content);
                dispatch(actUpdateSuccess(result.data.content))
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Cập nhật thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success',
                    show: false
                });
                dispatch(FetchDataListMovie)
                navigate("/admin/movie");
            })
            .catch((error) => {
                console.log(error);
                dispatch(actUpdateFailed(error))
            })
    }
}

const actUpdateRequest = () => {
    return {
        type: ActionType.UPDATE_MOVIE_REQUEST,
    }
}
const actUpdateSuccess = (data) => {
    return {
        type: ActionType.UPDATE_MOVIE_SUCCESS,
        payload: data,
    }
}
const actUpdateFailed = (error) => {
    return {
        type: ActionType.UPDATE_MOVIE_FAILED,
        payload: error
    }
}