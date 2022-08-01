import { combineReducers } from "redux";
import ListMovieAdminReducer from "../../components/AdminTemplate/Movie/reducer"
import loginMovieReducer from "../../components/AdminTemplate/Auth/reducer";
import addMovieReducer from "../../components/AdminTemplate/Movie/AddMovie/reducer";
import infoMovieReducer from "../../components/AdminTemplate/Movie/EditMovie/reducer";
import updateMovieReducer from "../../components/AdminTemplate/Movie/AddMovie/UpdateMovie/reducer";
import deleteMovieReducer from "../../components/AdminTemplate/Movie/DeleteMovie";
import listUserReducer from "../../components/AdminTemplate/User/reducer";
import addUserReducer from "../../components/AdminTemplate/User/AddUser/reducer";
import editUserReducer from "../../components/AdminTemplate/User/EditUser/reducer"
import deleteUserReducer from "../../components/AdminTemplate/User/DeleteUser"
import updateUserReducer from "../../components/AdminTemplate/User/Update";
const rootReducer = combineReducers({
    loginMovieReducer,
    ListMovieAdminReducer,
    addMovieReducer,
    infoMovieReducer,
    updateMovieReducer,
    deleteMovieReducer,
    listUserReducer,
    addUserReducer,
    editUserReducer,
    deleteUserReducer,
    updateUserReducer,
});

export default rootReducer;
