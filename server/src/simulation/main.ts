import defaultBuilding from '../models/building.model';
import initialTimeManager from '../models/time-manager.model';

export class Simulation {
  private building = defaultBuilding;
  private timeManager = initialTimeManager;

  public tick() {
    this.building.recalculate(this.timeManager.getTime());
    this.timeManager.tick();
  }

  public getBuilding() {
    return this.building;
  }

  public getTimeManager() {
    return this.timeManager;
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
