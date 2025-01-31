import {
	ADD_PROJECT_START,
	ADD_PROJECT_SUCCESS,
	ADD_PROJECT_FAILURE,
	GET_PROJECTS_START,
	GET_PROJECTS_SUCCESS,
	GET_PROJECTS_FAILURE,
	UPDATE_PROJECT_START,
	UPDATE_PROJECT_SUCCESS,
	UPDATE_PROJECT_FAILURE,
	DELETE_PROJECT_START,
	DELETE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILURE,
} from "../Actions/Types";

const initialState = {
	project: null,
	loading: false,
	error: null,
	projects: null,
	projectsCountChanged: false,
};

export default function projects(state = initialState, action: any) {
	switch (action.type) {
		case ADD_PROJECT_START:
			return {
				...state,
				loading: true,
				projectsCountChanged: false,
			};
		case ADD_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				project: action.payload.project,
				projectsCountChanged: true,
			};
		case ADD_PROJECT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				projectsCountChanged: false,
			};
		case GET_PROJECTS_START:
			return {
				...state,
				loading: true,
			};
		case GET_PROJECTS_SUCCESS:
			return {
				...state,
				loading: false,
				projects: action.payload.projects,
			};
		case GET_PROJECTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UPDATE_PROJECT_START:
			return {
				...state,
				loading: true,
				projectsCountChanged: false,
			};
		case UPDATE_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				projectsCountChanged: true,
			};
		case UPDATE_PROJECT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_PROJECT_START:
			return {
				...state,
				loading: true,
				projectsCountChanged: false,
			};
		case DELETE_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				projectsCountChanged: true,
			};
		case DELETE_PROJECT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}
