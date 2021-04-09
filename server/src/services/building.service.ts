import { BuildingDto } from '../dtos/building.dto';
import BuildingModel from '../models/building.model';
import { Simulation } from '../simulation/main';

const SimulationSingleton = require('../simulation/main');

class BuildingService {
  public users = BuildingModel;

  public async getBuilding(): Promise<BuildingDto> {
    const instance: Simulation = SimulationSingleton.getInstance();

    return instance.getBuilding();
  }
}

export default BuildingService;
