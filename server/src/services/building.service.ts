import { BuildingDto } from '../dtos/building.dto';
import BuildingModel from '../models/building.model';

class BuildingService {
  public users = BuildingModel;

  public async findAllUser(): Promise<BuildingDto> {
    return [];
  }
}

export default BuildingService;
