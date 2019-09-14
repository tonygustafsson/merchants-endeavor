export const types = {
    merchant: {
        name: 'Merchant',
        staffMin: 1,
        staffMax: 4,
        price: 5000
    },
    blacksmith: {
        name: 'Blacksmith',
        staffMin: 2,
        staffMax: 8,
        price: 8000
    },
    tavern: {
        name: 'Tavern',
        staffMin: 2,
        staffMax: 8,
        price: 12000
    },
    brothel: {
        name: 'Brothel',
        staffMin: 4,
        staffMax: 16,
        price: 15000
    }
};

export const maxNumberOfBusinesses = 10;
export const chanceOfMakingProfit = 0.8;
export const profitCheckFrequency = 50;
export const profitValue = 100;
