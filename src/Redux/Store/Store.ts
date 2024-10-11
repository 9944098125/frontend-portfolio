import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../Reducers";
import SetAuthToken from "../../Utils/SetAuthToken";

// Define the type for the middleware array
const middleware: any = [thunk];

// Create the store with type annotations
const store = createStore<any, any>(
	rootReducer,
	{},
	applyMiddleware(...middleware)
);

let currentState;

store.subscribe(() => {
	// gets the present state of the store
	currentState = store.getState();
	const token = currentState.login.token;
	SetAuthToken(token);
});

export default store;
