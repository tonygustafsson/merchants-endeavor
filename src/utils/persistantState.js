const encryptionMode = false;

const initState = {};

const encrypt = value => {
    if (encryptionMode) {
        return window.btoa(value);
    }

    return value;
};

const decrypt = value => {
    if (encryptionMode) {
        window.atob(value);
    }

    return value;
};

const getState = () => {
    let state = window.localStorage.getItem('game');

    if (!state) {
        window.localStorage.setItem('game', encrypt(JSON.stringify(initState)));
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

    if (typeof state[key] === 'undefined') {
        // The value does not yet exist, let's create it
        state[key] = defaultValue;
        setValue(key, defaultValue);
    }

    // Return a number if its a number
    let value = numberRegex.test(state[key]) ? parseInt(state[key], 10) : state[key];

    return value;
};

export const setValue = (key, value) => {
    const state = getState();
    state[key] = value;
    saveState(state);
};
