import express from "express";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";
const router = express.Router()

router.post('/', async (req, res) => {
    const   newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)

    }catch (err){
        res.status(500).json(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateHotel);

    }catch (err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        await Hotel.findOneAndDelete(req.params.id);
        res.status(200).json('Hotel has been deleted!')

    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)

    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/', async (req,res,next) => {

    const failed = true;

    if (failed) return next(createError(401,'You are authentication'));

    try {
        const hotels = await Hotel.findById("asfdjfk");
        res.status(200).json(hotels)
    }catch (err){
        next(err)
    }
})



export default router