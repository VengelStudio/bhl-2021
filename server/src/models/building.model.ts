import { Battery } from './battery.model';
import { Panels } from './panels.model';
import { PowerExchange } from './power-exchange.model';
import { Room } from './room.model';
import { Sensors } from './sensors.model';
import { WaterStorage } from './water-storage.model';

const isBetween = (value: number, { a, b }: { a: number; b: number }) => {
  return value >= Math.min(a, b) && value <= Math.max(a, b);
};

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
    new Room({ id: 1, heatingPower: 1 }),
    new Room({ id: 2, heatingPower: 1 }),
    new Room({ id: 3, heatingPower: 1.5 }),
    new Room({ id: 4, heatingPower: 1.5 }),
    new Room({ id: 5, heatingPower: 2 }),
    new Room({ id: 6, heatingPower: 2 }),
    new Room({ id: 7, heatingPower: 3 }),
  ];
  public sensors: Sensors = new Sensors();
  public panels: Panels = new Panels();
  public battery: Battery = new Battery(7, 2);
  public waterStorage: WaterStorage = new WaterStorage();
  public powerExchange: PowerExchange = new PowerExchange();

  public getConsumption() {

    this.rooms.forEach(room => { (room.is_heated === true) ? powerConsumption += room.heating_power : powerConsumption -= room.heating_power});
    return powerConsumption;
  }


  public recalculate(newTime: Date) {
    const sensorData = this.sensors.getValues(newTime);

    this.rooms.forEach(room => room.setTargetTemperature(getTargetTemperature(newTime)));

   // const panelEfficiency = this.panels.getEfficiency(newTime, this.sensors.clearSkyRatio);
    
    this.heatRooms();
    

    console.table({
      room1: this.rooms[0].is_heated,
      room2: this.rooms[1].is_heated,
      room3: this.rooms[2].is_heated,
      room4: this.rooms[3].is_heated,
      room5: this.rooms[4].is_heated,
      room6: this.rooms[5].is_heated,
      room7: this.rooms[6].is_heated,

    });

    // console.table({
    //   time: newTime.toISOString(),
    //   outsideTemperature: this.sensors.outsideTemperature,
    //   panelEfficiency,
    //   targetTemperature: getTargetTemperature(newTime),
    // });
  }
  
  public differenceCheck(room: Room){
      let differenceCheck = Math.abs(room.current_temperature - room.target_temperature);
      return differenceCheck < 0.1;

  } 
  public heatRooms() {
    this.rooms.forEach(room => {this.differenceCheck(room) ? room.is_heated = true : room.is_heated = false});
  
  }

}

// starting values here
const defaultBuilding: Building = new Building();
let powerConsumption = 0;

export default defaultBuilding;
