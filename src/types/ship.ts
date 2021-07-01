export type Ship = {
	id: string;
	name: string;
	type: string;
	health: number;
	crewMembers: number;
	cannons: number;
	onMission: number | boolean;
};

export type Ships = Ship[];
