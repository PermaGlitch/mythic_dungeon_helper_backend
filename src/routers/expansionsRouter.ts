import express from "express";

import * as expansionsController from "../controllers/expansionsController";

const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const expansionsList = (await expansionsController.getExpansions()).rows;
        res.json(expansionsList);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error: ${e}`);
    }
});

export default router;
