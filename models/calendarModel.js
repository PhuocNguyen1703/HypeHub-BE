import mongoose from 'mongoose';

const CalendarSchema = mongoose.Schema(
    {
        userId: {
            type: String,
        },
        title: {
            type: String,
        },
        calendarType: {
            type: String,
        },
        date: {
            type: String,
        },
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
        content: {
            type: String,
        },
        theme: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const CalendarModel = mongoose.model('Calendar', CalendarSchema);
export default CalendarModel;
