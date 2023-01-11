import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema(
    {
        sectionId: {
            type: String,
            required: true,
        },
        label: {
            type: String,
        },
        labelColor: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        photoUrl: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const TaskModel = mongoose.model('Task', TaskSchema);
export default TaskModel;
