export class Room {
  public id: number;
  public current_temperature = Math.random() * 10 + 10;
  public target_temperature = 70;
  public heating_power: number;
  public heating_rate_per_tick: number;
  public is_heated: boolean;

  constructor({ id, heatingPower }: { id: number; heatingPower: number }) {
    this.id = id;
    this.heating_power = heatingPower;
  }

  public setTargetTemperature(targetTemperature: number) {
    this.target_temperature = targetTemperature;
  }
}
