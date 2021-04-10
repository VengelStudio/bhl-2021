import { NextFunction, Request, Response } from 'express';
import { Simulation } from '../simulation/main';

const SimulationSingleton = require('../simulation/main');
class BuildingController {
  public getBuilding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const simulation: Simulation = SimulationSingleton.getInstance();

    try {
      res.status(200).json({ building: simulation.getBuilding(), time: simulation.getTimeManager().getTime() });
    } catch (error) {
      next(error);
    }
  };

  public postPowerManagerMode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const simulation: Simulation = SimulationSingleton.getInstance();

    try {
      res.status(200).json({ mode: simulation.getBuilding().powerManager.setMode(req.body.mode) });
    } catch (error) {
      next(error);
    }
  };
}

export default BuildingController;
