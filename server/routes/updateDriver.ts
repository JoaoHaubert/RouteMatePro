import express from "express"
import Driver from "../models/drivers";

const router = express.Router();

router.put('/update-driver/:id', async (req, res) => {
    try {
      const id  = req.params.id;
      const updatedData = req.body;
  
      await Driver.updateOne({_id: id}, updatedData);
  
      res.status(200).json({ message: 'Driver updated successfully' });
    } catch (error) {
      console.error('Error updating driver data:', error);
      res.status(500).json({ message: 'Failed to update driver' });
    }
  });

export default router;