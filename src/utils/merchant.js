import { getRandomLineFromFile } from './fileReader';

const names = {
    firstNames: {
        man: {
            english: ['Herman', 'Alan', 'Howard', 'Carter', 'Dalton', 'Edward', 'Egbert', 'Jarvis', 'Norman', 'Owen'],
            french: [
                'Antoine',
                'Leone',
                'Leroux',
                'Louis',
                'Noel',
                'Pascal',
                'Philippe',
                'Pierre',
                'Renard',
                'Reymond'
            ],
            dutch: ['Anouk', 'Bram', 'Dirk', 'Flemming', 'Henrick', 'Jaap', 'Klaas', 'Pieter', 'Rutger', 'Wouter'],
            spanish: ['Alberto', 'Andres', 'Carlos', 'Diego', 'Emilio', 'Fabio', 'Franco', 'Ismael', 'Jose', 'Ronaldo']
        },
        woman: {
            english: [
                'Adrienne',
                'Agnes',
                'Bernice',
                'Carrie',
                'Felicia',
                'Joanna',
                'Selena',
                'Martha',
                'Rachel',
                'Zelda'
            ],
            french: [
                'Adela',
                'Bernelle',
                'Chante',
                'Desire',
                'Ellinor',
                'Garnet',
                'Jineen',
                'Maiya',
                'Ophelia',
                'Suzette'
            ],
            dutch: ['Anika', 'Brandi', 'Fien', 'Gisela', 'Janke', 'Katryn', 'Marel', 'Mina', 'Skyla', 'Yoka'],
            spanish: [
                'Adelina',
                'Carisa',
                'Denisa',
                'Erlina',
                'Isabel',
                'Margarita',
                'Regina',
                'Sofia',
                'Vina',
                'Yadra'
            ]
        }
    },
    surnames: {
        english: [
            'Addison',
            'Bawden',
            'Clapham',
            'Eckington',
            'Garnett',
            'Haworth',
            'Jarrold',
            'Patchett',
            'Sheringham',
            'Vinson'
        ],
        french: ['Antoine', 'Cocteau', 'Fontaine', 'Louis', 'Marais', 'Piccoli', 'Réjane', 'Trenet', 'Villon', 'Zazie'],
        dutch: [
            'Amerbach',
            'Bodemdorf',
            'Abner',
            'Hainisch',
            'Helm',
            'Liebermann',
            'Meier',
            'Popp',
            'Schürmann',
            'Trier'
        ],
        spanish: [
            'Alba',
            'Cabrera',
            'Esparza',
            'Fuentes',
            'Gamez',
            'Medina',
            'Pichardo',
            'Santiago',
            'Venegas',
            'Zepada'
        ]
    }
};

const nationalities = ['english', 'french', 'dutch', 'spanish'];

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
