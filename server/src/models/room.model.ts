export class Room {
  public id: number;
  public current_temperature = 69;
  public target_temperature = 70;
  public heating_power: number;
  public heating_rate_per_tick: number;

  constructor({ id, heatingPower }: { id: number; heatingPower: number }) {
    this.id = id;
    this.heating_power = heatingPower;
  }

  public setTargetTemperature(targetTemperature: number) {
    this.target_temperature = targetTemperature;
  }
}
