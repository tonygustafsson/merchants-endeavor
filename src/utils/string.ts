export const ucFirst = (str: string): string => {
	if (!str || str === '') return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRandomId = (length: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};
