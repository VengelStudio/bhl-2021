import { isBetween, isBetweenHours } from '../utils/is-between';

export interface SimpleDay {
  day: number;
  month: number;
  year: number;
}
export class PowerExchange {
  public pushDays: SimpleDay[] = [];
  public pullDays: SimpleDay[] = [];
  public totalCost: number = 0;

  public setDays(pushDays: SimpleDay[], pullDays: SimpleDay[]) {
    this.pushDays = pushDays;
    this.pullDays = pullDays;
  }

  getTotalCost(){
    this.pushDays.forEach(day => {
      this.totalCost += this.getPullCost(day);
      this.totalCost -= this.getPushCost(day);
    });
    return this.totalCost;
  }



  createDate(day: SimpleDay){
    return new Date(day.year, day.month,day.day)
  }

  getPullCost(day: SimpleDay) {
    let time = this.createDate(day)
    let energyFromNetworkCost = 0;
    const isWeekend = isBetween(time.getUTCDay() + 1, { a: 6, b: 7 });
    const isHoliday = isBetween(time.getUTCMonth() + 1, { a: 7, b: 9 });
    const isWorkday = !isWeekend;
    const hours = Math.floor(Math.random() * (0 - 24)) + 24;
    const month = time.getMonth();
    if ([1, 2, 3, 10, 11, 12].includes(month)) {
      if (isWorkday) {
        switch (true) {
          case isBetween(hours, { a: 0, b: 5 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 6, b: 12 }):
            energyFromNetworkCost = 2;
            break;
          case isBetween(hours, { a: 13, b: 14 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 15, b: 21 }):
            energyFromNetworkCost = 2;
            break;
          case isBetween(hours, { a: 22, b: 23 }):
            energyFromNetworkCost = 1;
            break;
        }
      } else {
        energyFromNetworkCost = 1;
      }
    } else if ([4, 5, 6, 7, 8, 9].includes(month)) {
      if (isWorkday) {
        switch (true) {
          case isBetween(hours, { a: 0, b: 5 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 6, b: 14 }):
            energyFromNetworkCost = 2;
            break;
          case isBetween(hours, { a: 15, b: 16 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 17, b: 21 }):
            energyFromNetworkCost = 2;
            break;
          case isBetween(hours, { a: 22, b: 23 }):
            energyFromNetworkCost = 1;
            break;
        }
      } else {
        switch (true) {
          case isBetween(hours, { a: 0, b: 11 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 12, b: 14 }):
            energyFromNetworkCost = 0.5;
            break;
          case isBetween(hours, { a: 15, b: 23 }):
            energyFromNetworkCost = 1;
            break;
        }
      }
    }

    return energyFromNetworkCost;
  }

  getPushCost(day: SimpleDay) {
    let time = this.createDate(day)
    let energyFromNetworkCost = 0;
    const isWeekend = isBetween(time.getUTCDay() + 1, { a: 6, b: 7 });
    const isHoliday = isBetween(time.getUTCMonth() + 1, { a: 7, b: 9 });
    const isWorkday = !isWeekend;
    const hours = time.getUTCHours();
    const month = time.getMonth();
    if ([1, 2, 3, 10, 11, 12].includes(month)) {
      if (isWorkday) {
        switch (true) {
          case isBetween(hours, { a: 0, b: 5 }):
            energyFromNetworkCost = 0.5;
            break;
          case isBetween(hours, { a: 6, b: 12 }):
            energyFromNetworkCost = 2.5;
            break;
          case isBetween(hours, { a: 13, b: 14 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 15, b: 21 }):
            energyFromNetworkCost = 2.5;
            break;
          case isBetween(hours, { a: 22, b: 23 }):
            energyFromNetworkCost = 0.5;
            break;
        }
      } else {
        energyFromNetworkCost = 0.5;
      }
    } else if ([4, 5, 6, 7, 8, 9].includes(month)) {
      if (isWorkday) {
        switch (true) {
          case isBetween(hours, { a: 0, b: 5 }):
            energyFromNetworkCost = 0.5;
            break;
          case isBetween(hours, { a: 6, b: 14 }):
            energyFromNetworkCost = 2.5;
            break;
          case isBetween(hours, { a: 15, b: 16 }):
            energyFromNetworkCost = 1;
            break;
          case isBetween(hours, { a: 17, b: 21 }):
            energyFromNetworkCost = 2.5;
            break;
          case isBetween(hours, { a: 22, b: 23 }):
            energyFromNetworkCost = 0.5;
            break;
        }
      } else {
        switch (true) {
          case isBetween(hours, { a: 0, b: 11 }):
            energyFromNetworkCost = 0.5;
            break;
          case isBetween(hours, { a: 12, b: 14 }):
            energyFromNetworkCost = 0.25;
            break;
          case isBetween(hours, { a: 15, b: 23 }):
            energyFromNetworkCost = 0.5;
            break;
        }
      }
      
  }
  return energyFromNetworkCost;
}
}
