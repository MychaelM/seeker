import express from 'express';
import { router as barnesRouter } from './siteRouter/barnesAndNobleRouter';

const server = express();

server.use(express.json());
server.use("/site", barnesRouter);

server.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the Seeker Server"
  });
});

export { server }