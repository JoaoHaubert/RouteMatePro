import express from "express"
import Shop from "../models/shops";

const router = express.Router();

router.put('/update-shop/:id', async (req, res) => {
    try {
      const id  = req.params.id;
      const updatedData = req.body;
  
      await Shop.updateOne({_id: id}, updatedData);
  
      res.status(200).json({ message: 'Shop updated successfully' });
    } catch (error) {
      console.error('Error updating shop data:', error);
      res.status(500).json({ message: 'Failed to update shop' });
    }
  });

export default router;