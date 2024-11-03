import {
	ADD_EXPERIENCE_START,
	ADD_EXPERIENCE_SUCCESS,
	ADD_EXPERIENCE_FAILURE,
	GET_EXPERIENCE_SUCCESS,
	GET_EXPERIENCE_FAILURE,
	UPDATE_EXPERIENCE_START,
	UPDATE_EXPERIENCE_SUCCESS,
	UPDATE_EXPERIENCE_FAILURE,
	DELETE_EXPERIENCE_SUCCESS,
	DELETE_EXPERIENCE_FAILURE,
	DELETE_EXPERIENCE_START,
} from "./Types";
import { Api } from "../Api/Api";
import { Experience } from "../../Interfaces";
import { AppDispatch } from "../Reducers";

export const createExperience =
	(body: Partial<Experience>, userId: string) => async (dispatch: any) => {
		try {
			dispatch({
				type: ADD_EXPERIENCE_START,
			});
			const res = await Api.post(`/experiences/${userId}`, body);
			if (res) {
				dispatch({
					type: ADD_EXPERIENCE_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ADD_EXPERIENCE_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};

export const readExperience = () => async (dispatch: any) => {
	try {
		const res = await Api.get("/experiences");
		if (res) {
			dispatch({
				type: GET_EXPERIENCE_SUCCESS,
				payload: res.data,
			});
		}
	} catch (err: any) {
		dispatch({
			type: GET_EXPERIENCE_FAILURE,
			payload: err.response.data?.message,
		});
	}
};

export const updateExperience =
	(experienceId: string, body: Partial<Experience>) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_EXPERIENCE_START,
			});
			const res = await Api.put(`/experiences/${experienceId}`, body);
			if (res) {
				dispatch({
					type: UPDATE_EXPERIENCE_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: UPDATE_EXPERIENCE_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};

export const deleteExperience =
	(experienceId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_EXPERIENCE_START,
			});
			const res = await Api.delete(`/experiences/${experienceId}`);
			if (res) {
				dispatch({
					type: DELETE_EXPERIENCE_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: DELETE_EXPERIENCE_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};
