import express from 'express';

import { getAllBeepers, getBeeperDetailsById, createBeeper, updateBeeperStatus, deleteBeeper, getBeepersByStatus } from '../services/service';

const router = express.Router();

router.get('/', getAllBeepers)

router.get('/:id', getBeeperDetailsById)

router.get('/status/:status', getBeepersByStatus)

router.post('/', createBeeper)

router.put('/:id/status', updateBeeperStatus)

router.delete('/:id', deleteBeeper)


export default router