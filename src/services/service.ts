import { Request, Response } from 'express';
import {getAllBeepersDal, getBeeperByIdDal, createBeeperDal, updateBeeperStatusDal, deleteBeeperDal } from '../dal/dal';
import { beeper } from '../models/model';
import {status} from '../enum/status';

export const getAllBeepers = (req: Request, res: Response) : void => {
    const beepers: beeper[] = getAllBeepersDal();
    res.json(beepers);
};

export const getBeeperDetailsById = (req: Request, res: Response) : void => {
    const id = req.params.id;
    const beeper: beeper | undefined = getBeeperByIdDal(Number(id));
    res.json(beeper);
}

export const createBeeper = (req: Request, res: Response) : void => {
    const id: number = getAllBeepersDal().length + 1;
    const name : string = req.body.name;
    const status : string = 'manufactured';
    const newBeeper: beeper = {id, name, status}; 
    createBeeperDal(newBeeper);
    res.json(newBeeper);
}

export const updateBeeperStatus = (req: Request, res: Response) : void => {///לא סיימתי
    const id = req.params.id;
    const beeper = getBeeperByIdDal(Number(id));
    if (beeper) {
    const currentstatus: string = beeper.status;
    const statusIndex: number = status.indexOf(currentstatus);

    const newStatus: string = status[statusIndex + 1];

    if (newStatus === "deployed") {
        beeper.longitude = req.body.longitude;
        beeper.latitude = req.body.latitude;
    }

    beeper.status = newStatus;
    updateBeeperStatusDal(beeper);
    res.json(beeper);
    }    
}

export const deleteBeeper = (req: Request, res: Response) : void => {
    const id = req.params.id;
    deleteBeeperDal(Number(id));

    res.json({id});
}