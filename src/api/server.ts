import express from 'express';


const server = express();

server.use(express.json())

server.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the Seeker Server"
  });
});

export { server }