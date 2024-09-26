"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeepersByStatus = exports.deleteBeeper = exports.updateBeeperStatus = exports.createBeeper = exports.getBeeperDetailsById = exports.getAllBeepers = void 0;
const dal_1 = require("../dal/dal");
const status_1 = require("../enum/status");
const maxRang = 38;
const minRange = 32;
const getAllBeepers = (req, res) => {
    const beepers = (0, dal_1.getAllBeepersDal)();
    res.json(beepers);
};
exports.getAllBeepers = getAllBeepers;
const getBeeperDetailsById = (req, res) => {
    try {
        const id = req.params.id;
        const beeper = (0, dal_1.getBeeperByIdDal)(Number(id));
        if (!beeper) {
            res.status(404).json({ error: 'beeper not found' });
        }
        res.json(beeper);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getBeeperDetailsById = getBeeperDetailsById;
const createBeeper = (req, res) => {
    const id = (0, dal_1.getAllBeepersDal)().length + 1;
    const name = req.body.name;
    const status = 'manufactured';
    const created_at = new Date();
    const newBeeper = { id, name, status, created_at };
    (0, dal_1.createBeeperDal)(newBeeper);
    res.json(newBeeper);
};
exports.createBeeper = createBeeper;
const updateBeeperStatus = (req, res) => {
    try {
        const id = req.params.id;
        const beeper = (0, dal_1.getBeeperByIdDal)(Number(id));
        if (beeper === undefined) {
            res.status(404).json({ error: 'beeper not found' });
        }
        else {
            const currentstatus = beeper.status;
            const statusIndex = status_1.status.indexOf(currentstatus);
            const newStatus = status_1.status[statusIndex + 1];
            switch (newStatus) {
                case "assembled": {
                    beeper.status = newStatus;
                    (0, dal_1.updateBeeperStatusDal)(beeper);
                    res.json(beeper);
                    break;
                }
                case "shipped": {
                    beeper.status = newStatus;
                    (0, dal_1.updateBeeperStatusDal)(beeper);
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
                        (0, dal_1.updateBeeperStatusDal)(beeper);
                        res.json(beeper);
                        setInterval(() => donnetBeeper(beeper), 10000);
                        break;
                    }
                    else {
                        res.status(404).json({ error: 'beeper not in the range' });
                    }
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
};
exports.updateBeeperStatus = updateBeeperStatus;
const deleteBeeper = (req, res) => {
    const id = req.params.id;
    try {
        const beepers = (0, dal_1.getAllBeepersDal)();
        const index = beepers.findIndex((b) => b.id === Number(id));
        if (index === -1) {
            res.status(404).json({ error: 'beeper not found' });
        }
        beepers.splice(index, 1);
        (0, dal_1.deleteBeeperDal)(Number(id));
    }
    catch (error) {
        console.log(error);
    }
    (0, dal_1.deleteBeeperDal)(Number(id));
    res.json({ id });
};
exports.deleteBeeper = deleteBeeper;
const getBeepersByStatus = (req, res) => {
    if (req.params.status !== "manufactured" && req.params.status !== status_1.status[0] && req.params.status !== status_1.status[1] && req.params.status !== status_1.status[2] && req.params.status !== status_1.status[3]) {
        res.status(404).json({ error: 'Invalid status ' });
    }
    const currentstatus = req.params.status;
    const beepers = (0, dal_1.getAllBeepersDal)();
    const filteredBeepers = beepers.filter((b) => b.status === currentstatus);
    res.json(filteredBeepers);
};
exports.getBeepersByStatus = getBeepersByStatus;
const donnetBeeper = (beeper) => {
    beeper.status = 'detonated';
    beeper.detonated_at = new Date();
    (0, dal_1.updateBeeperStatusDal)(beeper);
};
