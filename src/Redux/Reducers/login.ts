import {
	ADD_RESUME_FAILURE,
	ADD_RESUME_START,
	ADD_RESUME_SUCCESS,
	ADD_USER_DETAILS_FAILURE,
	ADD_USER_DETAILS_START,
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_START,
	GET_USER_DETAILS_SUCCESS,
} from "./../Actions/Types";
import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	ADD_USER_DETAILS_SUCCESS,
} from "../Actions/Types";

const initialState = {
	token: localStorage.getItem("asp-portfolio-token"),
	loading: false,
	error: null,
	user: null,
	userDetailsAdded: false,
};

export default function loginReducer(
	state = initialState,
	action: { type: string; payload: any }
) {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("asp-portfolio-token", action.payload.token);
			localStorage.setItem(
				"asp-portfolio-user",
				JSON.stringify(action.payload.user)
			);
			return {
				...state,
				loading: false,
				token: action.payload.token,
				user: action.payload.user,
				error: null,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case ADD_USER_DETAILS_START:
			return {
				...state,
				loading: true,
				userDetailsAdded: false,
			};
		case ADD_USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload.user,
				error: null,
				userDetailsAdded: true,
			};
		case ADD_USER_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				userDetailsAdded: false,
			};
		case GET_USER_DETAILS_START:
			return {
				...state,
				loading: true,
			};
		case GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload?.user,
			};
		case GET_USER_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case ADD_RESUME_START:
			return {
				...state,
				loading: true,
			};
		case ADD_RESUME_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload.user,
			};
		case ADD_RESUME_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case LOGOUT:
			localStorage.removeItem("asp-portfolio-token");
			return {
				...state,
				token: null,
				user: null,
			};
		default:
			return state;
	}
}
