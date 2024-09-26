"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("../services/service");
const router = express_1.default.Router();
router.get('/', service_1.getAllBeepers);
router.get('/:id', service_1.getBeeperDetailsById);
// router.get('/status/:status', getBeeperByStatus)
// router.post('/', createBeeper)
// router.put('/:id/status', updateBeeperStatus)
// router.delete('/:id', deleteBeeper)
exports.default = router;
