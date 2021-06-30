export const routes = {
	root: '/',
	logs: '/logs',
	inventory: '/inventory',
	properties: '/properties',
	ship: '/ship',
	business: '/business',
	staff: '/staff',
	goods: '/goods'
};

export const nationalities = {
	england: {
		name: 'england',
		adjective: 'english',
		flag: '🇬🇧',
		towns: ['Charles Towne', 'Belize', 'Port Royale', 'Barbados']
	},
	france: {
		name: 'france',
		adjective: 'french',
		flag: '🇫🇷',
		towns: ['Martinique', 'Biloxi', 'Tortuga', 'Leogane']
	},
	holland: {
		name: 'holland',
		adjective: 'dutch',
		flag: '🇧🇶',
		towns: ['Curacao', 'St. Eustatius', 'Bonaire', 'St. Martin']
	},
	spain: {
		name: 'spain',
		adjective: 'spanish',
		flag: '🇪🇸',
		towns: ['Panama', 'San Juan', 'Havana', 'Villa Hermosa']
	}
};

export const weathers = [
	{ name: 'sunny', icon: '🌞' },
	{ name: 'mostly sunny', icon: '🌤' },
	{ name: 'cloudy', icon: '⛅' },
	{ name: 'raining', icon: '🌧' },
	{ name: 'thunderstorm', icon: '⛈' }
];

export const weatherChangeability = 0.02;
