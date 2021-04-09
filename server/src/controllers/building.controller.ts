import { NextFunction, Request, Response } from 'express';
import { BuildingDto } from '../dtos/building.dto';
import BuildingService from '../services/building.service';

class BuildingController {
  public buildingService = new BuildingService();

  public getBuilding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: {} as BuildingDto, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default BuildingController;
