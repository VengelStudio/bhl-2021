import { Router } from 'express';
import BuildingController from '../controllers/building.controller';
import Route from '../interfaces/routes.interface';

class BuildingRoute implements Route {
  public path = '/building';
  public router = Router();
  public buildingController = new BuildingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.buildingController.getBuilding);
    this.router.post(`${this.path}/power-manager/mode`, this.buildingController.postPowerManagerMode);
    this.router.post(`${this.path}/power-exchange/days`, this.buildingController.postPowerExchangeDays);
    this.router.post(`${this.path}/simulation/day`, this.buildingController.postSimulationDay);
  }
}

export default BuildingRoute;
