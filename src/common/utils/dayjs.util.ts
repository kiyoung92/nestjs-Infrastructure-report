import * as dayjs from 'dayjs';

export const dayjsUtil = {
  getTimestamp: () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
  },
};
