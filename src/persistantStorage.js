const initStorage = {
    crew: 4,
    ships: 1
};

const encrypt = value => window.btoa(value);
const decrypt = value => window.atob(value);

const getStorage = () => {
    let storage = window.localStorage.getItem('game');

    if (!storage) {
        window.localStorage.setItem('game', encrypt(JSON.stringify(initStorage)));
        return initStorage;
    }

    return JSON.parse(decrypt(storage));
};

const saveStorage = store => {
    window.localStorage.setItem('game', encrypt(JSON.stringify(store)));

    return store;
};

export const getValue = (storageName, defaultValue) => {
    const numberRegex = new RegExp('^\\d+$');
    const storage = getStorage();

    let value = storage[storageName] ? storage[storageName] : defaultValue;

    // Return a number if its a number
    value = numberRegex.test(value) ? parseInt(value, 10) : value;

    return value;
};

export const setValue = (storageName, value) => {
    const storage = getStorage();
    storage[storageName] = value;
    saveStorage(storage);
};
