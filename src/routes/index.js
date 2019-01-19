import { Router } from "express";

import video from "../controllers/video";

const router = Router();

router.get("/", (req, res) => res.send("Happy Hacking! 🚀"));

router.get("/normalize", video.create);

export { router };
