export const getRandomLineFromFile = (file: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		import(/* @vite-ignore */ file)
			.then(json => {
				const chosenItem =
					json.default[Math.floor(Math.random() * Math.floor(json.default.length))];

				resolve(chosenItem);
			})
			.catch(err => {
				reject(`Could not read file: ${file}. Error: ${err}`);
			});
	});
};
