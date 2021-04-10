export class Room {
  public id: number;
  public name: string;
  public current_temperature = Math.random() * 10 + 10;
  public target_temperature = 70;
  public heating_power: number;
  public heating_rate_per_tick: number;
  public is_heated: boolean;
  public tint: string;

  constructor({ id, heatingPower, name, tint }: { id: number; heatingPower: number; name: string; tint: string }) {
    this.id = id;
    this.heating_power = heatingPower;
    this.name = name;
    this.tint = tint;
  }

  public setTargetTemperature(targetTemperature: number) {
    this.target_temperature = targetTemperature;
  }
}
