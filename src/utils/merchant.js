import { getRandomLineFromFile } from './fileReader';

const nationalities = ['England', 'France', 'Holland', 'Spain'];

export const getRandomNationality = () => nationalities[Math.floor(Math.random() * nationalities.length)];

export const getRandomMerchantName = () => {
    return getRandomLineFromFile('../lists/merchantNames.txt')
        .then(name => {
            return name;
        })
        .catch(err => {
            alert('Could not get merchant name...');
        });
};
