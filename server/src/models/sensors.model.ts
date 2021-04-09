import { getSeason, SEASON } from '../utils/get-season';

const getBaseTemperature = (time: Date) => {
  switch (getSeason(time)) {
    case SEASON.WINTER:
      return -5;
      break;
    case SEASON.SPRING:
      return 12;
      break;
    case SEASON.SUMMER:
      return 20;
      break;
    case SEASON.FALL:
      return 10;
      break;
  }
};

const getRandomShift = (scale = 1) => {
  return (Math.random() * 2 - 1) * scale;
};

const getInsolationFromHour = hour => {
  return 0.98 / Math.abs(hour - 12);
};

export class Sensors {
  public outside = {
    temperature: 0,
    insolation: 0,
    clearSkyRatio: 0,
  };

  public recuperation = {
    incomingTemperature: 0,
  };

  public getValues(time: Date) {
    const temperatureOutside = getBaseTemperature(time) + (Math.random() * 2 - 1) * 5;

    return {
      outside: {
        temperature: temperatureOutside,
        insolation: getInsolationFromHour(time.getUTCHours()),
        clearSkyRatio: Math.random(),
      },
      recuperation: {
        incomingTemperature: temperatureOutside + getRandomShift(),
      },
    };
  }
}
