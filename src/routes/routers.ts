import express from 'express';

import { getAllBeepers, getBeeperDetailsById } from '../services/service';

const router = express.Router();

router.get('/', getAllBeepers)  

router.get('/:id', getBeeperDetailsById)

// router.get('/status/:status', getBeeperByStatus)

// router.post('/', createBeeper)

// router.put('/:id/status', updateBeeperStatus)

// router.delete('/:id', deleteBeeper)


export default router