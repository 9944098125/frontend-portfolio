import { combineReducers, UnknownAction } from "redux";

import loginReducer from "./login";
import { ThunkDispatch } from "redux-thunk";

export default combineReducers({
	login: loginReducer,
});

export interface RootState {
	login: {
		token: string | null;
		loading: boolean;
		error: string | null;
		userDetailsAdded: boolean;
		user: {
			_id: string;
			email: string;
			name: string;
			age: number;
			occupation: string;
			summary: string;
			image: string;
		};
	};
}

export type AppDispatch = ThunkDispatch<RootState, void, UnknownAction>;
