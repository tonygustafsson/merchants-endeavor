import { getRandomId } from './string';
import { getRandomLineFromFile } from './fileReader';

export const businessTypes = {
    merchant: {
        name: 'Merchant',
        crewMin: 1,
        crewMax: 4,
        price: 5000
    },
    blacksmith: {
        name: 'Blacksmith',
        crewMin: 2,
        crewMax: 8,
        price: 8000
    },
    tavern: {
        name: 'Tavern',
        crewMin: 2,
        crewMax: 8,
        price: 12000
    },
    brothel: {
        name: 'Brothel',
        crewMin: 4,
        crewMax: 16,
        price: 15000
    }
};

export const getRandomBusiness = (businessType, merchantName = 'Merchant') => {
    return getRandomLineFromFile(`../lists/businessName-${businessType}.txt`)
        .then(businessName => {
            merchantName = merchantName.split(' ')[0];
            businessName = businessName.replace('{0}', merchantName);

            const business = {
                id: getRandomId(32),
                name: businessName,
                type: businessType,
                staff: 0
            };

            return business;
        })
        .catch(err => {
            alert('Could not create business...');
        });
};
