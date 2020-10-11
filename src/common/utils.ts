export const capitalizeFirstLetter = (option: string): string => `${option.charAt(0).toUpperCase()}${option.slice(1)}`;

export const getRandomNumber = (): number => Math.floor(Math.random() * 100000);

export const cloneArray = (array: Array<any>): Array<any> => JSON.parse(JSON.stringify(array));
