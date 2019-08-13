export const getRandomLineFromFile = file => {
    return new Promise((resolve, reject) => {
        fetch(file)
            .then(data => {
                return data.text();
            })
            .then(list => {
                const listItems = list.split('\n');
                const chosenItem = listItems[Math.floor(Math.random() * Math.floor(listItems.length))];

                resolve(chosenItem);
            })
            .catch(err => {
                reject('Could not create ship...');
            });
    });
};
