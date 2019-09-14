import { names, nationalities } from '../constants/merchant';

export const getRandomNationality = () => nationalities[Math.floor(Math.random() * nationalities.length)];

const getRandomFirstName = (nationality, gender) => {
    let firstNameArray = names.firstNames[gender][nationality];
    let firstName = firstNameArray[Math.floor(Math.random() * firstNameArray.length)];
    return firstName;
};

const getRandomSurname = nationality => {
    let surnameArray = names.surnames[nationality];
    let surname = surnameArray[Math.floor(Math.random() * surnameArray.length)];
    return surname;
};

export const getRandomMerchant = () => {
    let nationality = getRandomNationality();
    let gender = Math.random() > 0.5 ? 'woman' : 'man';

    let merchant = {
        name: `${getRandomFirstName(nationality, gender)} ${getRandomSurname(nationality)}`,
        gender: gender,
        nationality: nationality
    };

    return merchant;
};
