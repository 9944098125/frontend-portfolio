import {
	ADD_SKILL_START,
	ADD_SKILL_SUCCESS,
	ADD_SKILL_FAILURE,
	GET_SKILL_SUCCESS,
	GET_SKILL_FAILURE,
	UPDATE_SKILL_START,
	UPDATE_SKILL_SUCCESS,
	UPDATE_SKILL_FAILURE,
	DELETE_SKILL_START,
	DELETE_SKILL_SUCCESS,
	DELETE_SKILL_FAILURE,
} from "./Types";
import { Api } from "../Api/Api";
import { Skills } from "../../Interfaces";
import { AppDispatch } from "../Reducers";

export const createSkill =
	(body: Partial<Skills>, userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: ADD_SKILL_START,
			});
			const res = await Api.post(`/skills/${userId}`, body);
			if (res) {
				dispatch({
					type: ADD_SKILL_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ADD_SKILL_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};

export const readSkills = () => async (dispatch: AppDispatch) => {
	try {
		const res = await Api.get("/skills");
		if (res) {
			dispatch({
				type: GET_SKILL_SUCCESS,
				payload: res.data,
			});
		}
	} catch (err: any) {
		dispatch({
			type: GET_SKILL_FAILURE,
			payload: err.response?.data?.message,
		});
	}
};
export const updateSkills =
	(body: Partial<Skills>, userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_SKILL_START,
			});
			const res = await Api.patch(`/skills/${userId}`, body);
			if (res) {
				dispatch({
					type: UPDATE_SKILL_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: UPDATE_SKILL_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};

export const deleteSkill =
	(skillId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_SKILL_START,
			});
			const res = await Api.delete(`/skills/${skillId}`);
			if (res) {
				dispatch({
					type: DELETE_SKILL_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: DELETE_SKILL_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};
