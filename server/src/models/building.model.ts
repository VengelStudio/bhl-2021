import { Room } from './room.model';

const isBetween = (value: number, { a, b }: { a: number; b: number }) => {
  return value >= Math.min(a, b) && value <= Math.max(a, b);
};
export class Panels {
  // returns kW
  public getEfficiency(time: Date, clearSkyRatio: number) {
    const hour = time.getUTCHours();
    const monthNatural = time.getUTCMonth() + 1;

    if (true) {
      // todo add conditions
      return Math.random() * 5;
    }
  }
}

export class Sensors {
  public outsideTemperature;
  public clearSkyRatio;

  constructor(initialTemperature: number, initialClearSkyRatio: number) {
    this.outsideTemperature = initialTemperature;
    this.clearSkyRatio = initialClearSkyRatio;
  }

  public refresh() {
    // shifts current temperature by a random number between -1 and 1
    const temperatureShift = Math.random() * 2 - 1;
    this.outsideTemperature += temperatureShift;

    this.clearSkyRatio = Math.random();
  }
}

const getTargetTemperature = (time: Date) => {
  const isHoliday = isBetween(time.getUTCMonth() + 1, { a: 7, b: 9 });
  const isWeekend = isBetween(time.getUTCDay() + 1, { a: 6, b: 7 });
  const isWorkday = !isWeekend;

  const hours = time.getUTCHours();

  if (isHoliday) {
    return 12;
  } else if (isWeekend) {
    const isMorning = isBetween(hours, { a: 0, b: 7 });

    return isMorning ? 20 : 23;
  } else if (isWorkday) {
    console.log(isWorkday, hours);
    const isMorning = isBetween(hours, { a: 0, b: 4 });

    return isMorning ? 20 : 23;
  }
};

export class Building {
  public rooms: Room[] = [
    new Room({ id: 1, heatingPower: 1 }),
    new Room({ id: 2, heatingPower: 1 }),
    new Room({ id: 3, heatingPower: 1.5 }),
    new Room({ id: 4, heatingPower: 1.5 }),
    new Room({ id: 5, heatingPower: 2 }),
    new Room({ id: 6, heatingPower: 2 }),
    new Room({ id: 7, heatingPower: 3 }),
  ];
  public sensors: Sensors = new Sensors(20.1, 0.3);
  public panels: Panels = new Panels();

  private randomizeVariables() {
    this.sensors.refresh();
  }

  public recalculate(newTime: Date) {
    this.randomizeVariables();

    this.rooms.forEach(room => room.setTargetTemperature(getTargetTemperature(newTime)));

    const panelEfficiency = this.panels.getEfficiency(newTime, this.sensors.clearSkyRatio);

    console.table({
      time: newTime.toISOString(),
      outsideTemperature: this.sensors.outsideTemperature,
      panelEfficiency,
      targetTemperature: getTargetTemperature(newTime),
    });
  }
}

// starting values here
const defaultBuilding: Building = new Building();

export default defaultBuilding;
