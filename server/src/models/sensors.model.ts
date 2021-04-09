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
