import express from 'express';
import { start } from '../../sites/barnesNNoble/BarnesNNoble';

export const router = express.Router();

router.get("/barnesandnoble", async (req, res, next) => {
  const { username, password } = req.body;
  const wishlistRes = await start({ username, password });
  return res.status(200).json(wishlistRes);
});