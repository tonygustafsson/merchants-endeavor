export const types = {
    brig: {
        name: 'Brig',
        loadCapacity: 500,
        crewMin: 2,
        crewMax: 20,
        cannonsMin: 4,
        cannonsMax: 10,
        price: 1500
    },
    merchantman: {
        name: 'Merchantman',
        loadCapacity: 1000,
        crewMin: 1,
        crewMax: 10,
        cannonsMin: 2,
        cannonsMax: 0,
        price: 1000
    },
    galleon: {
        name: 'Galleon',
        loadCapacity: 300,
        crewMin: 4,
        crewMax: 50,
        cannonsMin: 8,
        cannonsMax: 25,
        price: 4000
    },
    frigate: {
        name: 'Frigate',
        loadCapacity: 600,
        crewMin: 8,
        crewMax: 50,
        cannonsMin: 25,
        cannonsMax: 50,
        price: 10000
    }
};

export const minFoodPerCrewMemberForMission = 4;
export const minWaterPerCrewMemberForMission = 8;
export const missionLength = 50;
export const maxShips = 10;
export const repairCostPerPercentage = 5;
export const minShipHealthForMission = 5;
export const minCrewMoodForMission = 5;
export const minCrewHealthForMission = 5;
export const missionDoubloonsReward = 1000;
export const missionFoodReward = 40;
export const missionWaterReward = 50;
export const missionPorcelainReward = 10;
export const missionSpicesReward = 10;
export const missionTobaccoReward = 5;
export const missionRumReward = 5;
export const missionShipHealthLoss = 25;
export const missionCrewJoinReward = 10;
export const missionCrewMoodLoss = 15;
export const missionCrewHealthLoss = 15;
