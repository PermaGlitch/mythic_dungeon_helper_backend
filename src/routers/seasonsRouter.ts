import express from "express";

import * as seasonsController from "../controllers/seasonsContoller";

const router = express.Router();

router.get("/", seasonsController.getSeasonsList);

export default router;
