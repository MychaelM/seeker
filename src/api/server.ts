/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { router as barnesRouter } from './siteRouter/barnesAndNobleRouter';

export const server = express();

server.use(express.json());
server.use("/site", barnesRouter);

server.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the Seeker Server"
  });
});

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(500).json({
    message: 'Oops. Something unexpected happened. Try again later'
  });
})