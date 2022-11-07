import mongoose from 'mongoose';

const TimeSheetSchema = mongoose.Schema(
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

const TimeSheetModel = mongoose.model('TimeSheet', TimeSheetSchema);
export default TimeSheetModel;
