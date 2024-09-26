import { Request, Response } from 'express';
import {getAllBeepersDal} from '../dal/dal';
import { beeper } from '../models/model';


export const getAllBeepers = (req: Request, res: Response) : void => {
    const beepers: beeper[] = getAllBeepersDal();
    res.json(beepers);
};

export const getBeeperDetailsById = (req: Request, res: Response) : void => {
    const beepers: beeper[] = getAllBeepersDal();
    const id = req.params.id;
    const beeper: beeper | undefined = beepers.find((beeper: beeper) => beeper.name === id);
    res.json(beeper);
}