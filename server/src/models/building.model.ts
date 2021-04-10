import { Battery } from './battery.model';
import { Panels } from './panels.model';
import { PowerExchange } from './power-exchange.model';
import { PowerManager } from './power-manager.model';
import { Room } from './room.model';
import { Sensors } from './sensors.model';
import { WaterStorage } from './water-storage.model';
import { isBetween, isBetweenHours } from '../utils/is-between';

const getTargetTemperature = (time: Date) => {
  const isHoliday = isBetween(time.getUTCMonth() + 1, { a: 7, b: 9 });
  const isWeekend = isBetween(time.getUTCDay() + 1, { a: 6, b: 7 });
  const isWorkday = !isWeekend;

  const hours = time.getUTCHours();

  if (isHoliday) {
    return 12;
  } else if (isWeekend) {
    const isMorning = isBetween(hours, { a: 0, b: 7 });

    return isMorning ? 20 : 23;
  } else if (isWorkday) {
    const isMorning = isBetween(hours, { a: 0, b: 4 });

    return isMorning ? 20 : 23;
  }
};

export class Building {
  public rooms: Room[] = [
    new Room({ id: 1, heatingPower: 1, name: 'Kitchen', tint: '#8c892e47' }),
    new Room({ id: 2, heatingPower: 1, name: 'Bathroom', tint: '#2e608c47' }),
    new Room({ id: 3, heatingPower: 1.5, name: 'Living room', tint: '#528c2e47' }),
    new Room({ id: 4, heatingPower: 1.5, name: 'Bedroom', tint: '#23232347' }),
    new Room({ id: 5, heatingPower: 2, name: 'Guest bedroom', tint: '#2a495847' }),
    new Room({ id: 6, heatingPower: 2, name: 'Dining room', tint: '#9a559e47' }),
    new Room({ id: 7, heatingPower: 3, name: 'Utility room', tint: '#decd4c47' }),
  ];
  public sensors: Sensors = new Sensors();
  public panels: Panels = new Panels();
  public battery: Battery = new Battery(7, 2, 7);
  public waterStorage: WaterStorage = new WaterStorage();
  public powerExchange: PowerExchange = new PowerExchange();
  public powerManager: PowerManager = new PowerManager();
  public energyConsumption: number;

  public getConsumption() {
    let powerConsumption = 0;
    this.rooms.forEach(room => {
      room.is_heated === true ? (powerConsumption += room.heating_power + this.waterStorage.heating_power + additionalEnergyConsumed) : '';
    });
    this.energyConsumption = powerConsumption;


    return powerConsumption;
  }

  public recalculate(newTime: Date) {
    const sensorData = this.sensors.getValues(newTime);
    this.solarEnergy(newTime);
    this.getAdditionalEnergyConsumed(newTime);
    if(this.battery.currentCharge > 0){
      this.battery.dischargeBattery();
    }
    this.battery.calculateBatteryLevel();

// MODE A

    if(this.powerManager.mode === 'a'){
      let powerWithSolar = this.getConsumption() - solarEfficiency;
        if(powerWithSolar > 0){
          powerFromNetworkUsage = powerWithSolar;
        }

        else{
          if(this.battery.currentCharge < this.battery.capacity){
          this.battery.chargeBattery(Math.abs(powerWithSolar));
          }
        }
    }
// MODE B
      if (this.powerManager.mode === 'b'){
        let powerWithSolar = this.getConsumption() - solarEfficiency;

        if(powerWithSolar > 0){
          powerFromNetworkUsage = powerWithSolar;
        }

        else{
          powerGivenToNetwork += Math.abs(powerWithSolar)
        }
      }

// MODE C
      if (this.powerManager.mode === 'c') {
          let powerWithSolar = this.getConsumption() - solarEfficiency;
  
          if(powerWithSolar > 0){
            powerFromNetworkUsage = powerWithSolar;
          }
  
          else{
            if(this.battery.currentCharge < this.battery.capacity){
              this.battery.chargeBattery(Math.abs(powerWithSolar));
              }
          }
      }

// MODE D
      if (this.powerManager.mode === 'd'){
        let powerWithSolarAndBattery = this.getConsumption() - solarEfficiency - this.battery.getEfficiency();

        if (powerWithSolarAndBattery > 0){
          powerFromNetworkUsage = powerWithSolarAndBattery;
        }

        else{
          powerGivenToNetwork += Math.abs(powerWithSolarAndBattery);
        }
      }

    this.rooms.forEach(room => room.setTargetTemperature(getTargetTemperature(newTime)));

    const panelEfficiency = this.panels.getEfficiency(newTime, this.sensors.outside.clearSkyRatio);

    this.heatRooms();
    this.waterStorage.size -= 1.25;

    if (shouldWaterBeHeated) {
      this.waterHeating();
    }

    if (this.waterStorage.size < 30) {
      this.waterStorage.heating_power = 6;
      shouldWaterBeHeated = true;
    } else if (this.waterStorage.size >= 150) {
      this.waterStorage.size = 150;
      this.waterStorage.heating_power = 0;
      shouldWaterBeHeated = false;
    }

   

    // console.table(
    //   [0, 1, 2, 3, 4, 5, 6].map(id => ({
    //     is_heated: this.rooms[id].is_heated,
    //     current_temperature: this.rooms[id].current_temperature,
    //     target_temperature: this.rooms[id].target_temperature,
    //     differenceCheck: this.differenceCheck(this.rooms[id]),
    //     newTime,
    //   })),
    // );
  }

  public differenceCheck(room: Room) {
    let differenceCheck = room.current_temperature - room.target_temperature;

    return differenceCheck < 1;
  }

  public heatRooms() {
    this.rooms.forEach(room => {
      this.differenceCheck(room) ? (room.is_heated = true) : (room.is_heated = false);
    });
    this.rooms.forEach(room => {
      room.is_heated ? (room.current_temperature += 1 / 6) : (room.current_temperature += this.temperatureDecrease(this.sensors.outside.temperature));
    });
    let consumption = 0;

    while (consumption >= 10) {
      consumption = this.getConsumption();
      this.rooms[this.getRoomWithMinDifference().id].is_heated = false;
    }
  }

  public waterHeating() {
    waterPowerConsumption = 6;
    this.waterStorage.size += 25;
  }

  public temperatureDecrease(temperature: number) {
    let temperatureDecrease = 0;

    switch (true) {
      case temperature < -20:
        temperatureDecrease = -(10 / 15);
        break;
      case temperature < -10:
        temperatureDecrease = -(1 / 3);
        break;

      case temperature < -5:
        temperatureDecrease = -(1 / 6);
        break;

      case temperature < 0:
        temperatureDecrease = -(1 / 12);
        break;

      case temperature < 5:
        temperatureDecrease = -(1 / 18);
        break;
      case temperature < 15:
        temperatureDecrease = -(1 / 24);
        break;

      case temperature < 20:
        temperatureDecrease = -(1 / 36);
        break;
    }

    return temperatureDecrease;
  }

  public getRoomWithMinDifference() {
    let differenceArray = [];
    let heatedRooms = [];
    this.rooms.forEach(room => {
      room.is_heated ? heatedRooms.push(room) : '';
    });

    for (let i = 0; i < heatedRooms.length; i++) {
      differenceArray.push({ id: heatedRooms[i].id, difference: heatedRooms[i].current_temperature - heatedRooms[i].target_temperature });
    }

    return differenceArray.reduce(function (prev, curr) {
      return prev.difference < curr.difference ? prev : curr;
    });
  }


  public getAdditionalEnergyConsumed(time: any){
    const isWeekend = isBetween(time.getUTCDay() + 1, { a: 6, b: 7 });
    const isHoliday = isBetween(time.getUTCMonth() + 1, { a: 7, b: 9 });
    const isWorkday = !isWeekend;
    const hours = time.getUTCHours();

    if(isWorkday){
      switch(true){
          case isBetween(hours, { a: 0, b: 4 }):
            additionalEnergyConsumed = 0.5;
            break;
          case isBetween(hours, { a: 5, b: 7 }):
            additionalEnergyConsumed = 3;
            break;
          case isBetween(hours, { a: 8, b: 9 }):
            additionalEnergyConsumed = 2;
            break;
          case isBetween(hours, { a: 10, b: 15 }):
            additionalEnergyConsumed = 1;
            break;  
          case isBetween(hours, { a: 16, b: 19 }):
            additionalEnergyConsumed = 2;
            break;  
          case isBetween(hours, { a: 20, b: 23 }):
            additionalEnergyConsumed = 1;
            break;  
      }
    }else if (!isWorkday){
      switch(true){
        case isBetween(hours, { a: 0, b: 7 }):
          additionalEnergyConsumed = 0.5;
          break;
        case isBetween(hours, { a: 8, b: 11 }):
          additionalEnergyConsumed = 3;
          break;
        case isBetween(hours, { a: 12, b: 16 }):
          additionalEnergyConsumed = 1;
          break;
        case isBetween(hours, { a: 17, b: 23 }):
          additionalEnergyConsumed = 2;
          break;  
      }
    }else if(isHoliday){
      additionalEnergyConsumed = 0.5;
    }
    console.log('additional energy consumed', additionalEnergyConsumed)
  }


// MODE 1

public solarEnergy(newDate : Date){

  solarEfficiency  = this.panels.getEfficiency(newDate, this.sensors.outside.clearSkyRatio);    
}






}

// starting values here
const defaultBuilding: Building = new Building();
let shouldWaterBeHeated = false;
let waterPowerConsumption = 0;
let solarEfficiency = 0;
let powerFromNetworkUsage = 0;
let powerGivenToNetwork = 0;
let additionalEnergyConsumed = 0;

export default defaultBuilding;
