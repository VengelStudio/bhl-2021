export class Panels {
  // returns kW
  public getEfficiency(time: Date, cloudRatio: number) {
    const isBetween = (value: number, { a, b }: { a: number; b: number }) => {
      return value >= Math.min(a, b) && value <= Math.max(a, b);
    };

    const hour = time.getHours();
    const monthNatural = time.getMonth() + 1;

    if (true) {
      // todo add conditions
      return 0;
    }
  }
}

export class Sensors {
  public outsideTemperature;

  constructor(initialTemperature: number) {
    this.outsideTemperature = initialTemperature;
  }

  public refresh() {
    // shifts current temperature by a random number between -1 and 1
    const shift = Math.random() * 2 - 1;
    this.outsideTemperature += shift;
  }
}

export class Building {
  public rooms: any[] = [];
  public sensors: Sensors = new Sensors(20.1);

  public recalculate(newTime: Date) {
    // use newTime to calculate prices etc.

    this.sensors.refresh();
  }
}

// starting values here
const defaultBuilding: Building = new Building();

export default defaultBuilding;
