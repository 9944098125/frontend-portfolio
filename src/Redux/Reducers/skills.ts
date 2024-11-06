import {
	ADD_SKILL_START,
	ADD_SKILL_FAILURE,
	ADD_SKILL_SUCCESS,
	GET_SKILL_SUCCESS,
	GET_SKILL_FAILURE,
	UPDATE_SKILL_START,
	UPDATE_SKILL_SUCCESS,
	UPDATE_SKILL_FAILURE,
	DELETE_SKILL_START,
	DELETE_SKILL_SUCCESS,
	DELETE_SKILL_FAILURE,
} from "../Actions/Types";

const initialState = {
	loading: false,
	skills: null,
	error: null,
	success: false,
	skillCountChanged: false,
};

export default function skills(state = initialState, action: any) {
	switch (action.type) {
		case ADD_SKILL_START:
			return {
				...state,
				loading: true,
				skillCountChanged: false,
			};
		case ADD_SKILL_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				skillCountChanged: true,
			};
		case ADD_SKILL_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case GET_SKILL_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				skills: action.payload.skills,
			};
		case GET_SKILL_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case UPDATE_SKILL_START:
			return {
				...state,
				loading: true,
			};
		case UPDATE_SKILL_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				skillCountChanged: false,
			};
		case UPDATE_SKILL_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case DELETE_SKILL_START:
			return {
				...state,
				loading: true,
				skillCountChanged: false,
			};
		case DELETE_SKILL_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				skillCountChanged: true,
			};
		case DELETE_SKILL_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		default:
			return state;
	}
}
