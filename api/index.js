import express from "express";
import mongoose from "mongoose";
import authRoute from '../api/routes/auth.js';
import usersRoute from '../api/routes/users.js';
import hotelsRoute from '../api/routes/hotels.js';
import roomsRoute from '../api/routes/rooms.js';
const app = express()


mongoose.connect('mongodb://localhost:27017/booking')
    .then(() => console.log('DB Ok'))
    .catch((err) => console.log('DB ERROR', err))

app.use(express.json())

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});



app.listen(7007, () => {
    console.log('Listening on Port 7007');
})