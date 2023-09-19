import express from "express"
import Shop from "../models/shops";

const router = express.Router();

router.put('/update-shop/:id', async (req, res) => {
    try {
      const id  = req.params.id;
      const updatedData = req.body;
  
      await Shop.updateOne({_id: id}, updatedData);
  
      res.status(200).json({ message: 'Vehicle updated successfully' });
    } catch (error) {
      console.error('Error updating vehicle data:', error);
      res.status(500).json({ message: 'Failed to update vehicle' });
    }
  });
  