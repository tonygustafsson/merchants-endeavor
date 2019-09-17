export const startRoute = 'start';
export const routes = {
    logs: 'logs',
    inventory: 'inventory',
    properties: 'properties',
    ship: 'ship',
    business: 'business',
    staff: 'staff',
    goods: 'goods'
};

export const nationalities = {
    england: {
        name: 'England',
        adjective: 'english',
        flag: '🇬🇧',
        towns: ['Charles Towne', 'Belize', 'Port Royale', 'Barbados']
    },
    france: {
        name: 'France',
        adjective: 'french',
        flag: '🇫🇷',
        towns: ['Martinique', 'Biloxi', 'Tortuga', 'Leogane']
    },
    holland: {
        name: 'Holland',
        adjective: 'dutch',
        flag: '🇧🇶',
        towns: ['Curacao', 'St. Eustatius', 'Bonaire', 'St. Martin']
    },
    spain: {
        name: 'Spain',
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
