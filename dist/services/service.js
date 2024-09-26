"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBeeper = exports.updateBeeperStatus = exports.createBeeper = exports.getBeeperDetailsById = exports.getAllBeepers = void 0;
const dal_1 = require("../dal/dal");
const status_1 = require("../enum/status");
const getAllBeepers = (req, res) => {
    const beepers = (0, dal_1.getAllBeepersDal)();
    res.json(beepers);
};
exports.getAllBeepers = getAllBeepers;
const getBeeperDetailsById = (req, res) => {
    const id = req.params.id;
    const beeper = (0, dal_1.getBeeperByIdDal)(Number(id));
    res.json(beeper);
};
exports.getBeeperDetailsById = getBeeperDetailsById;
const createBeeper = (req, res) => {
    const id = (0, dal_1.getAllBeepersDal)().length + 1;
    const name = req.body.name;
    const status = 'manufactured';
    const newBeeper = { id, name, status };
    (0, dal_1.createBeeperDal)(newBeeper);
    res.json(newBeeper);
};
exports.createBeeper = createBeeper;
const updateBeeperStatus = (req, res) => {
    const id = req.params.id;
    const beeper = (0, dal_1.getBeeperByIdDal)(Number(id));
    if (beeper) {
        const currentstatus = beeper.status;
        const statusIndex = status_1.status.indexOf(currentstatus);
        const newStatus = status_1.status[statusIndex + 1];
        if (newStatus === "deployed") {
            beeper.longitude = req.body.longitude;
            beeper.latitude = req.body.latitude;
        }
        beeper.status = newStatus;
        (0, dal_1.updateBeeperStatusDal)(beeper);
        res.json(beeper);
    }
};
exports.updateBeeperStatus = updateBeeperStatus;
const deleteBeeper = (req, res) => {
    const id = req.params.id;
    (0, dal_1.deleteBeeperDal)(Number(id));
    res.json({ id });
};
exports.deleteBeeper = deleteBeeper;
