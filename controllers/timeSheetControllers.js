import TimeSheetModel from '../models/TimeSheets';

export const createSheet = async (req, res) => {
    const newSheet = new TimeSheetModel(req.body);

    try {
        const result = await newSheet.save();
        result._doc;
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
