import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        } catch (err) {
            next(err)

        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req,res,next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true}
        )
        res.status(200).json(updatedRoom)
    }catch (err){
        next(err)
    }
}
export const updateRoomAvailability = async (req,res,next) => {
    try {
        await Room.updateOne(
            {"roomNumbers._id": req.params.id},
            {
                $push: {"roomNumbers.$.unavailableDates": req.body.date}
            }
        )
        res.status(200).json("Room Status has been deleted")
    }catch (err){
        next(err)
    }
}