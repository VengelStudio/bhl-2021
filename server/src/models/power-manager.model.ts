export enum PowerManagerMode {
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
}

export class PowerManager {
  public mode: PowerManagerMode = PowerManagerMode.a;

  public setMode(newMode: PowerManagerMode) {
    this.mode = newMode;

    return newMode;
  }
}
