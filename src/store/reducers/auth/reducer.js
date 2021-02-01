import {SET_IS_AUTH} from "./const";
import {getUserId} from "../../../api/api";

const userId = getUserId()
const initialState = {
    userId
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state
    }
}

export default reducer;
