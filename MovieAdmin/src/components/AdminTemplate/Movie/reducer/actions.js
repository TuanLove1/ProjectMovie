import { api } from "../../../../api/apiUtil";
import * as ActionType from "./constants";

export const FetchDataListMovie = (tenPhim = '') => {
    return (dispatch) => {
        dispatch(actListMovieRequest())
        if (tenPhim != '') {
            api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP10&tenPhim=${tenPhim}`)
                .then((result) => {
                    console.log(result);
                    dispatch(actListMovieSuccess(result.data.content));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(actListMovieFailed(error));
                })
        }
        else {
            api.get('QuanLyPhim/LayDanhSachPhim?maNhom=GP10')
                .then((result) => {
                    console.log(result);
                    dispatch(actListMovieSuccess(result.data.content));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(actListMovieFailed(error));
                })
        }
    }
}

const actListMovieRequest = () => {
    return {
        type: ActionType.LISTMOVIE_REQUEST,
    }
}
const actListMovieSuccess = (data) => {
    return {
        type: ActionType.LISTMOVIE_SUCCESS,
        payload: data,
    }
}
const actListMovieFailed = (error) => {
    return {
        type: ActionType.LISTMOVIE_FAILED,
        payload: error,
    }
}