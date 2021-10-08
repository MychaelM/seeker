import express from 'express';
import { start } from '../../sites/barnesNNoble/BarnesNNoble';

const router = express.Router();

router.get("/barnesandnoble", async (req, res, next) => {
  const wishlistRes = await start();
  return res.status(200).json(wishlistRes);
});

export { router }