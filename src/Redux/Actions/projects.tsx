import {
	ADD_PROJECT_START,
	ADD_PROJECT_SUCCESS,
	ADD_PROJECT_FAILURE,
	GET_PROJECTS_START,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_FAILURE,
} from "./Types";
import { Api } from "../Api/Api";
import { Projects } from "../../Interfaces";
import { AppDispatch } from "../Reducers";

export const createProject =
	(body: Partial<Projects>, userId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: ADD_PROJECT_START,
			});
			const res = await Api.post(`/projects/create?userId=${userId}`, body);
			if (res) {
				dispatch({
					type: ADD_PROJECT_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: ADD_PROJECT_FAILURE,
				payload: err.response.data?.message,
			});
		}
	};

export const getProjects = () => async (dispatch: AppDispatch) => {
	try {
		dispatch({
			type: GET_PROJECTS_START,
		});
		const res = await Api.get("/projects");
		if (res) {
			dispatch({
				type: GET_PROJECTS_SUCCESS,
				payload: res?.data,
			});
		}
	} catch (err: any) {
		dispatch({
			type: GET_PROJECTS_FAILURE,
			payload: err.response.data?.message,
		});
	}
};
