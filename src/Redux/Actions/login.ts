import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./Types";
import { Api } from "../Api/Api";

export const login =
	(body: { email: string; password: string }) => async (dispatch: any) => {
		try {
			dispatch({
				type: LOGIN_START,
			});
			const response = await Api.post("/user/login", body);
			if (response) {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: response?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: LOGIN_FAILURE,
				payload: err?.response?.data?.message,
			});
		}
	};

export const logout = () => (dispatch: any) => {
	dispatch({
		type: LOGOUT,
	});
};
