import { isBetween, isBetweenHours } from '../utils/is-between';

enum ClearSkyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

enum DayTime {
  NIGHT = 'NIGHT',
  EARLY = 'EARLY',
  NOON = 'NOON',
}

const calculateEfficiency = (hour: number, month: number, clearSkyRatio: number) => {
  const clearSkyLevel = isBetween(clearSkyRatio, { a: 0, b: 0.6 })
    ? ClearSkyLevel.LOW
    : isBetween(clearSkyRatio, { a: 0.6, b: 0.9 })
    ? ClearSkyLevel.MEDIUM
    : ClearSkyLevel.HIGH;

  if ([1, 12].includes(month)) {
    const dayTime = isBetweenHours(hour, { a: 15, b: 7 })
      ? DayTime.NIGHT
      : isBetweenHours(hour, { a: 8, b: 9 }) || isBetweenHours(hour, { a: 14, b: 14 })
      ? DayTime.EARLY
      : DayTime.NOON;

    switch (clearSkyLevel) {
      case ClearSkyLevel.LOW:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 0.5;
          case DayTime.NOON:
            return 1.5;
        }

      case ClearSkyLevel.MEDIUM:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 1;
          case DayTime.NOON:
            return 2;
        }
      case ClearSkyLevel.HIGH:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 1.5;
          case DayTime.NOON:
            return 3;
        }
    }
  } else if ([2, 3, 10, 11].includes(month)) {
    const dayTime = isBetweenHours(hour, { a: 16, b: 6 })
      ? DayTime.NIGHT
      : isBetweenHours(hour, { a: 7, b: 8 }) || isBetweenHours(hour, { a: 15, b: 15 })
      ? DayTime.EARLY
      : DayTime.NOON;

    switch (clearSkyLevel) {
      case ClearSkyLevel.LOW:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 0.5;
          case DayTime.NOON:
            return 1.5;
        }

      case ClearSkyLevel.MEDIUM:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 2;
          case DayTime.NOON:
            return 3;
        }
      case ClearSkyLevel.HIGH:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 2;
          case DayTime.NOON:
            return 4;
        }
    }
  } else if ([4, 5, 9].includes(month)) {
    const dayTime = isBetweenHours(hour, { a: 18, b: 5 })
      ? DayTime.NIGHT
      : isBetweenHours(hour, { a: 6, b: 6 }) || isBetweenHours(hour, { a: 17, b: 17 })
      ? DayTime.EARLY
      : DayTime.NOON;

    switch (clearSkyLevel) {
      case ClearSkyLevel.LOW:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 1;
          case DayTime.NOON:
            return 2;
        }

      case ClearSkyLevel.MEDIUM:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 3;
          case DayTime.NOON:
            return 4;
        }
      case ClearSkyLevel.HIGH:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 3.5;
          case DayTime.NOON:
            return 5;
        }
    }
  } else {
    const dayTime = isBetweenHours(hour, { a: 20, b: 4 })
      ? DayTime.NIGHT
      : isBetweenHours(hour, { a: 5, b: 6 }) || isBetweenHours(hour, { a: 19, b: 19 })
      ? DayTime.EARLY
      : DayTime.NOON;

    switch (clearSkyLevel) {
      case ClearSkyLevel.LOW:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 1;
          case DayTime.NOON:
            return 2;
        }

      case ClearSkyLevel.MEDIUM:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 3;
          case DayTime.NOON:
            return 4;
        }
      case ClearSkyLevel.HIGH:
        switch (dayTime) {
          case DayTime.NIGHT:
            return 0;
          case DayTime.EARLY:
            return 3.5;
          case DayTime.NOON:
            return 5;
        }
    }
  }
};
export class Panels {
  public efficiency = 0;
  public power_today = 0;
  public today_day = -1;

  // returns kW
  public getEfficiency(time: Date, clearSkyRatio: number) {
    const hour = time.getUTCHours();
    const monthNatural = time.getUTCMonth() + 1;

    let calculatedEfficiency = calculateEfficiency(hour, monthNatural, clearSkyRatio);

    this.efficiency = calculatedEfficiency;

    if (time.getUTCDay() !== this.today_day) {
      this.power_today = 0;
      this.today_day = time.getUTCDay();
    } else {
      this.power_today += calculatedEfficiency * (1 / 6);
    }

    return calculatedEfficiency;
  }
}
