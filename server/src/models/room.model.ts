export class Room {
  public id: number;
  public current_temperature: number | null = null;
  public target_temperature: number | null = null;
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
