import {
	ADD_EXPERIENCE_START,
	ADD_EXPERIENCE_SUCCESS,
	ADD_EXPERIENCE_FAILURE,
	GET_EXPERIENCE_SUCCESS,
	GET_EXPERIENCE_FAILURE,
	UPDATE_EXPERIENCE_START,
	UPDATE_EXPERIENCE_SUCCESS,
	UPDATE_EXPERIENCE_FAILURE,
	DELETE_EXPERIENCE_START,
	DELETE_EXPERIENCE_SUCCESS,
	DELETE_EXPERIENCE_FAILURE,
} from "../Actions/Types";

const initialState = {
	loading: false,
	error: null,
	success: null,
	experiences: null,
	experienceCountChanged: false,
};

export default function experiences(state = initialState, action: any) {
	switch (action.type) {
		case ADD_EXPERIENCE_START:
			return {
				...state,
				loading: true,
			};
		case ADD_EXPERIENCE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				experienceCountChanged: false,
			};
		case ADD_EXPERIENCE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case GET_EXPERIENCE_SUCCESS:
			return {
				...state,
				experiences: action.payload.experiences,
				success: true,
			};
		case GET_EXPERIENCE_FAILURE:
			return {
				...state,
				loading: false,
				success: false,
			};
		case UPDATE_EXPERIENCE_START:
			return {
				...state,
				loading: true,
			};
		case UPDATE_EXPERIENCE_SUCCESS:
			return {
				...state,
				loading: false,
				experienceCountChanged: false,
				success: true,
			};
		case UPDATE_EXPERIENCE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false,
			};
		case DELETE_EXPERIENCE_START:
			return {
				...state,
				loading: true,
			};
		case DELETE_EXPERIENCE_SUCCESS:
			return {
				...state,
				loading: false,
				experienceCountChanged: true,
				success: true,
			};
		case DELETE_EXPERIENCE_FAILURE:
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
