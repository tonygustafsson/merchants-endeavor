export type Ship = {
	id: string;
	name: string;
	type: string;
	health: number;
	crewMembers: number;
	cannons: number;
	onMission: boolean;
};

export type Ships = Ship[];
