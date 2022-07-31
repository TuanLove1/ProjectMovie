import { api } from "../../../../../api/apiUtil";
import * as ActionType from "./constants";

export const fectDataInfoMovie = (id) => {
    return (dispatch) => {
        dispatch(actInfoMovieRequest())
        api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
        .then((result)=>{
            console.log(result.data);
            dispatch(actInfoMovieSuccess(result.data.content))
        })
        .catch((error)=>{
            console.log(error);
            dispatch(actInfoMovieFailed(error));
        })
    }
}

const actInfoMovieRequest = () => {
    return {
        type:ActionType.INFO_MOVIE_REQUEST,
    }
}
const actInfoMovieSuccess = (data) => {
    return {
        type:ActionType.INFO_MOVIE_SUCCESS,
        payload:data
    }
}
const actInfoMovieFailed = (error) => {
    return {
        type:ActionType.INFO_MOVIE_FAILED,
        payload:error
    }
}