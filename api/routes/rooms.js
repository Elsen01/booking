import express from "express";
import {createRoom, updateRoom, updateRoomAvailability} from '../controllers/room.js'
const router = express.Router()

router.post('/:hotelid',createRoom)
router.put('/:id',updateRoom);
router.put('/availability/:id',updateRoomAvailability)


export default router