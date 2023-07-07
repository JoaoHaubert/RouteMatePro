import User from "../models/User";

export const getUser = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(error: any) {
        res.status(404).json({message: error.message})
    }
}