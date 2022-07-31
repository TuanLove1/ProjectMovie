import *as ActionType from "./constants"
const initialState = {
    loading:true,
    data:null,
    error:null,
}
const ListMovieAdminReducer = (state = initialState,action) => {
    switch (action.type) {
        case ActionType.LISTMOVIE_REQUEST:{
            state.loading = true;
            state.data = null;
            state.error = null;
            return {...state};
        }
        case ActionType.LISTMOVIE_SUCCESS:{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return {...state};
        }
        case ActionType.LISTMOVIE_FAILED:{
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return {...state};
        }
        default:
            return {...state};
    }
}
export default ListMovieAdminReducer;