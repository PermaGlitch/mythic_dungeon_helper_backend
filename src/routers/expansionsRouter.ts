import express from "express";

import * as expansionsController from "../controllers/expansionsController";

const router = express.Router();

router.get("/", expansionsController.getExpansionsList);

export default router;
