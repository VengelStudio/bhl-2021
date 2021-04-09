import defaultBuilding from '../models/building.model';

export class Simulation {
  private building = defaultBuilding;

  public tick() {
    console.log('SIMULATION TICK');
    this.building.tick();
  }

  public getBuilding() {
    return this.building;
  }
}

class SimulationSingleton {
  public static instance: Simulation;

  constructor() {
    throw new Error('Use Singleton.getInstance()');
  }

  static getInstance(): Simulation {
    if (!SimulationSingleton.instance) {
      SimulationSingleton.instance = new Simulation();
    }
    return SimulationSingleton.instance;
  }
}
module.exports = SimulationSingleton;
