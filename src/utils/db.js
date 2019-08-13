import localforage from 'localforage';

localforage.config({
    name: 'Merchant Simulator',
    storeName: 'game'
});

export const saveStateToDb = (table, state) => {
    localforage.setItem(table, state);
};

export const getStateFromDb = table => {
    return new Promise((resolve, reject) => {
        localforage
            .getItem(table)
            .then(value => {
                if (value) {
                    resolve(value);
                }

                reject('Not stored');
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const clearDatabase = () => {
    localforage
        .clear()
        .then(() => {
            console.log('Cleared database');
        })
        .catch(err => {
            console.error(err);
        });
};
