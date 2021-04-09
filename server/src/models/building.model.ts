export class Panels {
  // returns kW
  public getEfficiency(time: Date, clearSkyRatio: number) {
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

export class Building {
  public rooms: any[] = [];
  public sensors: Sensors = new Sensors(20.1, 0.3);
  public panels: Panels = new Panels();

  public recalculate(newTime: Date) {
    // use newTime to calculate prices etc.

    this.sensors.refresh();

    const panelEfficiency = this.panels.getEfficiency(newTime, this.sensors.clearSkyRatio);

    console.table({ outsideTemperature: this.sensors.outsideTemperature, panelEfficiency });
  }
}

// starting values here
const defaultBuilding: Building = new Building();

export default defaultBuilding;
