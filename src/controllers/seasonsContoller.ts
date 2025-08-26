import { RequestHandler } from "express";

import * as seasonsService from "../services/seasonsService";

export const getSeasonsList: RequestHandler = async (_req, res) => {
    try {
        const seasonsList = await seasonsService.getSeasonsList();
        res.json(seasonsList);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
