import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Actions/Types";

const initialState = {
	token: localStorage.getItem("asp-portfolio-token"),
	loading: false,
	error: null,
	user: null,
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
		default:
			return state;
	}
}
