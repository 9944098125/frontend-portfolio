import { combineReducers } from "redux";

import loginReducer from "./login";

export default combineReducers({
	login: loginReducer,
});

export interface RootState {
	login: {
		token: string | null;
		loading: boolean;
		error: string | null;
		user: {
			_id: string;
			email: string;
			fullName: string;
			age: number;
			occupation: string;
		};
	};
}
