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
router.get('/status/:status', service_1.getBeepersByStatus);
router.post('/', service_1.createBeeper);
router.put('/:id/status', service_1.updateBeeperStatus);
router.delete('/:id', service_1.deleteBeeper);
exports.default = router;
