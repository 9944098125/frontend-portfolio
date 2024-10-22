export interface Skills {
	name: string;
	level: string;
	image: string;
	experience: string;
}

export interface Projects {
	title: string;
	description: string;
	techStack: string[];
	images: string[];
	githubLink: string;
	liveLink: string;
}

export interface Experience {
	company: string;
	role: string;
	startDate: Date;
	endDate: Date;
	experienceSummary: string;
	technologiesWorkedOn: string[];
	responsibilities: string[];
}

export interface User {
	fullName: string;
	email: string;
	password: string;
	occupation: string;
	summary: string;
	age: number;
	resume: string;
	skills: Skills;
	projects: Projects;
	experience: Experience;
}
