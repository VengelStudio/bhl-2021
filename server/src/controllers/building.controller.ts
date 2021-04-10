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

  public postPowerExchangeDays = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const simulation: Simulation = SimulationSingleton.getInstance();

    simulation.getBuilding().powerExchange.setDays(req.body.pushDays, req.body.pullDays);

    try {
      res.status(200).json({ totalCost: simulation.getBuilding().powerExchange.getTotalCost() });
    } catch (error) {
      next(error);
    }
  };

  public postSimulationDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const simulation: Simulation = SimulationSingleton.getInstance();

    simulation.setDay(req.body.day);

    try {
      res.status(200).json({ simulation });
    } catch (error) {
      next(error);
    }
  };
}

export default BuildingController;
