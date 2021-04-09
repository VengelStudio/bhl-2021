export enum SEASON {
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
}

export const getSeason = (date: Date) => {
  switch (date.getUTCMonth()) {
    case 12:
    case 1:
    case 2:
      return SEASON.WINTER;
      break;
    case 3:
    case 4:
    case 5:
      return SEASON.SPRING;
      break;
    case 6:
    case 7:
    case 8:
      return SEASON.SUMMER;
      break;
    case 9:
    case 10:
    case 11:
      return SEASON.FALL;
      break;
  }
};
