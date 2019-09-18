import { nationalities } from '../constants/game';
import { names } from '../constants/merchant';

const getRandomProperty = function(obj) {
    var keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
};

const getRandomNationality = () => getRandomProperty(nationalities);

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
        name: `${getRandomFirstName(nationality.adjective, gender)} ${getRandomSurname(nationality.adjective)}`,
        gender: gender,
        nationality: nationality
    };

    return merchant;
};
