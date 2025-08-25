import express from "express";

import * as seasonsController from "../controllers/seasonsContoller";

const router = express.Router();

router.get("/", async (require, res) => {
    try {
        const seasonsList = (await seasonsController.getSeasons()).rows;
        res.json(seasonsList);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            Error: e,
        });
    }
});

export default router;
