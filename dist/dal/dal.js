"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBeeperDal = exports.updateBeeperStatusDal = exports.createBeeperDal = exports.getBeeperByIdDal = exports.getAllBeepersDal = void 0;
const utils_1 = require("../utils/utils");
const getAllBeepersDal = () => {
    const beepers = (0, utils_1.readFromFile)();
    return beepers;
};
exports.getAllBeepersDal = getAllBeepersDal;
const getBeeperByIdDal = (id) => {
    const beepers = (0, utils_1.readFromFile)();
    const beeper = beepers.find((b) => b.id === id);
    return beeper;
};
exports.getBeeperByIdDal = getBeeperByIdDal;
const createBeeperDal = (beeper) => {
    const beepers = (0, utils_1.readFromFile)();
    console.log(beeper);
    beepers.push(beeper);
    (0, utils_1.writeToFile)(beepers);
    return beepers;
};
exports.createBeeperDal = createBeeperDal;
const updateBeeperStatusDal = (beeper) => {
    const beepers = (0, utils_1.readFromFile)();
    const index = beepers.findIndex((b) => b.id === beeper.id);
    beepers[index] = beeper;
    (0, utils_1.writeToFile)(beepers);
};
exports.updateBeeperStatusDal = updateBeeperStatusDal;
const deleteBeeperDal = (id) => {
    const beepers = (0, utils_1.readFromFile)();
    const index = beepers.findIndex((b) => b.id === id);
    beepers.splice(index, 1);
    (0, utils_1.writeToFile)(beepers);
};
exports.deleteBeeperDal = deleteBeeperDal;
