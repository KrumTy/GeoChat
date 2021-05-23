import moment from 'moment';

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElement = <T>(elements: T[]) => {
  const randomIndex = getRandomInt(0, elements.length - 1);
  return elements[randomIndex];
};

export const formatCommentTimestamp = (
  timestamp: number,
  format: string = 'HH:mm',
) => moment.unix(timestamp / 1000).format(format);
