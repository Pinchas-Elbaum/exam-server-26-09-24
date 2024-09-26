"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeeperDetailsById = exports.getAllBeepers = void 0;
const dal_1 = require("../dal/dal");
const getAllBeepers = (req, res) => {
    const beepers = (0, dal_1.getAllBeepersDal)();
    res.json(beepers);
};
exports.getAllBeepers = getAllBeepers;
const getBeeperDetailsById = (req, res) => {
    const beepers = (0, dal_1.getAllBeepersDal)();
    const id = req.params.id;
    const beeper = beepers.find((beeper) => beeper.name === id);
    res.json(beeper);
};
exports.getBeeperDetailsById = getBeeperDetailsById;
