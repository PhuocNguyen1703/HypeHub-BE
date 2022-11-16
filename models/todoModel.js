import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        content: {
            type: String,
        },
        tag: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const TodoModel = mongoose.model('Todo', TodoSchema);
export default TodoModel;
