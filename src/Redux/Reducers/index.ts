import { combineReducers, UnknownAction } from "redux";

import loginReducer from "./login";
import projects from "./projects";
import { ThunkDispatch } from "redux-thunk";
import skills from "./skills";
import experiences from "./experience";

export default combineReducers({
	login: loginReducer,
	projects: projects,
	skills: skills,
	experiences: experiences,
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
			resume: string;
		};
		resume: File | null;
	};
	projects: {
		loading: boolean;
		error: string | null;
		project: {
			_id: string;
			title: string;
			description: string;
			techStack: string[];
			images: string[];
			githubLink: string;
			liveLink: string;
		};
		projects: {
			_id: string;
			title: string;
			description: string;
			techStack: string[];
			images: string[];
			githubLink: string;
			liveLink: string;
		}[];
		projectsCountChanged: boolean;
	};
	skills: {
		loading: boolean;
		error: string;
		skills: {
			_id: string;
			name: string;
			level: string;
			image: string;
			experience: string;
		}[];
		success: boolean;
		skillCountChanged: boolean;
	};
	experiences: {
		loading: boolean;
		error: string;
		success: boolean;
		experiences: {
			_id: string;
			company: string;
			role: string;
			startDate: Date;
			endDate: Date;
			experienceSummary: string;
			technologiesWorkedOn: string[];
			responsibilities: string;
		}[];
		experiencesCountChanged: boolean;
	};
}

export type AppDispatch = ThunkDispatch<RootState, void, UnknownAction>;
