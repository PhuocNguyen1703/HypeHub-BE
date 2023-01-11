import mongoose from 'mongoose';

const KanbanSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        board: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
);

const KanbanModel = mongoose.model('Kanban', KanbanSchema);
export default KanbanModel;
