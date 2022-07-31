import Swal from "sweetalert2";
import { api } from "../../../../api/apiUtil";
import withReactContent from 'sweetalert2-react-content';
import * as ActionType from "./constants";
import { FetchDataListMovie } from "../reducer/actions";
import { Navigate } from "react-router-dom";

export const FetchDataDeleteMovie = (id) => {
    return (dispatch) => {
        dispatch(actDeleteMovieRequest())
        api.delete(`QuanLyPhim/XoaPhim?MaPhim=${id}`)
            .then((result) => {
                console.log(result);
                dispatch(actDeleteMovieSuccess(result.data.content));
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Xóa thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success',
                    show: false
                });
                dispatch(FetchDataListMovie());
            })
            .catch((error) => {
                dispatch(actDeleteMovieFailed(error));
            })
    }
}

const actDeleteMovieRequest = () => {
    return {
        type: ActionType.DELETE_MOVIE_REQUEST,
    }
}
const actDeleteMovieSuccess = (data) => {
    return {
        type: ActionType.DELETE_MOVIE_SUCCESS,
        payload: data,
    }
}
const actDeleteMovieFailed = (error) => {
    return {
        type: ActionType.DELETE_MOVIE_FAILED,
        payload: error,
    }
}