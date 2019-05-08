import "./env";

import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import { router } from "./routes";

const { PORT = 3000 } = process.env;

const app = express();

app.use("/tmp", express.static("tmp"));

app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", router);

app.listen(PORT, console.log(`> Listening on ${PORT}`));
