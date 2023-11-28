import express from "express";

import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";


const app = express();



app.use(helmet());

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xXssProtection());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
const timeInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: timeInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(
  helmet.contentSecurityPolicy({
    derectives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();



app.get("/", (req, res) => {
  res.send("Task API....");
});

app.use("/user", userRouter);
app.use('/post', postRouter)

const PORT = process.env.PORT || 5000;

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

app.listen(PORT, () => {
  connect();
  console.log(`server running on ${PORT}`);
});


