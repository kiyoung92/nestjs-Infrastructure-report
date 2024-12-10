import * as dayjs from 'dayjs';

export const getTimestamp = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
};
