import { RequestHandler } from "express";

import * as expansionsService from "../services/expansionsService";

export const getExpansionsList: RequestHandler = async (_req, res) => {
    try {
        const expansionsList = await expansionsService.getExpansionsList();
        res.json(expansionsList);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};