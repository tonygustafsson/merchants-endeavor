import { nationalities } from '../constants/game';
import { names } from '../constants/merchant';

const getRandomProperty = function (obj) {
	const keys = Object.keys(obj);
	return obj[keys[(keys.length * Math.random()) << 0]];
};

const getRandomNationality = () => getRandomProperty(nationalities);

const getRandomFirstName = (nationality, gender) => {
	const firstNameArray = names.firstNames[gender][nationality];
	const firstName = firstNameArray[Math.floor(Math.random() * firstNameArray.length)];
	return firstName;
};

const getRandomSurname = nationality => {
	const surnameArray = names.surnames[nationality];
	const surname = surnameArray[Math.floor(Math.random() * surnameArray.length)];
	return surname;
};

export const getRandomMerchant = () => {
	const nationality = getRandomNationality();
	const town = nationality.towns[Math.floor(Math.random() * nationality.towns.length)];

	const gender = Math.random() > 0.5 ? 'woman' : 'man';

	const merchant = {
		name: `${getRandomFirstName(nationality.adjective, gender)} ${getRandomSurname(
			nationality.adjective
		)}`,
		gender: gender,
		nationality: nationality.name,
		town: town
	};

	return merchant;
};
