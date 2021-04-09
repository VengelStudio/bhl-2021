import bcrypt from 'bcrypt';
import { BuildingDto } from '../dtos/building.dto';
import HttpException from '../exceptions/HttpException';
import { Building } from '../interfaces/building.interface';
import BuildingModel from '../models/building.model';
import { isEmpty } from '../utils/util';

class BuildingService {
  public users = BuildingModel;

  public async findAllUser(): Promise<BuildingDto> {
    return [];
  }
}

export default BuildingService;
