import { Request, Response } from 'express';


import { getAllBeepersDal, getBeeperByIdDal, createBeeperDal, updateBeeperStatusDal, deleteBeeperDal } from '../dal/dal';
import { beeper } from '../models/model';
import { status } from '../enum/status';

const maxRang: number = 38;
const minRange: number = 32;

export const getAllBeepers = (req: Request, res: Response): void => {
    const beepers: beeper[] = getAllBeepersDal();
    res.json(beepers);
};

export const getBeeperDetailsById = (req: Request, res: Response): void => {
    try {
        const id = req.params.id;
        const beeper: beeper | undefined = getBeeperByIdDal(Number(id));
        if (!beeper) {
            res.status(404).json({ error: 'beeper not found' });
        }
        res.json(beeper);

    }
    catch (error) {
        console.log(error);
    }
}

export const createBeeper = (req: Request, res: Response): void => {
    const id: number = getAllBeepersDal().length + 1;
    const name: string = req.body.name;
    const status: string = 'manufactured';
    const created_at: Date = new Date();
    const newBeeper: beeper = { id, name, status, created_at };
    createBeeperDal(newBeeper);
    res.json(newBeeper);
}

export const updateBeeperStatus = (req: Request, res: Response): void => {
    try {
        const id = req.params.id;
        const beeper = getBeeperByIdDal(Number(id));

        if (beeper === undefined) {
            res.status(404).json({ error: 'beeper not found' });

        }
        else {
            const currentstatus: string = beeper.status;
            const statusIndex: number = status.indexOf(currentstatus);

            const newStatus: string = status[statusIndex + 1];

            switch (newStatus) {
                case "assembled": {
                    beeper.status = newStatus;
                    updateBeeperStatusDal(beeper);
                    res.json(beeper);
                    break;
                }

                case "shipped": {
                    beeper.status = newStatus;
                    updateBeeperStatusDal(beeper);
                    res.json(beeper);
                    break;
                }

                case "deployed": {
                    if (req.body.longitude === undefined || req.body.latitude === undefined) {
                        res.status(404).json({ error: 'Missing coordinates' });
                        return;
                    }
                    beeper.longitude = req.body.longitude;
                    beeper.latitude = req.body.latitude;
                    if (Number(beeper.longitude) > minRange && Number(beeper.longitude) < maxRang && Number(beeper.latitude) > minRange && Number(beeper.latitude) < maxRang) {
                        beeper.status = newStatus;
                        updateBeeperStatusDal(beeper);
                        res.json(beeper);
                        return;
                    }
                    else {
                        return;
                        
                    }
                }
                case "detonated": {
                    beeper.status = newStatus;
                    beeper.detonated_at = new Date();

                    updateBeeperStatusDal(beeper);
                    res.json(beeper);
                    break;
                }

                default: {
                    res.status(404).json({ error: 'beeper as detonated' });
                }

            }

        }
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteBeeper = (req: Request, res: Response): void => {
    const id = req.params.id;
    try {
        const beepers: beeper[] = getAllBeepersDal();
        const index: number = beepers.findIndex((b: beeper) => b.id === Number(id));
        if (index === -1) {
            res.status(404).json({ error: 'beeper not found' });
        }
        beepers.splice(index, 1);
        deleteBeeperDal(Number(id));
    }
    catch (error) {
        console.log(error);
    }
    deleteBeeperDal(Number(id));

    res.json({ id });
}

export const getBeepersByStatus = (req: Request, res: Response): void => {
    if (req.params.status !== "manufactured" && req.params.status !== status[0] && req.params.status !== status[1] && req.params.status !== status[2] && req.params.status !== status[3]) {
        res.status(404).json({ error: 'Invalid status ' });
    }
    const currentstatus: string = req.params.status;

    const beepers: beeper[] = getAllBeepersDal();
    const filteredBeepers: beeper[] = beepers.filter((b: beeper) => b.status === currentstatus);
    res.json(filteredBeepers);
}