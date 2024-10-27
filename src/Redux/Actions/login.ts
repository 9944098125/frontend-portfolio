import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	ADD_USER_DETAILS_START,
	ADD_USER_DETAILS_SUCCESS,
	ADD_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_START,
	GET_USER_DETAILS_SUCCESS,
	ADD_RESUME_START,
	ADD_RESUME_SUCCESS,
} from "./Types";
import { Api } from "../Api/Api";
import { User } from "../../Interfaces";
import { AppDispatch } from "../Reducers";

export const login =
	(body: { email: string; password: string }) =>
	async (dispatch: AppDispatch) => {
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

export const logout = () => (dispatch: AppDispatch) => {
	dispatch({
		type: LOGOUT,
	});
};

export const addUser =
	(userId: string, requestBody: Partial<User>) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: ADD_USER_DETAILS_START,
			});
			const res = await Api.patch(
				`/user/updateUser?userId=${userId}`,
				requestBody
			);
			if (res) {
				dispatch({
					type: ADD_USER_DETAILS_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ADD_USER_DETAILS_FAILURE,
				payload: err?.response?.data?.message,
			});
		}
	};

export const uploadResume =
	(userId: string, body: { resume: string }) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: ADD_RESUME_START,
			});
			const res = await Api.post(`/user/upload-resume?userId=${userId}`, body);
			if (res) {
				dispatch({
					type: ADD_RESUME_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ADD_USER_DETAILS_FAILURE,
				payload: err?.response?.data?.message,
			});
		}
	};

export const getUserDetails =
	(userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GET_USER_DETAILS_START,
			});
			const res = await Api.get(`/user/getUserDetails?userId=${userId}`);
			if (res) {
				dispatch({
					type: GET_USER_DETAILS_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ADD_USER_DETAILS_FAILURE,
				payload: err?.response?.data?.message,
			});
		}
	};
