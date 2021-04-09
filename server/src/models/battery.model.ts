export class Battery {
  public capacity: number;
  public maxDischargeRate: number;
  public currentCharge: number = 0;

  constructor(capacity: number, maxDischargeRate: number) {
    this.capacity = capacity;
    this.maxDischargeRate = maxDischargeRate;
  }
}
