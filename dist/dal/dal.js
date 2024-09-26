"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBeepersDal = void 0;
const utils_1 = require("../utils/utils");
const users = (0, utils_1.readFromFile)();
console.log(users);
const getAllBeepersDal = () => {
    return users;
};
exports.getAllBeepersDal = getAllBeepersDal;
