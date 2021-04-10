export class Battery {
  public capacity: number;
  public maxDischargeRate: number;
  public currentCharge: number;
  public batteryLevel:number = 0;

  constructor(capacity: number, maxDischargeRate: number, currentCharge: number) {
    this.capacity = capacity;
    this.maxDischargeRate = maxDischargeRate;
    this.currentCharge = currentCharge;
  }

  public getEfficiency() {
    let efficiency = 10;
    return efficiency;
  }

  public chargeBattery(energy:number){
    this.currentCharge += energy;
  }

  public calculateBatteryLevel(){
    this.batteryLevel = Math.round((this.currentCharge/this.capacity)*100);
  }

  public dischargeBattery(){
    this.currentCharge -= 600/(this.maxDischargeRate*1000);
    if(this.currentCharge < 0){
      this.currentCharge = 0;
    }
  }
}
