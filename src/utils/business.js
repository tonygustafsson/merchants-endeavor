import { getRandomId } from './string';
import { getRandomLineFromFile } from './fileReader';

export const businessTypes = {
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
