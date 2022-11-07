import mongoose from 'mongoose';

const TimeSheetsSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        checkIn: {
            type: Date,
        },
        checkOut: {
            type: Date,
        },
        totalHrs: {
            type: Number,
        },
        overtimeHrs: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const TimeSheetsModel = mongoose.model('TimeSheets', TimeSheetsSchema);
export default TimeSheetsModel;
