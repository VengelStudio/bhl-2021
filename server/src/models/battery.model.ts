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
    let efficiency = this.maxDischargeRate;
    return efficiency;
  }

  public chargeBattery(energy:number){
    energy > 1 ? this.currentCharge += energy :  this.currentCharge += 1; //to do tego ze jest maksymalne ladowanie 1kwh wezcie sprawdzcie to prosze
    if(this.currentCharge > this.capacity){
      this.currentCharge = this.capacity;
    }
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
