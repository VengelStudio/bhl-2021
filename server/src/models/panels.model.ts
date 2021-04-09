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
