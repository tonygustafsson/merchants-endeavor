const initState = {
    crew: 4,
    ships: 1
};

const encrypt = value => window.btoa(value);
const decrypt = value => window.atob(value);

const getState = () => {
    let state = window.localStorage.getItem('game');

    if (!state) {
        window.localStorage.setItem('game', encrypt(JSON.stringify(initStorage)));
        return initState;
    }

    state = JSON.parse(decrypt(state));
    console.log('New state', state);
    return state;
};

const saveState = state => {
    window.localStorage.setItem('game', encrypt(JSON.stringify(state)));

    return state;
};

export const getValue = (key, defaultValue) => {
    const numberRegex = new RegExp('^\\d+$');
    const state = getState();

    let value = state[key] ? state[key] : defaultValue;

    // Return a number if its a number
    value = numberRegex.test(value) ? parseInt(value, 10) : value;

    return value;
};

export const setValue = (key, value) => {
    const state = getState();
    state[key] = value;
    saveState(state);
};
