import { api } from "../../../../../api/apiUtil";
import * as ActionType from "./constants";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FetchDataListMovie } from "../../reducer/actions";
export const actAddMovie = (formData,navigate) => {
    return (dispatch) => {
        dispatch(actAddMovieRequest());
        api.post('QuanLyPhim/ThemPhimUploadHinh', formData)
            .then((result) => {
                console.log(dispatch(actAddMovieSuccess(result)));

                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Thêm thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success',
                    show: false
                });
                dispatch(FetchDataListMovie());
                navigate("/admin/movie");

            })
            .catch((error) => {
                dispatch(actAddMovieFailed(error))
            })
    }
}

const actAddMovieRequest = () => {
    return {
        type: ActionType.ADD_MOVIE_REQUEST,
    }
}
const actAddMovieSuccess = (data) => {
    return {
        type: ActionType.ADD_MOVIE_SUCCESS,
        payload: data,
    }
}
const actAddMovieFailed = (error) => {
    return {
        type: ActionType.ADD_MOVIE_FAILED,
        payload: error
    }
}